import {Button, Menu} from "antd";
import {MenuItemType} from "antd/es/menu/interface";
import style from "./landing-menu.module.css";
import {UserOutlined} from "@ant-design/icons";

export const LandingMenu = (props: {
    items: MenuItemType[],
    selectedKey: string,
    onClick?: (key: string) => void
}) => {

    return (
        <div className={style.container}>
            <Menu
                theme="light"
                mode="horizontal"
                items={props.items}
                onClick={(e) => props.onClick?.(e.key)}
                style={{ flex: 1, minWidth: 0, paddingLeft: 195 }}
                selectedKeys={[props.selectedKey]}
            />
            <div className={style['right-bar']}>
                <Button href={'/login'} type={'primary'}><UserOutlined /> Войти</Button>
            </div>
        </div>
    )
};