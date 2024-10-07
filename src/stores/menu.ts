import {makeAutoObservable} from "mobx";
import {matchPath} from "react-router-dom";

import {Services} from "./services";
import {MenuItemType} from "antd/es/menu/interface";

export interface Element extends MenuItemType {
    key: string
    path: string
    matchAlso?: string[]
    children?: Element[],
    label?: string,
    icon?: JSX.Element,
}

export class Menu {
    elements: Array<Element> = []
    active?: string | null = null

    constructor(protected root: Services) {
        makeAutoObservable(this);
    }

    setElements(elements: Array<Element>) {
        this.elements = elements;
    }

    toElement(key: string) {
        let item = this.elements?.find(item => item.key === key);

        if (!item) {
            const childItems: Element[] = this.elements?.reduce((initial, item) => [...initial, ...item.children ?? []], []);

            item = childItems?.find(item => item.key === key);
        }

        if (item) {
            this.root.router.navigate(item.path);
        }
    }

    get selected() {
        return [this.active].filter(Boolean) as Array<string>;
    }

    get menuItems() {
        return this.menuItemBuild(this.elements).map((element) => {
            if (element.children) {
                return {
                    ...element,
                    children: this.menuItemBuild(element.children ?? [])
                }
            }

            return {
                ...element,
            }
        });
    }

    menuItemBuild = (elements: Element[]) => (
        elements.map((element) => {
            if (element.children) {
                return {
                    key: element.key,
                    icon: element.icon,
                    label: element.label,
                    path: element.path,
                    children: element.children
                }
            }

            return  {
                key: element.key,
                icon: element.icon,
                label: element.label,
                path: element.path,
            }
        })
    );

    get activeElement() {
        if (!this.location) {
            return null;
        }

        const elements = this.elements.reduce((initial, element) => [...initial, ...(element.children ?? [])], this.elements);

        return elements.find((element) => {
            const paths = [element.path, ...(element.matchAlso ?? [])];

            return paths.some(path => matchPath(path, this.location.pathname));
        })
    }

    protected get location() {
        return this.root.router.location;
    }
}