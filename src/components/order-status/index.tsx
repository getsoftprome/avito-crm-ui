import style from './order-status.module.css';
import {Button} from "antd";
import {DeleteOutlined, FormOutlined} from "@ant-design/icons";

export const OrderStatus = (props: {id: string, name: string, color: string, onChange(id: string): void, onDelete(id: string): void}) => {
    return (
        <div className={style.container} style={{background: `linear-gradient(90deg, ${props.color} 0%, var(--background) 100%)`}}>
            <div className={style.header}>
                <div className={style.name}>
                    {props.name}
                </div>
                <div className={style.actions}>
                    <Button onClick={() => props.onChange(props.id)} type={'text'}><FormOutlined /></Button>
                    <Button onClick={() => props.onDelete(props.id)} type={'text'}><DeleteOutlined /></Button>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
}