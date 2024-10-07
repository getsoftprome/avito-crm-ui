import { makeAutoObservable } from "mobx";
import type { Location, NavigateFunction, SetURLSearchParams } from "react-router-dom";

export class Router {
    params = new Map<string, any>()
    routeParams: Readonly<Record<string, string | undefined>> = {}

    constructor() {
        makeAutoObservable(this, {
            navigate: false,
            setParams: false,
            location: false,
        });
    }

    get<T = string>(key: string, transformer?: (value: string) => T): T | null {
        if (this.params.has(key)) {
            const value = this.params.get(key) as string;
            return transformer ? transformer(value) : value as T;
        }
        return null;
    }

    navigate: NavigateFunction = null!
    setParams: SetURLSearchParams = null!
    location: Location<any> = null!

    provide = (
        navigate: NavigateFunction,
        setParams: SetURLSearchParams,
        params: URLSearchParams,
        routeParams: Readonly<Record<string, string | undefined>>,
        location: Location<any>
    ) => {
        this.navigate = navigate;
        this.setParams = setParams;
        this.routeParams = routeParams;
        this.location = location;
    }

    openWindow(url: string) {
        window.open(url, '_blank');
    }
}