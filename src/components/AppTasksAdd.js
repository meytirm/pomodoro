import BaseButton from "./BaseButton";
import AppModal from "./AppModal";
import {useState} from "react";
import BaseInput from "./BaseInput";
import BaseTextArea from "./BaseTextArea";

function AppTasksAdd({updateTasks}) {
    const [modal, setModal] = useState(false)
    const [countOfPomodoro, setCountOfPomodoro] = useState(1)
    const [showNote, setShowNote] = useState(false)
    const [note, setNote] = useState("")
    const [title, setTitle] = useState("")

    function justNumber(e) {
        if (e.target.value) {
            setCountOfPomodoro(e.target.value)
        } else {
            e.preventDefault()
        }
    }

    function saveNewTask() {
        const didPomodoro = 0
        const done = false
        const id = Date.now() + Math.random().toFixed()
        const task = JSON.stringify({title, note, countOfPomodoro, id, done, didPomodoro, selected: false})
        let tasks = localStorage.getItem('tasks')
        if (tasks) {
            const parsedTasks = JSON.parse(tasks)
            parsedTasks.push(JSON.parse(task))
            localStorage.setItem('tasks', JSON.stringify(parsedTasks))
        } else {
            const task = JSON.stringify([{title, note, countOfPomodoro, id, done, didPomodoro, selected: true}])
            localStorage.setItem('tasks', task)
        }
        updateTasks(JSON.parse(localStorage.getItem('tasks')))
        setModal(false)
    }

    return (
        <div>
            <BaseButton
                className="p-add-button"
                onClick={() => setModal(true)}
            >
                <span className="icon-add-solid"></span>
                <span>ADD TASK</span>
            </BaseButton>
            <AppModal
                value={modal}
                title="Add Task"
                close={() => setModal(false)}
                submit={saveNewTask}>
                <BaseInput
                    value={title}
                    label="Task Name: "
                    placeholder="What are you working on?"
                    onInput={(e) => setTitle(e.target.value)}
                />
                <div>
                    <BaseInput
                        label="Count Of Pomodoro: "
                        placeholder="What are you working on?"
                        type="number"
                        min="1"
                        max="5"
                        value={countOfPomodoro}
                        onInput={justNumber}
                    />
                </div>
                {
                    !showNote ?
                        <BaseButton
                            className="dark-grey-text"
                            onClick={() => setShowNote(true)}>
                            Add Note</BaseButton> :
                        <BaseTextArea
                            onInput={(e) => setNote(e.target.value)}
                            value={note}/>
                }
            </AppModal>
        </div>
    )
}

export default AppTasksAdd

