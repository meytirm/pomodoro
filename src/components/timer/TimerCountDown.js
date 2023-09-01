function TimerCountDown({allSeconds}) {
    let minutes = Math.floor(allSeconds / 60)
    let seconds = allSeconds % 60

    minutes = minutes < 10 ? `0${minutes}` : minutes
    seconds = seconds < 10 ? `0${seconds}` : seconds
    document.title = `${minutes}:${seconds}`

    return (
        <div className="p-count-down">{minutes}:{seconds}</div>
    )
}

export default TimerCountDown