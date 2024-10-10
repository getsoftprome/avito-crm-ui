import {ContentBlock} from "../content-block";

import style from "./static-block.module.css";

export const StaticBlock = (props: {icon: React.ReactNode, description: string, value: string | number}) => {
    return (
        <ContentBlock>
            <div className={style.icon}>
                {props.icon}
            </div>
            <div className={style.description}>
                {props.description}
            </div>
            <div className={style.value}>
                {props.value}
            </div>
        </ContentBlock>
    );
}