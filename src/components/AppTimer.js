import AppTimerCountDown from "./AppTimerCountDown";
import AppTimerButtons from "./AppTimerButtons";
import AppTimerTabs from "./AppTimerTabs";
import AppTimerProgressiveBar from "./AppTimerProgressiveBar";
import {useEffect, useState} from 'react';


function AppTimer() {
    const [timerState, setTimerState] = useState(false);
    const [minutes, setMinutes] = useState(0.1);
    const [minutesToSeconds, setMinutesToSeconds] = useState(minutes * 60);
    const [tab, setTab] = useState(0);

    const tabs = [
        {name: 'Pomodoro', color: 'rgb(186, 73, 73)', time: 0.1},
        {name: 'Break', color: 'rgb(56, 133, 138)', time: 0.2},
        {name: 'Long Break', color: 'rgb(57, 112, 151)', time: 0.3},
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

    let countOfTimer = localStorage.getItem(tabs[tab].name)
    countOfTimer = countOfTimer ? countOfTimer : 0

    return (
        <div className="p-timer">
            <AppTimerProgressiveBar percent={percent}/>
            <AppTimerTabs value={tab} tabs={tabs} onClick={setTabClick}/>
            <AppTimerCountDown time={minutesToSeconds}/>
            <AppTimerButtons state={timerState} onClick={handleTimerState}/>
            <div className="p-timer__count">
                <span>Count Of Timer: </span>
                <span>#{countOfTimer}</span>
            </div>
        </div>
    )

}

export default AppTimer