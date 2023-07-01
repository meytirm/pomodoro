import AppTimer from "./AppTimer";
import AppTasks from "./AppTasks";
import AppReport from "./AppReport";
import {TaskProvider} from "../TaskContext";

function TheApplication() {

    return (
        <div className="p-application">
            <TaskProvider>
                <AppTimer />
                <AppTasks />
            </TaskProvider>
            <AppReport/>
        </div>
    )
}

export default TheApplication