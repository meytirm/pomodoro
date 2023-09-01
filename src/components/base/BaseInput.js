function BaseInput({placeholder, label, type = 'text', min, max, value, onInput}) {
    return (
        <label className="p-label">
            {label}
            <input className="p-input" type={type} placeholder={placeholder} min={min} max={max} value={value} onInput={onInput}/>
        </label>
    )
}

export default BaseInput