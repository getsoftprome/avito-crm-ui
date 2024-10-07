import {ComponentType} from "react";
import {type RouteObject, createBrowserRouter} from "react-router-dom";

import {AccessGuard} from "./providers/guard";
import {ErrorPage} from "./pages/error";
import {LoginPage} from "./pages/login";
import {DashboardPage} from "./pages/dashboard";
import {RegistrationPage} from "./pages/registration";

const access = (route: RouteObject, area: string) => (
    <AccessGuard
        children={route.element}
        route={route.path}
        area={area}
    />
);

const cabinetGroup = (...list: RouteObject[]) => {
    return list.map(item => ({
        ...item,
        element: access(item, 'auth')
    }));
};

export const buildRouter = (Root: ComponentType) => {
    return createBrowserRouter([
        {
            path: '/',
            element: <Root />,
            children: [
                {
                    path: "/",
                    errorElement: <ErrorPage />,
                    children: [
                        ...cabinetGroup(
                            {
                                path: "/:platform/dashboard",
                                element: <DashboardPage />,
                            },
                        ),
                        {
                            path: "/login",
                            element: <LoginPage />,
                        },
                        {
                            path: "/registration",
                            element: <RegistrationPage />,
                        },
                    ]
                }
            ],
        },
    ]);
};