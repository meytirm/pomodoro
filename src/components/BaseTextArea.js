function BaseTextArea({value, placeholder, onInput}) {
    return (
        <textarea
            className="p-textarea"
            value={value}
            placeholder={placeholder}
            rows={4}
            onInput={onInput}
        />
    )
}

export default BaseTextArea