import {makeAutoObservable} from "mobx";

export class Pagination {
    page = 1;
    limit = 20;
    onPageChange?: (page: number, limit: number) => void;

    constructor() {
        makeAutoObservable(this);
    }

    provide = (
        params: URLSearchParams,
    ) => {
        this.page = parseInt(params.get('page')) || 1;
    }

    setPage = (page: number) => {
        this.page = page;

        const url = new URL(window.location.href);
        url.searchParams.set('page', page.toString());
        window.history.pushState(null, '', url.toString());

        if (this.onPageChange) {
            this.onPageChange(page, this.limit);
        }
    }

    setLimit = (limit: number) => {
        this.limit = limit;

        const url = new URL(window.location.href);
        url.searchParams.set('limit', limit.toString());
        window.history.pushState(null, '', url.toString());

        if (this.onPageChange) {
            this.onPageChange(this.page, limit);
        }
    }

    setOnPageChange = (callback: (page: number, limit: number) => void) => {
        this.onPageChange = callback;
    }
}