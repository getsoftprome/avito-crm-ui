import {LandingMenu} from "../../components/landing-menu";
import {Outlet} from "react-router-dom";
import {useServices} from "../../stores/context/service-context.ts";

export const LandingLayout = () => {
    const services = useServices();

    return (
        <>
            <LandingMenu items={services.landingMenu.menuItems} selectedKey={'registration'}></LandingMenu>
            <Outlet/>
        </>
    )
}