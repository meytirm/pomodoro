import AppTasksHeader from "./AppTasksHeader";
import AppTasksList from "./AppTasksList";
import AppTasksAdd from "./AppTasksAdd";
import {useState} from "react";

function AppTasks() {
    const [tasks, updateTasks] = useState(JSON.parse(localStorage.getItem('tasks')))
    return (
        <div>
            <AppTasksHeader/>
            <AppTasksList tasks={tasks} />
            <AppTasksAdd updateTasks={(tasks) => updateTasks(tasks)} />
        </div>
    )
}

export default AppTasks