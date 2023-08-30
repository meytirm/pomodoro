import BaseInput from "../base/BaseInput";
import BaseSwitch from "../base/BaseSwitch";
import BaseModal from "../base/BaseModal";
import {useSettings, useSettingsDispatch} from "../../SettingContext";

function ModalSetting({ value, close }) {
    const settings = useSettings()
    const dispatch = useSettingsDispatch()
    const { times, autoTask } = settings

    function timeDispatch(name, value) {
        const newTimes = {...times, [name]: value }
        saveSetting({...settings, times: newTimes})
        dispatch({
            type: 'updateTime',
            times: newTimes
        })
    }

    function settingDispatch(name, value) {
        const newSettings = {...settings, [name]: value}
        saveSetting(newSettings)
        dispatch({
            type: 'updateSetting',
            settings: newSettings
        })
    }

    function saveSetting(settings) {
        localStorage.setItem('settings', JSON.stringify(settings))
    }

    return (
        <BaseModal value={value} close={() => close(false)} title="Setting">
            <div className="modal-section">
                <div className="modal-section__header">
                    <span className="icon-access_time"></span>
                    <span className="modal-section__title">Timer</span>
                </div>
                <div className="modal-section__main">
                    <span className="modal-section__label">Time (minutes)</span>
                    <div className="modal-section__time">
                        <div>
                            <BaseInput
                                type="number"
                                value={times.pomodoro}
                                onInput={(e) => timeDispatch('pomodoro', e.target.value)}
                                min="1"
                                label="Pomodoro"
                            />
                        </div>
                        <div>
                            <BaseInput
                                type="number"
                                value={times.shortBreak}
                                onInput={(e) => timeDispatch('shortBreak', e.target.value)}
                                min="1"
                                label="Short Break"
                            />
                        </div>
                        <div>
                            <BaseInput
                                type="number"
                                value={times.longBreak}
                                onInput={(e) => timeDispatch('longBreak', e.target.value)}
                                min="1"
                                label="Long Break"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-section">
                <div className="modal-section__header">
                    <span className="icon-edit"></span>
                    <span className="modal-section__title">Tasks</span>
                </div>
                <div className="modal-section__main">
                    <div className="d-flex items-center justify-between">
                        <div className="d-flex items-center gap-5 dark-grey-text font-weight-normal">
                            <span>Auto Switch Tasks</span>
                            <span className="icon-explanation-mark1 cursor-pointer"></span>
                        </div>
                        <BaseSwitch
                            value={autoTask}
                            onclick={() => settingDispatch('autoTask', !autoTask)}
                        />
                    </div>
                </div>
            </div>
        </BaseModal>
    )
}

export default ModalSetting