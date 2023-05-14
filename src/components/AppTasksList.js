import AppTasksItem from "./AppTasksItem";

function AppTasksList({tasks}) {
    const items = tasks ? tasks.map(
        (task, index) => <AppTasksItem task={task} key={index} />
    ) : <div className="p-list__empty">You can add your tasks here</div>
    return (
        <div className="p-list">
            {items}
        </div>
    )
}

export default AppTasksList