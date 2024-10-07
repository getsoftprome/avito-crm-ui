import {makeAutoObservable} from "mobx";

import {setLandingMenuItems} from "../services/menu-fill";
import { Api } from "./api";
import {Application} from "./application";
import { Auth } from "./auth";
import {Filter} from "./filter";
import {Menu} from "./menu";
import {Pagination} from "./pagination";
import {Router} from "./router";

export class Services {
    application = new Application(this)
    api = new Api()
    auth = new Auth(this);
    router = new Router();
    menu = new Menu(this);
    landingMenu = new Menu(this);
    filter = new Filter();
    pagination = new Pagination();

    constructor() {
        setLandingMenuItems(this.landingMenu);
        makeAutoObservable(this);
    }
}