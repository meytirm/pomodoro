import BaseButton from "./BaseButton";

function AppModal({title, value, children, close, submit}) {
    if (!value) return null
    return (
        <div className="modal-wrapper">
            <div className="p-modal">
                <div className="p-modal__header">
                    <div className="p-modal__title">{title}</div>
                    <div onClick={close}><span className="icon-cancel-circle p-modal__close"></span></div>
                </div>
                <div className="p-modal__body">{children}</div>
                <div className="p-modal__action">
                    <BaseButton className="dark-grey" onClick={submit}>Okay</BaseButton>
                    <BaseButton transparent className="dark-grey-text" onClick={close}>Cancel</BaseButton>
                </div>
            </div>
        </div>
    )
}

export default AppModal