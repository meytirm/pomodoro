import {createContext, useContext, useReducer} from "react";
import {getTasks, setTasks} from "./utils/task-api";

const TasksContext = createContext(null)
const TasksDispatchContext = createContext(null)

export function TaskProvider({children}) {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)

    return (
        <TasksContext.Provider value={tasks}>
            <TasksDispatchContext.Provider value={dispatch}>
                {children}
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    )
}


export function useTasks() {
    return useContext(TasksContext)
}

export function useTasksDispatch() {
    return useContext(TasksDispatchContext)
}

function tasksReducer(tasks, action) {
    switch (action.type) {
        case 'update': {
            return action.tasks
        }
        case 'delete': {
            return action.tasks
        }
        case 'create': {
            return [...tasks, action.task]
        }
    }
}

let initialTasks = getTasks()
if (!initialTasks) {
    const tasks = []

    initialTasks = setTasks(tasks)
}