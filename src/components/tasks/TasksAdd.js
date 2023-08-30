import {useState} from "react";
import {useTasks, useTasksDispatch} from "../../TaskContext";
import {getTasks, setTasks} from "../../utils/task-api";
import BaseModal from "../base/BaseModal";
import BaseButton from "../base/BaseButton";
import BaseInput from "../base/BaseInput";
import BaseTextArea from "../modal/BaseTextArea";

function TasksAdd() {
    const [modal, setModal] = useState(false)
    const [countOfPomodoro, setCountOfPomodoro] = useState(1)
    const [showNote, setShowNote] = useState(false)
    const [note, setNote] = useState("")
    const [title, setTitle] = useState("")
    const taskDispatch = useTasksDispatch()
    const tasks = useTasks()

    function justNumber(e) {
        if (e.target.value) {
            setCountOfPomodoro(e.target.value)
        } else {
            e.preventDefault()
        }
    }


    function createTask() {
        const id = Date.now() + Math.random().toFixed()
        const task = {title, note, countOfPomodoro, id, done: false, didPomodoro: 0, selected: false}
        const tasks = getTasks()
        if (tasks.length === 0) {
            task.selected = true
        }
        console.log(task.selected)
        tasks.push(task)
        setTasks(tasks)
        taskDispatch({type: 'create', task})
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
            <BaseModal
                value={modal}
                title="Add Task"
                close={() => setModal(false)}
                submit={createTask}
                submitButton>
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
            </BaseModal>
        </div>
    )
}

export default TasksAdd

