import BaseTabs from "../base/BaseTabs";

function TimerNavigation({tab, tabs, onClick}) {
    const body = document.querySelector('body')
    body.style.backgroundColor = tabs[tab].color
    return (
        <BaseTabs value={tab} tabs={tabs} onClick={onClick}/>
    )
}

export default TimerNavigation