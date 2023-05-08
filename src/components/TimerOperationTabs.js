import BaseButton from "./BaseButton";

function TimerOperationTabs({tabs, value ,onClick}) {

    function handleTabClick(index) {
        onClick(index)
    }

    const mappedTabs = tabs.map((tab, index) => <BaseButton
        key={index}
        active={index === value}
        onClick={() => handleTabClick(index)}
        transparent>{tab.name}</BaseButton>)

    return (
        <div className="p-tabs">
            {mappedTabs}
        </div>
    )
}

export default TimerOperationTabs