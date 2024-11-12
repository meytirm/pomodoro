import {useTasks} from "../../TaskContext";

function TasksPomodoroReport() {
  const tasks = useTasks()

    const allPomodoros = tasks.map(task => task.countOfPomodoro)
      .reduce((total, currentNumber) => total + (+currentNumber), 0)

    const totalDonePomodoros = tasks.map(task => task.didPomodoro)
      .reduce((total, currentNumber) => total + (+currentNumber), 0)

    return (
        <div className="p-report">
            <div className="p-report__item">
                <span>Pomodoro:</span>
                <span className="p-report__value">{`${totalDonePomodoros}/${allPomodoros}`}</span>
            </div>
        </div>
    )
}

export default TasksPomodoroReport