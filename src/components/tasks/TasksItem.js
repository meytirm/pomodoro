import BaseButton from "../base/BaseButton";
import BaseModal from "../base/BaseModal";
import {useRef, useState} from "react";
import BaseInput from "../base/BaseInput";
import BaseTextArea from "../modal/BaseTextArea";
import {useTasks, useTasksDispatch} from "../../TaskContext";
import {setTasks} from "../../utils/task-api";

function TasksItem({task, selected, selectItemEvent}) {
    const [countOfPomodoro, setCountOfPomodoro] = useState(task.countOfPomodoro)
    const [removeModal, setRemoveModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [title, setTitle] = useState(task.title)
    const [note, setNote] = useState(task.note)
    const [done, setDone] = useState(task.done)
    const tasks = useTasks()
    const tasksDispatch = useTasksDispatch()
    const doneRef = useRef()

    function justNumber(e) {
        if (e.target.value) {
            setCountOfPomodoro(e.target.value)
        } else {
            e.preventDefault()
        }
    }

    function removeTasks() {
        const filteredTasks = tasks.filter((item) => item.id !== task.id)
        setTasks(filteredTasks)
        tasksDispatch({type: 'delete', tasks: filteredTasks})
        setRemoveModal(false)
    }

    function editTasks() {
        const copyTasks = tasks
        const findTask = copyTasks.find((item) => item.id === task.id)
        const editTask = {title, countOfPomodoro, note}

        Object.keys(editTask).forEach(key => {
            findTask[key] = editTask[key]
        })
        setTasks(copyTasks)
        tasksDispatch({type: 'update', tasks: copyTasks})
        setEditModal(false)
    }

    const isTaskSelected = selected ? ' p-list__item--active' : ''

    function selectItem(e) {
        if (!doneRef.current.contains(e.target)) {
            selectItemEvent(task.id)
        }
    }

    function toggleDone() {
        const copyTasks = tasks
        const findTask = copyTasks.find((item) => item.id === task.id)

        setDone(!done)
        findTask.done = !done
        setTasks(copyTasks)
        tasksDispatch({type: 'update', tasks: copyTasks})
    }

    const doneClass = task.done ? ' p-list__icon--done' : ''

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
            <BaseModal value={editModal} close={() => setEditModal(false)} submit={editTasks} submitButton>
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
            </BaseModal>
            <BaseModal
                title="Delete"
                value={removeModal}
                close={() => setRemoveModal(false)}
                submit={removeTasks}
                buttonColor="red"
                submitButton>
                Are you sure to delete?
            </BaseModal>
        </div>
    )
}

export default TasksItem