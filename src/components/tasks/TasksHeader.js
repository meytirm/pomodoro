import {useEffect, useState, useRef} from "react";
import {useTasks, useTasksDispatch} from "../../TaskContext";
import {getTasks, setTasks} from "../../utils/task-api";
import BaseButton from "../base/BaseButton";

function TasksHeader() {
    const [optionIsOpen, setOptionIsOpen] = useState(false)
    const dropdownRef = useRef()
    const buttonActiveClass = optionIsOpen ? 'p-button--active' : ''
    const tasksDispatch = useTasksDispatch()
    const tasks = useTasks()

    function handleRemoveAllTasks() {
        const tasks = []
        setTasks(tasks)
        tasksDispatch({
            type: 'update',
            tasks: []
        })
    }

    function handleRemoveFinishedTasks() {
        let copyTasks = [...tasks]
        copyTasks = copyTasks.filter(task => task.done === false)
        setTasks(copyTasks)
        tasksDispatch({
            type: 'update',
            tasks: copyTasks
        })
    }

    function handleRemoveUnfinishedTasks() {
        let copyTasks = [...tasks]
        copyTasks = copyTasks.filter(task => task.done === true)
        setTasks(copyTasks)
        tasksDispatch({
            type: 'update',
            tasks: copyTasks
        })
    }

    function handleDoneAllTasks() {
        let copyTasks = [...tasks]
        copyTasks.forEach(task => task.done = true)
        setTasks(copyTasks)
        tasksDispatch({
            type: 'update',
            tasks: copyTasks
        })
    }

    function handleUndoneAllTasks() {
        let copyTasks = [...tasks]
        copyTasks.forEach(task => task.done = false)
        setTasks(copyTasks)
        tasksDispatch({
            type: 'update',
            tasks: copyTasks
        })
    }

    const menuIsOpen = optionIsOpen ? <ul className="p-dropdown__menu">
        <li className="p-dropdown__item" onClick={handleRemoveAllTasks}>
            <div className="icon-bin"></div>
            <div>Remove All Tasks</div>
        </li>
        <li className="p-dropdown__item" onClick={handleRemoveFinishedTasks}>
            <div className="icon-bin"></div>
            <div>Remove All Finished Tasks</div>
        </li>
        <li className="p-dropdown__item" onClick={handleRemoveUnfinishedTasks}>
            <div className="icon-bin"></div>
            <div>Remove All Unfinished Tasks</div>
        </li>
        <li className="p-dropdown__item" onClick={handleDoneAllTasks}>
            <div className="icon-tick"></div>
            <div>Done All Tasks</div>
        </li>
        <li className="p-dropdown__item" onClick={handleUndoneAllTasks}>
            <div className="icon-tick"></div>
            <div>Undone All Tasks</div>
        </li>
    </ul> : ''

    useEffect(() => {
        let handler = (e) => {
            if (!dropdownRef.current.contains(e.target)) {
                setOptionIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handler)

        return () => {
            document.addEventListener('mousedown', handler)
        }
    })
    return (
        <div className="task-header">
            <h4>Tasks</h4>
            <div className="p-dropdown" ref={dropdownRef}>
                <BaseButton onClick={() => setOptionIsOpen(!optionIsOpen)} active={optionIsOpen}
                            className={buttonActiveClass}>
                    <span className="icon-cog"></span>
                </BaseButton>
                {menuIsOpen}
            </div>
        </div>
    )
}

export default TasksHeader