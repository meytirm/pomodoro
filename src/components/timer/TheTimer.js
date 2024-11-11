import TimerProgressBar from "./TimerProgressBar";
import TimerNavigation from "./TimerNavigation";
import {useState} from "react";
import TimerCountDown from "./TimerCountDown";
import {useSettings} from "../../SettingContext";
import TimerController from "./TimerController";
import TimerCounterReport from "./TimerCounterReport";
import {setTasks} from "../../utils/task-api";
import {useTasks, useTasksDispatch} from "../../TaskContext";
import moment from "moment/moment";
import useTimer from "../../hooks/useTimer";


function TheTimer() {
    const settings = useSettings()
    const tasks = useTasks()
    const tasksDispatch = useTasksDispatch()
    const {times} = settings
    const {pomodoro, shortBreak, longBreak} = times
    const tabs = [
        {label: 'Pomodoro', name: 'pomodoro', color: 'rgb(186, 73, 73)', time: pomodoro},
        {label: 'Break', name: 'shortBreak', color: 'rgb(56, 133, 138)', time: shortBreak},
        {label: 'Long Break', name: 'longBreak', color: 'rgb(57, 112, 151)', time: longBreak},
    ]
    const [tab, setTab] = useState(0);
    const [pause, setPause] = useState(true);

    function handleNavigationClick(tabIndex) {
        setTab(tabIndex)

    }

    const {seconds} = useTimer(tabs[tab].time * 60, pause, onComplete, onRunning)

    function handleFinishedTimer() {
        if (tab === tabs.length - 1) {
            handleNavigationClick(0)
        }
        console.log(tab, tab+1)
        handleNavigationClick(tab + 1)
    }

    function onComplete() {
        const timerType = tabs[tab].name
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
        handleFinishedTimer()
        setPause(true)
    }

    function onRunning() {
        const report = JSON.parse(localStorage.getItem('report'))
        const today = moment().format('YYYY-MM-DD')
        if (report.dates.labels[report.dates.labels.length - 1] !== today) {
            report.dates.labels.push(today)
            report.dates.data.push(0)
        }
        if (tabs[tab].name === 'pomodoro') {
            report.dates.data[report.dates.labels.length - 1] += 1
            localStorage.setItem('report', JSON.stringify(report))
        }
    }

    return (
        <div className="p-timer">
            {tab.name}
            <TimerProgressBar minutes={tabs[tab].time} seconds={seconds}/>
            <TimerNavigation tab={tab} tabs={tabs} onClick={handleNavigationClick}/>
            <TimerCountDown allSeconds={seconds}/>
            <TimerController pause={pause} onClick={() => setPause(!pause)}/>
            <TimerCounterReport timerTab={tabs[tab]}/>
        </div>
    )
}

export default TheTimer