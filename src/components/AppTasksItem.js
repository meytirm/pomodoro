import BaseButton from "./BaseButton";
import AppModal from "./AppModal";
import {useRef, useState} from "react";
import BaseInput from "./BaseInput";
import BaseTextArea from "./BaseTextArea";

function AppTasksItem({task, updateTasks, selected, selectItemEvent}) {
    const [editModal, setEditModal] = useState(false)
    const [removeModal, setRemoveModal] = useState(false)

    const [title, setTitle] = useState(task.title)
    const [countOfPomodoro, setCountOfPomodoro] = useState(task.countOfPomodoro)
    const [note, setNote] = useState(task.note)
    const [done, setDone] = useState(task.done)

    const doneRef = useRef()

    const tasks = JSON.parse(localStorage.getItem('tasks'))

    function justNumber(e) {
        if (e.target.value) {
            setCountOfPomodoro(e.target.value)
        } else {
            e.preventDefault()
        }
    }

    function removeTasks() {
        const filteredTasks = tasks.filter((item) => item.id !== task.id)
        localStorage.setItem('tasks', JSON.stringify(filteredTasks))
        updateTasks(filteredTasks)
        setRemoveModal(false)
    }

    function editTasks() {
        const editedTasks = tasks.map((item) => {
            if (item.id === task.id) {
                return {id: item.id, title, countOfPomodoro, note, done, didPomodoro: item.didPomodoro}
            }
            return item
        })
        localStorage.setItem('tasks', JSON.stringify(editedTasks))
        updateTasks(editedTasks)
        setEditModal(false)
    }

    const isTaskSelected = selected ? ' p-list__item--active' : ''

    function selectItem(e) {
        if (!doneRef.current.contains(e.target)) {
            selectItemEvent(task.id)
        }
    }

    function toggleDone() {
        const editedTasks = tasks.map((item) => {
            setDone(done => !done)
            if (item.id === task.id) {
                return {id: item.id, title, countOfPomodoro, note, done: !done, didPomodoro: item.didPomodoro}
            }
            return item
        })
        localStorage.setItem('tasks', JSON.stringify(editedTasks))
        updateTasks(editedTasks)
    }

    const doneClass = done ? ' p-list__icon--done' : ''

    return (
        <div>
            <div className={'p-list__item' + isTaskSelected} onClick={selectItem}>
                <div className="p-list__info">
                    <span className={'p-list__icon icon-checkmark2' + doneClass} ref={doneRef}
                          onClick={toggleDone}></span>
                    <span className="p-list__title">{task.title}</span>
                </div>
                <div className="p-list__options">
                    <span className="p-list__remaining">{task.didPomodoro}/{task.countOfPomodoro}</span>
                    <div className="p-list__operation">
                        <BaseButton onClick={() => setRemoveModal(true)}>
                            <span className="icon-bin"></span>
                        </BaseButton>
                        <BaseButton onClick={() => setEditModal(true)}>
                            <span className="icon-edit-pencil"></span>
                        </BaseButton>
                    </div>
                </div>
            </div>
            <AppModal value={editModal} close={() => setEditModal(false)} submit={editTasks}>
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

                <BaseTextArea
                    onInput={(e) => setNote(e.target.value)}
                    value={note}/>
            </AppModal>
            <AppModal
                title="Delete"
                value={removeModal}
                close={() => setRemoveModal(false)}
                submit={removeTasks}>
                Are you sure to delete?
            </AppModal>
        </div>
    )
}

export default AppTasksItem