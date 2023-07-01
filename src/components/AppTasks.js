import AppTasksHeader from "./AppTasksHeader";
import AppTasksList from "./AppTasksList";
import AppTasksAdd from "./AppTasksAdd";

function AppTasks() {
    return (
        <div>
            <AppTasksHeader />
            <AppTasksList />
            <AppTasksAdd />
        </div>
    )
}

export default AppTasks