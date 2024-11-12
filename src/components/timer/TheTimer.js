import TimerProgressBar from "./TimerProgressBar";
import TimerNavigation from "./TimerNavigation";
import {useState} from "react";
import TimerCountDown from "./TimerCountDown";
import {useSettings} from "../../SettingContext";
import TimerController from "./TimerController";
import TimerCounterReport from "./TimerCounterReport";
import useTimer from "../../hooks/useTimer";
import useOnComplete from "../../hooks/useOnComplete";


function TheTimer() {
    const settings = useSettings()
    const {times} = settings
    const {pomodoro, shortBreak, longBreak} = times
    const tabs = [
        {label: 'Pomodoro', name: 'pomodoro', color: 'rgb(186, 73, 73)', time: pomodoro},
        {label: 'Break', name: 'shortBreak', color: 'rgb(56, 133, 138)', time: shortBreak},
        {label: 'Long Break', name: 'longBreak', color: 'rgb(57, 112, 151)', time: longBreak},
    ]
    const [tab, setTab] = useState(0);
    const [pause, setPause] = useState(true);
    const currentTabTimer = tabs[tab].time * 60
    const {seconds, resetTimer} = useTimer(currentTabTimer, pause, onComplete, tabs[tab]);
    const {doneTask} = useOnComplete(tabs[tab])

    function handleNavigationClick(tabIndex) {
        resetTimer(0)
        setTab(tabIndex)
        resetTimer(currentTabTimer)
    }

    function onComplete()  {
        doneTask()
        handleNavigationClick((tab + 1) % tabs.length)
        setPause(true)
    }

    return (
        <div className="p-timer">
            <TimerProgressBar minutes={tabs[tab].time} seconds={seconds}/>
            <TimerNavigation tab={tab} tabs={tabs} onClick={handleNavigationClick}/>
            <TimerCountDown allSeconds={seconds}/>
            <TimerController pause={pause} onClick={() => setPause(!pause)}/>
            <TimerCounterReport timerTab={tabs[tab]}/>
        </div>
    )
}

export default TheTimer