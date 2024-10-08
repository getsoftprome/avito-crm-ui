import {ComponentType} from "react";
import {type RouteObject, createBrowserRouter} from "react-router-dom";

import {AccessGuard} from "./providers/guard";
import {ErrorPage} from "./pages/error";
import {LoginPage} from "./pages/login";
import {DashboardPage} from "./pages/dashboard";
import {RegistrationPage} from "./pages/registration";
import {LandingLayout} from "./features/landing/landing-layout.tsx";
import {HomePage} from "./pages/home";
import {PlatformCreatePage} from "./pages/platform-create";
import {PlatformLayout} from "./features/platform/platform-layout.tsx";

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
                    element: <LandingLayout />,
                    children: [
                        {
                            path: "/",
                            element: <HomePage />,
                        },
                        {
                            path: "/login",
                            element: <LoginPage />,
                        },
                        {
                            path: "/registration",
                            element: <RegistrationPage />,
                        },
                        {
                            path: "/new-platform",
                            element: <PlatformCreatePage />,
                        },
                    ]
                },
                {
                    path: '/:platform',
                    errorElement: <ErrorPage />,
                    element: <PlatformLayout />,
                    children: [
                        ...cabinetGroup(
                            {
                                path: "/:platform/dashboard",
                                element: <DashboardPage />,
                            },
                        ),
                    ]
                }
            ],
        },
    ]);
};