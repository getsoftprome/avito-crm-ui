import style from "../registration/registration.module.css";
import {Button, Checkbox, Form, Input} from "antd";
import {useServices} from "../../stores/context/service-context.ts";

export const LoginPage = () => {
    const services = useServices();

    const [form] = Form.useForm();
    const signin = async () => {
        const response = await fetch(`/api/auth`, {
            method: 'POST',
            body: JSON.stringify({
                email: form.getFieldValue('email'),
                password: form.getFieldValue('password')
            }),
            credentials: 'include'
        });

        if (response.status === 204) {
            await services.auth.checkIdentity();

            services.router.navigate('/');
        }
    }

    return (
        <>
            <div className={style.container}>
                <div className={style.label}>Вход</div>
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
                        <Checkbox>Запомнить меня</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button style={{width: '100%'}} size={'large'} type="primary" onClick={signin}>
                            Войти
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button style={{width: '100%'}} type="link" href={'/registration'}>
                            <span style={{color: '#000'}}>Нет аккаунта?</span><span style={{fontWeight: 'bold'}}>Создайте прямо сейчас</span>
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}