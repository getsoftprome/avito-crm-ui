import {PropsWithChildren, useEffect, useLayoutEffect, useMemo} from 'react'

import {Outlet, RouterProvider, useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {buildRouter} from "./router.tsx";
import {observer} from "mobx-react-lite";
import {Services} from "./stores/services.ts";
import {Router} from "./stores/router.ts";
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import {ServicesContext, useServices} from "./stores/context/service-context";

function App() {
    const router = useMemo(() => buildRouter(RouterRoot), []);

    return (
        <RouterProvider router={router}/>
    )
}

const RouterRoot = observer(() => {
    const services = useMemo(() => new Services(), [Services]);

    useAppLoader(services.application.loading);
    useEffect(() => {
        services.application.load();
    }, [services.application]);

    return (
        <ServicesContext.Provider value={services}>
            <RoutingConnectionHOC router={services.router}>
                <Layout>
                    <Content>
                        <Outlet/>
                    </Content>
                </Layout>
            </RoutingConnectionHOC>
        </ServicesContext.Provider>
    );
});

const RoutingConnectionHOC = observer((props: PropsWithChildren<{ router: Router }>) => {
    const { router, filter, pagination } = useServices();
    const navigate = useNavigate();
    const [params, serParams] = useSearchParams();
    const routeParams = useParams();
    const location = useLocation();

    router.provide(navigate, serParams, params, routeParams, location);
    filter.provide(params);
    pagination.provide(params);

    return props.children as JSX.Element;
});

const useAppLoader = (loading: boolean) => {
    useLayoutEffect(() => {
        const loaderClass = 'apploader';
        const bodyClasses = document.body.classList;

        if (loading) {
            bodyClasses.add(loaderClass);
        } else {
            bodyClasses.remove(loaderClass);
        }

    }, [loading]);
};

export default App
