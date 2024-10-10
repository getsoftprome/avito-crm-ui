import style from "./dashboard.module.css";
import {StaticBlock} from "../../components/static-block";
import {FileDoneOutlined, ProfileOutlined, TruckOutlined} from "@ant-design/icons";

export const DashboardPage = () => {
    const ordersCount = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(123);
    const closeOrdersAmount = '₽' + new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(123) + '.00';
    const openOrdersAmount = '₽' + new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(123) + '.00';

    return (
        <div className={style.container}>
        <div className={style['left-block']}>

        </div>
        <div className={style['right-block']}>
            <div className={style['statistic']}>
                <StaticBlock description={'Сумма закрытых заказов'} icon={<FileDoneOutlined />} value={closeOrdersAmount}></StaticBlock>
                <StaticBlock description={'Сумма открытых заказов'} icon={<TruckOutlined />} value={openOrdersAmount}></StaticBlock>
                <StaticBlock description={'Количество заказов'} icon={<ProfileOutlined />} value={ordersCount}></StaticBlock>
            </div>
        </div>
    </div>
    )
}