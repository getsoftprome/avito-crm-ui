import {
    OrderStatus, OrderStatusByIdDocument,
    OrderStatusListDocument,
} from "../../../../generated/graphql/user.tsx";
import {makeAutoObservable, runInAction} from "mobx";
import {Services} from "../../../../stores/services.ts";

export class OrderStatusListStore {
    list: OrderStatus[] | null = [];

    constructor(
        protected services: Services,
        platformId: string
    ) {
        makeAutoObservable(this);
        this.load(platformId);
    }

    load = async (platformId: string) => {
        if (!platformId) {
            return;
        }

        const response = await this.services.api.query({
            query: OrderStatusListDocument,
            fetchPolicy: 'network-only',
            variables: {
                platformId: platformId
            }
        });


        runInAction(() => {
            this.list = response.data.OrderStatusList as unknown as OrderStatus[];
        });
    }
}

export class OrderStatusStore {
    status: OrderStatus | null = null;

    constructor(
        protected services: Services,
        id: string
    ) {
        makeAutoObservable(this);
        this.load(id);
    }

    load = async (id: string) => {
        if (!id) {
            return;
        }

        const response = await this.services.api.query({
            query: OrderStatusByIdDocument,
            fetchPolicy: 'network-only',
            variables: {
                id: id,
            }
        });


        runInAction(() => {
            this.status = response.data.OrderStatusById as unknown as OrderStatus;
        });
    }
}