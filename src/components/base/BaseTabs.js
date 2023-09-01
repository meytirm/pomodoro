import BaseButton from "./BaseButton";

function BaseTabs({tabs, value ,onClick}) {
    function handleTabClick(index) {
        onClick(index)
    }

    const mappedTabs = tabs.map((tab, index) => <BaseButton
        key={index}
        active={index === value}
        onClick={() => handleTabClick(index)}
        transparent>{tab.label}</BaseButton>)

    return (
        <div className="p-tabs">
            {mappedTabs}
        </div>
    )
}

export default BaseTabs