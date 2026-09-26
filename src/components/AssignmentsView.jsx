import EmptyList from "../components/EmptyList";

function AssignmentsView() {
    return (
        <>
            <EmptyList
                icon="fa-solid fa-file-circle-question"
                title="No current assignments"
                message="Looks like you're all caught up! Check back later for new assignments or add one yourself."
                CTA_text="Add Assignment"
                CTA_link="/tasks-assignments/assignments/add-assignment"
            />
        </>
    )
}

export default AssignmentsView;