import PageContent from "../components/PageContent";
import SwitchButton from "../components/SwitchButton";
import { Outlet } from "react-router-dom";

const SWITCH_OPTIONS = [
  {
    label: "Tasks",
    value: "/tasks-assignments/tasks",
  },
  {
    label: "Assignments",
    value: "/tasks-assignments/assignments",
  },
];

function TasksAssignments() {
  return (
    <PageContent
      title="Tasks & Assignments"
      subtitle="Manage big problems one step at a time"
    >
      <SwitchButton
        options={SWITCH_OPTIONS}
      />
      <Outlet />
    </PageContent>
  );
}

export default TasksAssignments;
