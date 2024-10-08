import {Platform, PlatformByCodeDocument} from "../../../generated/graphql/user.tsx";
import {makeAutoObservable, runInAction} from "mobx";
import {Services} from "../../../stores/services.ts";

export class PlatformStore {
    platform: Platform | null = null;

    constructor(
        protected services: Services,
        code: string
    ) {
        makeAutoObservable(this);
        this.load(code);
    }

    load = async (code: string) => {
        if (!code) {
            return;
        }

        const response = await this.services.api.query({
            query: PlatformByCodeDocument,
            fetchPolicy: 'network-only',
            variables: {
                code
            }
        });


        runInAction(() => {
            this.platform = response.data.PlatformByCode as unknown as Platform;
        });
    }
}