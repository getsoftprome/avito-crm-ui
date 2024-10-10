import {Menu} from "antd";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {Element} from "../../stores/menu.ts";
import {useServices} from "../../stores/context/service-context.ts";
import {
    BarChartOutlined, CreditCardOutlined,
    ProductOutlined,
    ShoppingOutlined, SkinOutlined,
    TeamOutlined
} from "@ant-design/icons";

export const PlatformMenu = observer((props: {
    selectedKey: string,
    onClick?: (key: string) => void
}) => {
    const services = useServices();

    const { platform: code } = useParams();

    const items: Element[] = [
        {
            key: 'dashboard',
            path: `/${code}/dashboard`,
            label: 'Дашборд',
            icon: <BarChartOutlined />
        },
        {
            key: 'orders',
            path: `/${code}/orders`,
            label: 'Заказы',
            icon: <ShoppingOutlined />
        },
        {
            key: 'employee',
            path: `/${code}/employee`,
            label: 'Персонал',
            icon: <TeamOutlined />
        },
        {
            key: 'products',
            path: `/${code}/products`,
            label: 'Товары',
            icon: <SkinOutlined />
        },
        {
            key: 'stock',
            path: `/${code}/stock`,
            label: 'Склад',
            icon: <ProductOutlined />
        },
        {
            key: 'subscribe',
            path: `/${code}/subscribe`,
            label: 'Подписка',
            icon: <CreditCardOutlined />
        },

    ];

    return (
        <Menu
            theme="light"
            mode="vertical"
            items={items}
            onClick={(e) => services.router.navigate(items.find((item) => item.key === e.key)!.path)}
            selectedKeys={[props.selectedKey]}
        />
    );
});