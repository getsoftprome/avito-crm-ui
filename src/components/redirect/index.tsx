export const Redirect = (props: {to: string}) => {
    window.location.replace(props.to);

    return <></>
}