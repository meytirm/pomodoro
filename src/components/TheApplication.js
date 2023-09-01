import {SettingProvider} from "../SettingContext";
import moment from "moment/moment";
import TheHeader from "./TheHeader";
import TheTimer from "./timer/TheTimer";
import {TaskProvider} from "../TaskContext";
import TheTasks from "./tasks/TheTasks";

function TheApplication() {
    if (!localStorage.getItem('tasks')) {
        localStorage.setItem('tasks', JSON.stringify([]))
    }
    if (!localStorage.getItem('report')) {
        localStorage.setItem('report', JSON.stringify({
            dates: {
                labels: [moment().format('YYYY-MM-DD')], data: [0]
            }
        }))
    }
    return (
        <div>
            <SettingProvider>
                <TaskProvider>
                    <TheHeader />
                    <TheTimer />
                    <TheTasks />
                </TaskProvider>
            </SettingProvider>
        </div>
    );
}

export default TheApplication