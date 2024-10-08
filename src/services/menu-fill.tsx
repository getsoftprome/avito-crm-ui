import type {Element, Menu} from '../stores/menu';

const landingItems: Element[] = [
    {
        key: 'opportunities',
        path: '/',
        label: 'Возможности',
    },
    {
        key: 'prices',
        path: '/prices/',
        label: 'Цены',
    },
    {
        key: 'help',
        path: '/help/',
        label: 'Поддержка',
    },
];

export const setLandingMenuItems = (menu: Menu) => {
    menu.setElements(landingItems);
};


