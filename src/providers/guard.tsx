import {observer} from "mobx-react-lite";
import type {PropsWithChildren} from "react";

import {Redirect} from "../components/redirect";
import {useServices} from "../stores/context/service-context";

export const AccessGuard = observer((props: PropsWithChildren<{ area: string, route?: string }>) => {
    const { auth, application } = useServices();

    if (application.loading) {
        return null;
    }

    const check = auth.lastIdentity;

    if (check?.type === 'user') {
        return props.children as JSX.Element;
    }

    return <Redirect to={'/login'} />;
});