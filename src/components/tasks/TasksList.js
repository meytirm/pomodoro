import {useTasks, useTasksDispatch} from "../../TaskContext";
import {getTasks, setTasks} from "../../utils/task-api";
import TasksItem from "./TasksItem";

function TasksList() {
    const tasksDispatch = useTasksDispatch()
    const tasks = useTasks()
    function selectTask(id) {
        const tasks = getTasks()
        tasks.forEach(task => {
            if (task.id === id) {
                task.selected = true
            } else {
                task.selected = false
            }
        })
        setTasks(tasks)
        tasksDispatch({
            type: 'update',
            tasks
        })
    }

    const items = tasks && tasks.length > 0 ? tasks.map(
        (task, index) => <TasksItem
            selected={task.selected}
            selectItemEvent={(id) => selectTask(id)}
            task={task}
            key={index}
        />
    ) : <div className="p-list__empty">You can add your tasks here</div>

    return (
        <div className="p-list">
            {items}
        </div>
    )
}

export default TasksList