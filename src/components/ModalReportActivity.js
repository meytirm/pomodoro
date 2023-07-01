import ModalReportActivityChart from "./ModalReportActivityChart";
import BaseTabs from "./BaseTabs";
import {useState} from "react";

function ModalReportActivity() {
    const [tab, setTab] = useState(0)
    const tabs = [
        {label: 'Week', name: 'week'},
        {label: 'Month', name: 'month'},
        {label: 'Year', name: 'year'},
    ]

    return (
        <div>
            <div className="filters-wrapper">
                <div className="p-filters">
                    <BaseTabs value={tab} tabs={tabs} onClick={setTab} />
                </div>
            </div>
            <ModalReportActivityChart filter={tabs[tab].name} />
        </div>
    )
}

export default ModalReportActivity