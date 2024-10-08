import { type NormalizedCacheObject, type Operation,ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from "apollo-upload-client";

import { filtersdate } from '../utils/formatters.date';

export class Api {

    client: ApolloClient<NormalizedCacheObject>
    clientUpload: ApolloClient<NormalizedCacheObject>
    fql: FQL

    host = 'https://local.kefteme-drop.ru';
    base = `${this.host}/api/`

    constructor() {
        this.client = new ApolloClient({
            uri: () => this.getUrl(),
            // credentials: 'include',
            cache: new InMemoryCache({
                possibleTypes: {}
            }),
        });

        this.clientUpload = new ApolloClient({
            uri: () => this.getUrl(),
            // credentials: 'include',
            cache: new InMemoryCache({
                possibleTypes: {}
            }),
            link: createUploadLink({uri: this.getUrl()})
        });

        this.fql = new FQL();
    }

    getEndpoint(operation: Operation | null) {
        switch (operation?.operationName) {
            case 'Currencies':
            case 'Countries':
                return 'generic'
            default: return 'user';
        }
    }

    getUrl() {
        return `${this.base}`
    }

    get query() {
        return this.client.query.bind(this.client);
    }

    get mutate() {
        return this.client.mutate.bind(this.client);
    }

    get mutateUpload() {
        return this.clientUpload.mutate.bind(this.client);
    }
}

type FqlDate = null | undefined | string | number | Date;

export class FQL {
    protected startOfTime = new Date(0, 1);
    protected endOfTime = new Date(2100, 1);
    protected separator = '--';

    range(from: Date, to: Date) {
        return [from, to].map(filtersdate).join('--');
    }

    equal(key: string, ...value: Array<any>) {
        return {
            "op": "=",
            "prop": key,
            "value": value
        };
    }

    valueEqual(key: string, value: null | undefined | string | number) {
        if (!value) {
            return [];
        }
        return [{
            "op": "=",
            "prop": key,
            "value": value as unknown as string[]
        }];
    }

    dateBetween(key: string, from: FqlDate, to: FqlDate) {
        const dateFrom = new Date(from ?? this.startOfTime);
        const dateTo = new Date(to ?? this.endOfTime);
        const dates = [dateFrom, dateTo]
            .map(date => this.getDateText(date))
            .join(this.separator);
        return this.equal(key, dates);
    }

    sorter(key: string, order: 'ascend' | 'descend' | null | undefined) {
        switch (order) {
            case 'ascend': return { sortBy: `${key}.asc` };
            case 'descend': return { sortBy: `${key}.desc` };
        }
    }

    getDateText(date: Date) {
        return date.toString().replace(/^(.*)\s\(.*\)$/, '$1');
    }
}