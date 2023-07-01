import {createContext, useContext, useReducer} from "react";

const SettingsContext = createContext(null)
const SettingsDispatchContexts = createContext(null)

export function SettingProvider({children}) {
    const [settings, dispatch] = useReducer(settingsReducer, initialSettings)

    return (
        <SettingsContext.Provider value={settings}>
            <SettingsDispatchContexts.Provider value={dispatch}>
                {children}
            </SettingsDispatchContexts.Provider>
        </SettingsContext.Provider>
    )
}

export function useSettings() {
    return useContext(SettingsContext)
}

export function useSettingsDispatch() {
    return useContext(SettingsDispatchContexts)
}

function settingsReducer(settings, action) {
    switch (action.type) {
        case 'updateTime': {
            return {...settings, times: action.times}
        }
        case 'updateSetting': {
            return action.settings
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

let initialSettings = JSON.parse(localStorage.getItem('settings'))
if (!initialSettings) {
    const settings = {
        times: {pomodoro: 25, shortBreak: 5, longBreak: 15},
        autoTask: false
    }

    localStorage.setItem('settings', JSON.stringify(settings))
    initialSettings = settings
}

