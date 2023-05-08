function BaseButton({children,onClick ,className, active, transparent}) {
    const isActive = active ? 'p-button--active' : ''
    const isTransparent = transparent ? 'p-button--transparent' : ''

    return (
        <button className={`p-button ${className} ${isTransparent} ${isActive}`} onClick={onClick}>
            {children}
        </button>
    )
}

export default BaseButton