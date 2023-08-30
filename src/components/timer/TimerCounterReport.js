function TimerCounterReport({timerTab}) {
    let countOfTimer = localStorage.getItem(timerTab.name)
    countOfTimer = countOfTimer ? countOfTimer : 0
    return (
        <div className="p-timer__count">
            <span>Count Of Timer: </span>
            <span>#{countOfTimer}</span>
        </div>
    )
}

export default TimerCounterReport