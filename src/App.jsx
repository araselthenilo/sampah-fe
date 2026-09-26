import "./css/App.css";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import TasksAssignments from "./pages/TasksAssignments";
import TasksView from "./components/TasksView";
import AssignmentsView from "./components/AssignmentsView";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import MissingPage from "./pages/MissingPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks-assignments" element={<TasksAssignments />}>
            <Route index element={<Navigate to="tasks" replace />} />
            <Route path="tasks" element={<TasksView />} />
            <Route path="assignments" element={<AssignmentsView />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<MissingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
