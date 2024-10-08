import {Button, Checkbox, Form, Input} from "antd";

import style from './registration.module.css';
import {UserDocument} from "../../generated/graphql/user.tsx";
import {useServices} from "../../stores/context/service-context.ts";
export const RegistrationPage = () => {
    const services = useServices();

    const [form] = Form.useForm();

    const sendRequest = async () => {
        const variables = {
            name: form.getFieldValue('name'),
            phone: form.getFieldValue('phone'),
            password: form.getFieldValue('password'),
            email: form.getFieldValue('email')
        }

        const response = await services.api.mutate({
            mutation: UserDocument,
            variables: {
                input: variables
            }
        });

        console.log(response);
    }

    return (
        <>
            <div className={style.container}>
                <div className={style.label}>Создайте аккаунт</div>
                <Form
                    layout="vertical"
                    form={form}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Email не может быть пустым!' }]}
                        layout="vertical"
                    >
                        <Input size={'large'} />
                    </Form.Item>
                    <Form.Item
                        label="Имя"
                        name="name"
                        rules={[{ required: true, message: 'Имя не может быть пустым!' }]}
                        layout="vertical"
                    >
                        <Input size={'large'} />
                    </Form.Item>
                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[{ required: true, message: 'Пароль не может быть пустым!' }]}
                        layout="vertical"
                    >
                        <Input.Password size={'large'}/>
                    </Form.Item>
                    <Form.Item
                        name="condition"
                        style={{marginBottom: '5px'}}
                    >
                        <Checkbox>Я соглашаюсь с политикой конфиденциальности</Checkbox>
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
    );
}