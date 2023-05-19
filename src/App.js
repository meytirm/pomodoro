import './App.scss';
import TheNavigation from "./components/TheNavigation";
import TheApplication from "./components/TheApplication";

function App() {
    if (!localStorage.getItem('tasks')) {
        localStorage.setItem('tasks', JSON.stringify([]))
    }
    return (
        <div className="App">
            <TheNavigation/>
            <TheApplication/>
        </div>
    );
}

export default App;
