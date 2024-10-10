import style from './content-block.module.css';

export const ContentBlock = (props: { children: React.ReactNode }) => (
    <div className={style.container}>{props.children}</div>
)