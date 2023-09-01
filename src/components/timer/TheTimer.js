import TimerProgressBar from "./TimerProgressBar";
import TimerNavigation from "./TimerNavigation";
import {useEffect, useRef, useState} from "react";
import TimerCountDown from "./TimerCountDown";
import {useSettings} from "../../SettingContext";
import TimerController from "./TimerController";
import TimerCounterReport from "./TimerCounterReport";
import {setTasks} from "../../utils/task-api";
import {useTasks, useTasksDispatch} from "../../TaskContext";
import moment from "moment/moment";


function TheTimer() {
    const intervalRef = useRef(null)
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
    const [seconds, setSeconds] = useState(tabs[tab].time * 60);

    function handleNavigationClick(tabIndex) {
        setTab(tabIndex)
        setSeconds(tabs[tabIndex].time * 60)
    }

    useEffect(() => {
        if (seconds === 0) {
            const timerType = tabs[tab].name
            let countOfTimer = localStorage.getItem(timerType)
            localStorage.setItem(timerType, (Number(countOfTimer) + 1).toString())

            const copyTasks = [...tasks]
            const findTask = copyTasks.find((item) => item.selected === true)
            if (timerType === 'pomodoro') {
                findTask.didPomodoro += 1
            }
            if (settings.autoTask) {
                console.log('here')
                const taskIndex = copyTasks.findIndex(task => task.selected === true)
                if (taskIndex === copyTasks.length - 1) {
                    copyTasks.forEach((task, index) => {
                        if (index === 0) {
                            task.selected = true
                        } else {
                            task.selected = false
                        }
                    })
                } else {
                    copyTasks.forEach((task, index) => {
                        console.log(index, taskIndex, task)
                        if (index === taskIndex + 1) {
                            task.selected = true
                        } else {
                            task.selected = false
                        }
                    })
                }
            }
            setTasks(copyTasks)
            tasksDispatch({type: 'update', tasks: copyTasks})
            handleFinishedTimer()
            setPause(true)
        }
        if (!pause) {
            intervalRef.current = setInterval(() => {
                setSeconds(seconds => seconds - 1)
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
            }, 1000)
        }
        return () => clearInterval(intervalRef.current)
    }, [pause, seconds])

    function handleFinishedTimer() {
        if (tab === tabs.length - 1) {
            handleNavigationClick(0)
        }
        handleNavigationClick(tab + 1)
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