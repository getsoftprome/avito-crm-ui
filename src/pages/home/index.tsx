import style from "./home.module.css";
import {Button} from "antd";

export const HomePage = () => {

    return (
        <div className={style.container}>
            <div className={style.block}>
                <div className={style['block-title']}>Возможности КЕФТЕМЕ</div>
                <div className={style['block-description']}>КЕФТЕМЕ — это онлайн-сервис, в котором собраны все нужные инструменты для работы компании и управления авито бизнесом. Перенесите в единое пространство и автоматизируйте все рабочие коммуникации, продажи, проекты и бизнес-процессы.</div>
                <Button style={{margin: '20px auto', display: 'block'}} size={'large'} type={'primary'}>Зарегистрироваться сейчас</Button>
            </div>
        </div>
    )
}