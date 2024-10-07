export interface FilterItem {
    prop: string;
    value: string[];
    op: string;
}

export class Filter {
    items: FilterItem[] = [];

    provide = (
        params: URLSearchParams,
    ) => {
        this.items = params.get('filter') ? JSON.parse(params.get('filter')) : [];
    }

    setFilter = (filter: FilterItem[]) => {
        this.items = filter;

        const url = new URL(window.location.href);
        url.searchParams.set('filter', JSON.stringify(filter));
        window.history.pushState(null, '', url.toString());
    }
}