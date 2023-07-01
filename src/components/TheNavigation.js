import BaseButton from "./BaseButton";
import {useState} from "react";
import ModalSetting from "./ModalSetting";
import ModalReport from "./ModalReport";



function TheNavigation() {
    const [reportModal, setReportModal] = useState(false)
    const [settingModal, setSettingModal] = useState(false)


    return (
        <div className="p-navigation">
            <div className="p-navigation__brand">
                <img src="/pomodoro.png" alt="pomodoro" width="30px"/>
                <span className="p-navigation__text">Pomodoro</span>
            </div>
            <div className="p-navigation__menu">
                <BaseButton onClick={() => setReportModal(!reportModal)}>
                    <span>Report</span>
                    <span className="icon-insert_chart_outlined"></span>
                </BaseButton>
                <BaseButton onClick={() => setSettingModal(!settingModal)}>
                    <span>Setting</span>
                    <span className="icon-cog"></span>
                </BaseButton>
                {/*<BaseButton>Login <span className="icon-user-solid-circle"></span></BaseButton>*/}
            </div>
            <ModalSetting
                value={settingModal}
                close={(value) => setSettingModal(value)}
            />

            <ModalReport
                value={reportModal}
                close={(value) => setReportModal(value)}
            />

        </div>
    )
}

export default TheNavigation