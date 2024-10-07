import {useMemo} from "react";
import {Services} from "../../stores/services.ts";
import {LandingMenu} from "../../components/landing-menu";
import style from "../registration/registration.module.css";
import {Button, Checkbox, Form, Input} from "antd";

export const LoginPage = () => {
    const services = useMemo(() => new Services(), [Services]);

    return (
        <>
            <LandingMenu items={services.landingMenu.menuItems} selectedKey={'registration'}></LandingMenu>
            <div className={style.container}>
                <div className={style.label}>Вход</div>
                <Form
                    layout="vertical"
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
                        <Button style={{width: '100%'}} size={'large'} type="primary" htmlType="submit">
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