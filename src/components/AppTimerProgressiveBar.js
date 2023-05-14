function AppTimerProgressiveBar({percent}) {
    return (
        <div className="p-bar">
            <div className="p-bar__progressive" style={{width: percent + '%'}}></div>
        </div>
    )
}

export default AppTimerProgressiveBar