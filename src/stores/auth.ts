import {makeAutoObservable} from "mobx";

import {type User, UserQueryDocument} from "../generated/graphql/user";
import { bindProcess,Process } from "./common/zone";
import { Services } from "./services";

export class Auth {
    checkProcess = new Process();
    lastIdentity = null as Identity | null

    constructor(protected services: Services) {
        makeAutoObservable(this);

        this.checkIdentity = bindProcess(this.checkIdentity, this.checkProcess);
    }

    checkIdentity = async () => {
        const date = new Date();
        try {
            const user = await this.services.api.query({
                query: UserQueryDocument,
                fetchPolicy: 'network-only',
            });

            this.updateIdentity({
                date,
                type: 'user',
                user: user.data.User
            });
        } catch (error) {
            this.updateIdentity({ date, type: 'guest' });
        }
    }

    updateIdentity = (identity: Identity) => {
        this.lastIdentity = identity;
    }

    get identity(): Identity | null {
        return this.lastIdentity;
    }
}

type IdentityGuest = { type: 'guest', signout?: boolean };
type IdentityEmployee = { type: 'user', user: User };
type IdentityMeta = { date: Date };
type Identity = (IdentityGuest |IdentityEmployee) & IdentityMeta;