import {Menu} from "antd";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {Element} from "../../stores/menu.ts";
import {useServices} from "../../stores/context/service-context.ts";

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
        },
        {
            key: 'orders',
            path: `/${code}/orders`,
            label: 'Заказы',
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