// context
import { useModalManager } from '../../context';

// styles
import './modal.layout.scss';

export const Modal = ({
    // variant,
    children,
    style,
    ...props
}) => {
    const { hideModal } = useModalManager();

    // style = style || {
    //     zIndex: '2',
    //     padding: '2rem',
    // };

    return (
        <div className='modal_container'>
            <div className='content'>{children}</div>
            <div className='overlay' onClick={hideModal}></div>
        </div>
    );
};
