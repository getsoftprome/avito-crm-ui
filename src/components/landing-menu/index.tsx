import {Button, Dropdown, Menu, MenuProps} from "antd";
import {MenuItemType} from "antd/es/menu/interface";
import style from "./landing-menu.module.css";
import {DoubleRightOutlined, DownOutlined, LogoutOutlined, PlusOutlined, UserOutlined} from "@ant-design/icons";
import {observer} from "mobx-react-lite";
import {useServices} from "../../stores/context/service-context.ts";

export const LandingMenu = observer((props: {
    items: MenuItemType[],
    selectedKey: string,
    onClick?: (key: string) => void
}) => {
    const services = useServices();

    const platformActions = (): MenuProps => {
        const items: MenuItemType[] = [];

        if (services.auth.identity?.type !== 'user') {
            return {
                items: items
            };
        }

        services.auth.identity?.user.platformAccesses.forEach((access, key) => items.push({
            key: (key + 2).toString(),
            label: (
                <Button type={'link'} href={`/${access.platform.code}/dashboard`}>
                    <DoubleRightOutlined /> {access.platform.name}
                </Button>
            )
        }))

        items.push(
            {
                key: services.auth.identity?.user.platformAccesses.length,
                label: (
                    <Button type={'link'} href="/new-platform">
                        <PlusOutlined /> Создать площадку
                    </Button>
                ),
            }
        )


        return {
            items: items
        };
    }

    const userActions = (): MenuProps => {
        const items = [
            {
                key: '1',
                label: (
                    <Button type={'link'} href="/new-platform">
                        <LogoutOutlined /> Выйти
                    </Button>
                ),
            },
        ];

        return {
            items: items
        };
    }

    const rightBar = () => {
        if (services.auth.identity?.type === 'guest') {
            return <Button href={'/login'} type={'primary'}><UserOutlined /> Войти</Button>;
        }

        return (
            <>
                <Dropdown menu={platformActions()} placement="bottom">
                    <Button type={'text'}><DownOutlined /> Мои площадки</Button>
                </Dropdown>
                <Dropdown menu={userActions()} placement="bottomLeft">
                    <Button type={'text'}><DownOutlined /> {services.auth.identity?.user.name}<UserOutlined /></Button>
                </Dropdown>
            </>
        )
    }

    return (
        <div className={style.container}>
            <div className={style['logo']}>КЕФТЕМЕ</div>
            <Menu
                theme="light"
                mode="horizontal"
                items={props.items}
                onClick={(e) => props.onClick?.(e.key)}
                style={{ flex: 1, minWidth: 0, paddingLeft: 195 }}
                selectedKeys={[props.selectedKey]}
            />
            <div className={style['right-bar']}>
                {rightBar()}
            </div>
        </div>
    )
});