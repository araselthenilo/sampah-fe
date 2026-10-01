import "./css/App.css";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import TasksAssignments from "./pages/TasksAssignments";
import ViewTasks from "./components/ViewTasks";
import ViewAssignments from "./components/ViewAssignments";
import CreateTask from "./pages/CreateTask";
import CreateAssignment from "./pages/CreateAssignment";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import MissingPage from "./pages/MissingPage";
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
        <Route Component={TasksAssignments}>
          <Route index loader={() => redirect("tasks")} />
          <Route path="tasks" Component={ViewTasks} />
          <Route path="assignments" Component={ViewAssignments} />
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
