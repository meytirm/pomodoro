function TimerOperationCountDown({time}) {
    let minutes = Math.floor(time / 60)
    let seconds = time % 60

    minutes = minutes < 10 ? `0${minutes}` : minutes
    seconds = seconds < 10 ? `0${seconds}` : seconds

    return (
        <div className="p-count-down">{minutes}:{seconds}</div>
    )
}

export default TimerOperationCountDown