import {useServices} from "../../stores/context/service-context.ts";
import style from "./platform-header.module.css"
import {observer} from "mobx-react-lite";

export const PlatformHeader = observer(() => {
    const { auth } = useServices();

    const userName = auth.identity?.type === 'user' ? auth.identity.user.name : '';

    console.log(auth.identity);

    return (
        <div className={style.header}>
            <div className={style['left-block']}></div>
            <div className={style['right-block']}>
                <div className={style['user-block']}>
                    <div className={style['user-name']}>{userName}</div>
                    <div className={style['user-avatar']}></div>
                </div>
            </div>
        </div>
    );
});