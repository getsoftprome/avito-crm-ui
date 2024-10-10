import {makeAutoObservable} from "mobx";

import {setLandingMenuItems} from "../services/menu-fill";
import { Api } from "./api";
import {Application} from "./application";
import { Auth } from "./auth";
import {Filter} from "./filter";
import {Menu} from "./menu";
import {Pagination} from "./pagination";
import {Router} from "./router";
import {Platform} from "../generated/graphql/user.tsx";

export class Services {
    application = new Application(this)
    api = new Api()
    auth = new Auth(this);
    router = new Router();
    menu = new Menu(this);
    landingMenu = new Menu(this);
    filter = new Filter();
    pagination = new Pagination();

    platform: Platform | null = null;

    constructor() {
        makeAutoObservable(this);
        setLandingMenuItems(this.landingMenu);
    }

    setPlatform(platform: Platform) {
        this.platform = platform;
    }
}