import EmptyList from "../components/EmptyList";

function TasksView() {
    return (
        <>
            <EmptyList
                icon="fa-solid fa-file-circle-question"
                title="No current tasks"
                message="Looks like you're all caught up! Check back later for new tasks or add one yourself."
                CTA_text="Add Task"
                CTA_link="/tasks-assignments/tasks/add-task"
            />
        </>
    )
}

export default TasksView