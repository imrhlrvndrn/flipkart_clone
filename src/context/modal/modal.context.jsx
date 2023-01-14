import { createContext, useContext, useEffect, useState } from 'react';

// components
import { SidebarFilters } from '../../components';
import { useWindowSize } from '../../hooks';
import { Modal } from '../../layouts';
// import {
//     CreateGroupChat,
//     CreateGroupInvite,
//     AddParticipant,
//     ChatInformation,
// } from '../../components';

const MODAL_TYPES = {
    FILTER_MODAL: () => (
        <Modal>
            <SidebarFilters />
        </Modal>
    ),
};

const initial_modal_state = {
    showModal: (type, props) => {},
    hideModal: () => {},
    modal: {},
};

const ModalContext = createContext(initial_modal_state);

export const useModalManager = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const _window = useWindowSize();
    const [modal, setModal] = useState({ type: '', props: {} });
    const { type, props } = modal;

    useEffect(() => {
        if (_window?.width > 1200) hideModal();
    }, [_window?.width]);

    const showModal = (type, props = {}) => {
        setModal({
            ...modal,
            type,
            props,
        });
    };

    const hideModal = () => {
        console.log('hide modal is triggered ');
        setModal({
            ...modal,
            type: '',
            props: {},
        });
    };

    const renderModal = () => {
        const ModalComponent = MODAL_TYPES[type];
        if (!type || !ModalComponent) {
            return null;
        }
        return <ModalComponent id='global-modal' {...props} />;
    };

    return (
        <ModalContext.Provider value={{ showModal, hideModal, modal }}>
            {renderModal()}
            {children}
        </ModalContext.Provider>
    );
};
