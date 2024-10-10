import {Button, ColorPicker, Form, Input, Modal} from "antd";
import {OrderStatusDocument} from "../../../../../generated/graphql/user.tsx";
import {useServices} from "../../../../../stores/context/service-context.ts";
import {observer} from "mobx-react-lite";
import {useEffect, useMemo, useState} from "react";
import {PlatformStore} from "../../../../platform/store";
import {OrderStatusStore} from "../../store";

export const StatusAddModal = observer((props: {open: boolean, onClose(): void, id?: string}) => {
    const services = useServices();
    const [form] = Form.useForm();
    const orderStatusStore = useMemo(() => new OrderStatusStore(services, props.id!), [PlatformStore, props.id!]);

    const [color, setColor] = useState<string|undefined>( '#1677ff');

    useEffect(() => {
        form.setFieldValue('name', orderStatusStore.status?.name);
        form.setFieldValue('color', orderStatusStore.status?.color);
    }, [orderStatusStore.status])

    const title = props.id ? 'Изменить статус' : 'Добавить статус';
    const buttonTitle = props.id ? 'Сохранить' : 'Добавить';

    const buttons = [
        <Button key={'add'} type={'primary'} onClick={() => sendRequest()}>{buttonTitle}</Button>,
        <Button key={'cancel'} onClick={props.onClose}>Отменить</Button>,
    ];



    const sendRequest = async () => {
        const variables = {
            id: props.id,
            name: form.getFieldValue('name'),
            color: color,
            platformId: services.platform?.id
        }

        await services.api.mutate({
            mutation: OrderStatusDocument,
            variables: {
                input: variables
            }
        });

        props.onClose();
    }

    return (
        <Modal
            title={title}
            open={props.open}
            onCancel={props.onClose}
            footer={buttons}
        >
            <Form
                layout="vertical"
                form={form}
            >
                <Form.Item
                    label="Название статуса"
                    name="name"
                    rules={[{ required: true, message: 'Название не может быть пустым!' }]}
                    layout="vertical"
                >
                    <Input size={'large'} />
                </Form.Item>
                <Form.Item
                    label="Цвет статуса"
                    name="color"
                    rules={[{ required: true, message: 'Цвет не может быть пустым!' }]}
                    layout="vertical"
                >
                    <ColorPicker
                        showText
                        allowClear
                        onChange={(color) => setColor(color.toHexString())}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
});