import style from "../registration/registration.module.css";
import {Button, Checkbox, Form, Input} from "antd";
import {useServices} from "../../stores/context/service-context.ts";
import {PlatformDocument} from "../../generated/graphql/user.tsx";

export const PlatformCreatePage = () => {
    const services = useServices();

    const [form] = Form.useForm();

    const sendRequest = async () => {
        const variables = {
            name: form.getFieldValue('name'),
        }

        const response = await services.api.mutate({
            mutation: PlatformDocument,
            variables: {
                input: variables
            }
        });

        console.log(response);
    }

    return (
        <>
            <div className={style.container}>
                <div className={style.label}>Создайте площадку</div>
                <Form
                    layout="vertical"
                    form={form}
                >
                    <Form.Item
                        label="Название площадки"
                        name="name"
                        rules={[{ required: true, message: 'Название не может быть пустым!' }]}
                        layout="vertical"
                    >
                        <Input size={'large'} />
                    </Form.Item>
                    <Form.Item
                        name="condition"
                    >
                        <Checkbox>Я соглашаюсь с правилами площадки</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button style={{width: '100%'}} size={'large'} type="primary" onClick={sendRequest}>
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}