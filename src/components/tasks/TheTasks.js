import TasksHeader from "./TasksHeader";
import TasksList from "./TasksList";
import TasksPomodoroReport from "./TasksPomodoroReport";
import TasksAdd from "./TasksAdd";

function TheTasks() {
    return (
        <div>
            <TasksHeader />
            <TasksList />
            <TasksAdd />
            <TasksPomodoroReport />
        </div>
    )
}

export default TheTasks