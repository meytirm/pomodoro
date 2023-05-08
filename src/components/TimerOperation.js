import TimerOperationCountDown from "./TimerOperationCountDown";
import TimerOperationButtons from "./TimerOperationButtons";
import TimerOperationTabs from "./TimerOperationTabs";
import ProgressiveBar from "./ProgressiveBar";
import {useEffect, useState} from 'react';


function TimerOperation() {
    const [timerState, setTimerState] = useState(false);
    const [minutes, setMinutes] = useState(15);
    const [minutesToSeconds, setMinutesToSeconds] = useState(minutes * 60);
    const [tab, setTab] = useState(0);

    const tabs = [
        {name: 'Pomodoro', color: 'rgb(186, 73, 73)', time: 15},
        {name: 'Break', color: 'rgb(56, 133, 138)', time: 5},
        {name: 'Long Break', color: 'rgb(57, 112, 151)', time: 25},
    ]

    function handleTimerState() {
        setTimerState(n => !n)
    }

    useEffect(() => {
        let interval;
        if (timerState) {
            interval = setInterval(() => {
                if (minutesToSeconds === 0) {
                    const timerType = tabs[tab].name
                    const minutes = tabs[tab].time
                    let countOfTimer = localStorage.getItem(timerType)

                    setMinutesToSeconds(minutes * 60)
                    countOfTimer = countOfTimer ? countOfTimer : 0

                    handleTimerState()

                    return localStorage.setItem(timerType, (Number(countOfTimer) + 1).toString())
                }
                setMinutesToSeconds((seconds) => seconds - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerState, minutesToSeconds]);

    function setTabClick(tabIndex) {
        const minutes = tabs[tabIndex].time
        const color = tabs[tabIndex].color

        setTab(tabIndex)
        setMinutes(minutes)
        setMinutesToSeconds(minutes * 60)

        changeBackground(color)

        if (timerState) {
            handleTimerState()
        }
    }

    function changeBackground(color) {
        document.querySelector('body').style.background = color
    }

    const percent = (
        ((minutes * 60 - minutesToSeconds) / (minutes * 60)) * 100
    ).toFixed(2)

    return (
        <div className="p-timer">
            <ProgressiveBar percent={percent}/>
            <TimerOperationTabs value={tab} tabs={tabs} onClick={setTabClick}/>
            <TimerOperationCountDown time={minutesToSeconds}/>
            <TimerOperationButtons state={timerState} onClick={handleTimerState}/>
            <div>
                <span>Count Of Timer: </span>
                <span># {localStorage.getItem(tabs[tab].name)}</span>
            </div>
        </div>
    )
}

export default TimerOperation