import EmptyList from "./EmptyList";

function ViewTasks() {
  return (
    <>
      <EmptyList
        icon="fa-solid fa-file-circle-question"
        title="No current tasks"
        message="Looks like you're all caught up! Check back later for new tasks or add one yourself."
        CTA_text="Create Task"
        CTA_link="/tasks-assignments/tasks/create"
      />
    </>
  );
}

export default ViewTasks;
