import './App.scss';
import TheNavigation from "./components/TheNavigation";
import TheApplication from "./components/TheApplication";
import {SettingProvider} from "./SettingContext";
import moment from "moment";

function App() {
    if (!localStorage.getItem('tasks')) {
        localStorage.setItem('tasks', JSON.stringify([]))
    }
    if (!localStorage.getItem('report')) {
        localStorage.setItem('report', JSON.stringify({
            dates: {
                labels: [moment().format('YYYY-MM-DD')], data: [0]
            }
        }))
    }
    return (
        <div className="App">
            <SettingProvider>
                <TheNavigation/>
                <TheApplication/>
            </SettingProvider>
        </div>
    );
}

export default App;
