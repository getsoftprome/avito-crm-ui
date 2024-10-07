import {makeAutoObservable} from "mobx";

import {Services} from "./services";

export class Application {
    protected state: 'blank' | 'loading' | 'loaded' = 'blank'

    constructor(protected services: Services) {
        makeAutoObservable(this);
    }

    async load() {
        this.toState('loading');
        const { auth } = this.services;

        if (!auth.identity) {
            await auth.checkIdentity();
        }

        this.toState('loaded');
    }

    protected toState(state: Application['state']) {
        this.state = state;
    }

    public get loading() {
        return this.state === 'blank' || this.state === 'loading';
    }
}