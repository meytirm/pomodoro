import AppTimerCountDown from "./AppTimerCountDown";
import AppTimerButtons from "./AppTimerButtons";
import BaseTabs from "./BaseTabs";
import AppTimerProgressiveBar from "./AppTimerProgressiveBar";
import {useEffect, useRef, useState} from 'react';
import {useSettings} from "../SettingContext";
import {useTasks, useTasksDispatch} from "../TaskContext";
import moment from "moment";
import {setTasks} from "../utils/task-api";


function AppTimer() {
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

    const [pause, setPause] = useState(true);
    const [tab, setTab] = useState(0);
    const [timerEnd, setTimerEnd] = useState(false);

    const currentTab = tabs[tab]
    const minutes = currentTab.time
    const color = currentTab.color

    const [minutesToSeconds, setMinutesToSeconds] = useState(minutes * 60);

    useEffect(() => {
        setMinutesToSeconds(minutes * 60)
    }, [minutes])

    useEffect(() => {
        if (timerEnd) {
            const timerType = tabs[tab].name
            let countOfTimer = localStorage.getItem(timerType)
            localStorage.setItem(tabs[tab].name, Number(countOfTimer) + 1)

            const copyTasks = [...tasks]
            const findTask = copyTasks.find((item) => item.selected === true)
            if (timerType === 'pomodoro') {
                findTask.didPomodoro += 1
            }
            setTasks(copyTasks)
            tasksDispatch({type: 'update', tasks: copyTasks})
            setTimerEnd(false)
            if (tab === 2) {
                const minutes = tabs[0].time
                setTab(0)
                setMinutesToSeconds(minutes * 60)
            } else {
                const minutes = tabs[tab + 1].time
                setTab(tab + 1)
                setMinutesToSeconds(minutes * 60)
            }
            if (settings.autoTask) {
                const taskIndex = copyTasks.findIndex(task => task.selected === true)
                if (taskIndex === copyTasks.length -1) {
                    copyTasks.forEach((task, index) => {
                        if (index === 0) {
                            task.selected = true
                        } else {
                            task.selected = false
                        }
                    })
                } else {
                    copyTasks.forEach((task, index) => {
                        if (index === taskIndex) {
                            task.selected = true
                        } else {
                            task.selected = false
                        }
                    })
                }
            }
        }
    }, [timerEnd])

    const intervalRef = useRef(null)

    function handleTimerState() {
        setPause(n => !n)
        if (pause) {
            startTimer()
            intervalRef.current = setInterval(startTimer, 1000);
        } else {
            stopTimer()
        }
    }

    function startTimer() {
        const report = JSON.parse(localStorage.getItem('report'))
        const today = moment().format('YYYY-MM-DD')

        setMinutesToSeconds((seconds) => seconds - 1);

        if (report.dates.labels[report.dates.labels.length - 1] !== today) {
            report.dates.labels.push(today)
            report.dates.data.push(0)
        }
        if (tabs[tab].name === 'pomodoro')
        report.dates.data[report.dates.labels.length - 1] += 1
        localStorage.setItem('report', JSON.stringify(report))
    }


    function stopTimer() {
        clearInterval(intervalRef.current)
    }

    if (minutesToSeconds === 0 && !pause) {
        setTimerEnd(true)
        handleTimerState()
    }

    function setTabClick(tabIndex) {
        const minutes = tabs[tabIndex].time
        setTab(tabIndex)
        setMinutesToSeconds(minutes * 60)

        if (!pause) {
            handleTimerState()
        }
    }

    document.querySelector('body').style.background = color

    const percent = (
        ((minutes * 60 - minutesToSeconds) / (minutes * 60)) * 100
    ).toFixed(2)

    let countOfTimer = localStorage.getItem(tabs[tab].name)
    countOfTimer = countOfTimer ? countOfTimer : 0

    return (
        <div className="p-timer">
            <AppTimerProgressiveBar percent={percent}/>
            <BaseTabs value={tab} tabs={tabs} onClick={setTabClick}/>
            <AppTimerCountDown time={minutesToSeconds}/>
            <AppTimerButtons pause={pause} onClick={handleTimerState}/>
            <div className="p-timer__count">
                <span>Count Of Timer: </span>
                <span>#{countOfTimer}</span>
            </div>
        </div>
    )

}

export default AppTimer