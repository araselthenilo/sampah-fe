import "./css/App.css";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import TasksAssignments from "./pages/TasksAssignments";
import TasksView from "./components/TasksView";
import AssignmentsView from "./components/AssignmentsView";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import MissingPage from "./pages/MissingPage";
import CreateTask from "./pages/CreateTask";
import CreateAssignment from "./pages/CreateAssignment";
import ViewAll from "./components/ViewAll";
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
  redirect,
} from "react-router-dom";

const routes = createRoutesFromElements(
  <>
    <Route path="/" Component={MainLayout}>
      <Route index loader={() => redirect("dashboard")} />
      <Route path="dashboard" Component={Dashboard} />
      <Route path="tasks-assignments">
        <Route Component={ViewAll}>
          <Route index loader={() => redirect("tasks")} />
          <Route path="tasks" Component={TasksView} />
          <Route path="assignments" Component={AssignmentsView} />
        </Route>
        <Route path="tasks/create" Component={CreateTask} />
        <Route path="assignments/create" Component={CreateAssignment} />
      </Route>
      <Route path="profile" Component={Profile} />
      <Route path="settings" Component={Settings} />
    </Route>
    <Route path="*" Component={MissingPage} />
  </>,
);

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
