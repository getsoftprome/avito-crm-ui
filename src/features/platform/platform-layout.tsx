import {Outlet, useParams} from "react-router-dom";
import {useServices} from "../../stores/context/service-context.ts";
import {PlatformMenu} from "../../components/platform-menu";
import style from "./platform-layout.module.css";
import {observer} from "mobx-react-lite";
import {useMemo} from "react";
import {PlatformStore} from "./store";


export const PlatformLayout = observer(() => {
    const services = useServices();
    const { platform: code } = useParams();

    const platformStore = useMemo(() => new PlatformStore(services, code!), [PlatformStore, code]);

    return (
        <div className={style.container}>
            <div className={style['left-bar']}>
                <div className={style['platform-label']}>{platformStore.platform?.name}</div>
                <PlatformMenu
                    selectedKey={'dashboard'}
                />
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
    );
})