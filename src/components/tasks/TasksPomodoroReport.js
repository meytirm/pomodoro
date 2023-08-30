function TasksPomodoroReport() {
    const tasks = JSON.parse(localStorage.getItem('tasks'))

    const total = tasks.reduce((total, next) => {
        total[1] = total[1] + Number(next.countOfPomodoro)
        if (
            Number(next.didPomodoro) !== 0 &&
            Number(next.didPomodoro) - Number(next.countOfPomodoro) > 0
        ) {
            total[0] = total[0] + Number(next.countOfPomodoro)
        } else {
            total[0] = total[0] + Number(next.didPomodoro)
        }
        return total
    }, [0, 0])

    return (
        <div className="p-report">
            <div className="p-report__item">
                <span>Pomodoro:</span>
                <span className="p-report__value">{total.join('/')}</span>
            </div>
        </div>
    )
}

export default TasksPomodoroReport