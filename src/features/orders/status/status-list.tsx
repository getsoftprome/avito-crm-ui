import {useServices} from "../../../stores/context/service-context.ts";
import {useMemo, useState} from "react";
import {OrderStatusListStore} from "./store";
import {StatusAddButton} from "./status-add-button";
import {StatusAddModal} from "./modals/add";
import {observer} from "mobx-react-lite";
import {OrderStatus} from "../../../components/order-status";
import style from './status-list.module.css';
import {OrderStatusDeleteDocument} from "../../../generated/graphql/user.tsx";

export const StatusList = observer(() => {
    const services = useServices();
    const [modalOpen, setModalOpen] = useState(false);
    const [changeStatusId, setChangeStatusId] = useState('');

    const statusStore = useMemo(() => new OrderStatusListStore(services, services.platform?.id!), [OrderStatusListStore, services.platform?.id]);

    const onCloseModal = () => {
        setModalOpen(false);
        statusStore.load(services.platform?.id!);
    }

    const onOrderStatusChangeClick = (id: string) => {
        setChangeStatusId(id);
        setModalOpen(true);
    }

    const onOrderStatusDeleteClick = async (id: string) => {
        await services.api.mutate({
            mutation: OrderStatusDeleteDocument,
            variables: {
                id: id,
            }
        });

        onCloseModal();
    }

    return (
        <div className={style.container}>
            <StatusAddModal open={modalOpen} id={changeStatusId} onClose={onCloseModal}/>
            {
                statusStore.list?.map((status, key) => {
                    return (
                        <OrderStatus
                            key={`${key}`}
                            name={status.name}
                            color={status.color}
                            onChange={onOrderStatusChangeClick}
                            onDelete={onOrderStatusDeleteClick}
                            id={status.id}
                        />
                    );
                })
            }
            <StatusAddButton onClick={() => {
                setChangeStatusId('');
                setModalOpen(true)
            }}/>
        </div>
    );
});