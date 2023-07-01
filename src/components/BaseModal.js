import BaseButton from "./BaseButton";

function BaseModal({title, value, children, close, submit, submitButton, buttonColor = 'green' }) {
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
                    {submitButton ? <BaseButton className={buttonColor} onClick={submit}>Submit</BaseButton> : ''}
                    <BaseButton className="dark-grey" onClick={close}>{submitButton ? 'Close' : 'Okay'}</BaseButton>
                </div>
            </div>
        </div>
    )
}

export default BaseModal