import {PlusCircleOutlined} from "@ant-design/icons";
import {observer} from "mobx-react-lite";
import {Button} from "antd";

export const StatusAddButton = observer((props: {onClick(): void}) => {
    return (
        <Button size={'large'} style={{height: '60px', width: '250px'}} onClick={props.onClick}><PlusCircleOutlined /> Добавить статус</Button>
    );
});