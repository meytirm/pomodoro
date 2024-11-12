import {setTasks} from "../utils/task-api";
import {useTasks, useTasksDispatch} from "../TaskContext";
import {useSettings} from "../SettingContext";
function useOnComplete(tab) {
  const tasks = useTasks()
  const tasksDispatch = useTasksDispatch()
  const settings = useSettings()
  const doneTask = () => {
    const timerType = tab.name
    let countOfTimer = localStorage.getItem(timerType)
    localStorage.setItem(timerType, (Number(countOfTimer) + 1).toString())
    const copyTasks = [...tasks]
    const findTask = copyTasks.find((item) => item.selected === true)
    if (timerType === 'pomodoro' && findTask) {
      findTask.didPomodoro += 1
    }
    if (settings.autoTask) {
      const taskIndex = copyTasks.findIndex(task => task.selected === true)
      if (taskIndex === copyTasks.length - 1) {
        copyTasks.forEach((task, index) => {
          task.selected = index === 0;
        })
      } else {
        copyTasks.forEach((task, index) => {
          task.selected = index === taskIndex + 1;
        })
      }
    }
    setTasks(copyTasks)
    tasksDispatch({type: 'update', tasks: copyTasks})
  }

  return {doneTask}
}

export default useOnComplete