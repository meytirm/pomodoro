function BaseSwitch({value, onclick}) {
    const active = value ? 'p-switch--active' : ''
    const barActive = value ? 'p-switch__bar--active' : ''
    return (
        <div className={'p-switch ' + active} onClick={onclick}>
            <div className={'p-switch__bar ' + barActive}></div>
        </div>
    )
}

export default BaseSwitch