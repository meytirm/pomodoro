import AppTimer from "./AppTimer";
import AppTasks from "./AppTasks";
import AppReport from "./AppReport";

function TheApplication() {
    return (
        <div className="p-application">
            <AppTimer />
            <AppTasks />
            <AppReport />
        </div>
    )
}

export default TheApplication