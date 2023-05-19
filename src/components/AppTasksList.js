import AppTasksItem from "./AppTasksItem";
import {useState} from "react";

function AppTasksList({tasks, updateTasks}) {
    const [selectedTask, setSelectedTask] = useState('')

    function selectTask(id) {
        const tasks = JSON.parse(localStorage.getItem('tasks')).map(task => {
            if (task.id === id) {
                task.selected = true
                return task
            }
            task.selected = false
            return task
        })
        localStorage.setItem('tasks', JSON.stringify(tasks))
        setSelectedTask(id)
    }



    if (!selectedTask && tasks.some(task => task.selected === true)) {
        const task = tasks.find(task => task.selected === true)
        selectTask(task.id)
    }

    const items = tasks && tasks.length > 0 ? tasks.map(
        (task, index) => <AppTasksItem
            selected={selectedTask === task.id}
            selectItemEvent={(id) => selectTask(id)}
            task={task}
            key={index}
            updateTasks={updateTasks}
        />
    ) : <div className="p-list__empty">You can add your tasks here</div>
    return (
        <div className="p-list">
            {items}
        </div>
    )
}

export default AppTasksList