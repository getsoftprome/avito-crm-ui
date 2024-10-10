import {Outlet, useParams} from "react-router-dom";
import {useServices} from "../../stores/context/service-context.ts";
import {PlatformMenu} from "../../components/platform-menu";
import style from "./platform-layout.module.css";
import {observer} from "mobx-react-lite";
import {useMemo} from "react";
import {PlatformStore} from "./store";
import {PlatformHeader} from "../../components/platform-header";


export const PlatformLayout = observer(() => {
    const services = useServices();
    const { platform: code } = useParams();

    const platformStore = useMemo(() => new PlatformStore(services, code!), [PlatformStore, code]);

    services.setPlatform(platformStore.platform!)

    return (
        <div className={style.container}>
            <div className={style['left-bar']}>
                <div className={style['platform-label']}>{platformStore.platform?.name.toUpperCase()}</div>
                <div className={style['menu-container']}>
                    <PlatformMenu
                        selectedKey={'dashboard'}
                    />
                </div>
            </div>
            <div className={style['right-bar']}>
                <PlatformHeader />
                <div className={style.content}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
})