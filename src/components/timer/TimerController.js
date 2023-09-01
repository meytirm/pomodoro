import BaseButton from "../base/BaseButton";

function TimerController({pause, onClick}) {
    const startButton = <BaseButton className="p-button--xl">START</BaseButton>
    const pauseButton = <BaseButton className="p-button--xl">PAUSE</BaseButton>

    let button
    if (pause) {
        button = startButton
    } else {
        button = pauseButton
    }

    return (
        <div onClick={onClick}>{button}</div>
    )
}

export default TimerController