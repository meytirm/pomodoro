function TimerProgressBar({seconds, minutes}) {
    const percent = (
        ((minutes * 60 - seconds) / (minutes * 60)) * 100
    ).toFixed(2)
    return (
        <div className="p-bar">
            <div className="p-bar__progressive" style={{width: percent + '%'}}></div>
        </div>
    )
}

export default TimerProgressBar