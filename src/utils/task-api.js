import {getItem, setItem} from "./local-storage";
import {jsonParse, jsonStringify} from "./json-convert";

function getTasks() {
    return jsonParse(getItem('tasks'))
}

function setTasks(tasks) {
    setItem('tasks' ,jsonStringify(tasks))
    return getTasks()
}

export {getTasks, setTasks}