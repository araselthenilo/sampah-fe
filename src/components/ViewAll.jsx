import { Outlet } from "react-router-dom";
import PageContent from "./PageContent";
import SwitchButton from "./SwitchButton";

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

function ViewAll() {
  return (
    <PageContent
      title="Tasks & Assignments"
      subtitle="Manage big problems one step at a time"
    >
      <SwitchButton options={SWITCH_OPTIONS} />
      <Outlet />
    </PageContent>
  );
}

export default ViewAll;
