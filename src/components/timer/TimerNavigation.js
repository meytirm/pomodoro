import BaseTabs from "../base/BaseTabs";
import {useState} from "react";

function TimerNavigation({tab, tabs, onClick}) {
    return (
        <BaseTabs value={tab} tabs={tabs} onClick={onClick}/>
    )
}

export default TimerNavigation