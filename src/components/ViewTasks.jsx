import { useState } from "react";
import { Link } from "react-router-dom";
import EmptyList from "./EmptyList";
import "../css/ViewTasks.css";

function ViewTasks() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });

  return (
    <>
      {tasks && tasks.length > 0 ? (
        <div className="tasks-container">
          <div className="tasks-header">
            <span className="tasks-count">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
            </span>
            <Link to="/tasks-assignments/tasks/create" className="tasks-create-btn">
              <i className="fa-solid fa-plus"></i> Create Task
            </Link>
          </div>

          <div className="tasks-table-wrapper">
            <table className="tasks-table">
              <thead>
                <tr>
                  <th className="tasks-table__th tasks-table__th--title">Title</th>
                  <th className="tasks-table__th tasks-table__th--deadline">Deadline</th>
                  <th className="tasks-table__th tasks-table__th--description">Description</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id || task.title} className="tasks-table__row">
                    <td className="tasks-table__td tasks-table__td--title">{task.title}</td>
                    <td className="tasks-table__td tasks-table__td--deadline">
                      {task.deadline ? (
                        <span className="tasks-table__deadline-badge">
                          <i className="fa-regular fa-calendar"></i> {task.deadline}
                        </span>
                      ) : (
                        <span className="tasks-table__empty-cell">—</span>
                      )}
                    </td>
                    <td className="tasks-table__td tasks-table__td--description">
                      {task.description ? (
                        <span className="tasks-table__description-text">{task.description}</span>
                      ) : (
                        <span className="tasks-table__empty-cell">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyList
          icon="fa-solid fa-file-circle-question"
          title="No current tasks"
          message="Looks like you're all caught up! Check back later for new tasks or add one yourself."
          CTA_text="Create Task"
          CTA_link="/tasks-assignments/tasks/create"
        />
      )}
    </>
  );
}

export default ViewTasks;
