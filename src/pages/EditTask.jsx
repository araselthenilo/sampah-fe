import { useState, useRef, useEffect } from "react";
import "../css/EditTask.css";
import PageContent from "../components/PageContent";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useBlocker } from "react-router-dom";

function EditTask() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [shakingFields, setShakingFields] = useState({});
  const [task, setTask] = useState(null);
  const deadlineInputRef = useRef(null);
  const isSubmittedRef = useRef(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty }
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: task?.title || "",
      deadline: task?.deadline || "",
      description: task?.description || "",
    }
  });

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      Boolean(
        !isSubmittedRef.current
        && isDirty
        && currentLocation.pathname
        !== nextLocation.pathname
      )
  );

  useEffect(() => {
    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const currentTask = existingTasks.find((t) => String(t.id) === String(taskId));

    if (!currentTask) {
      navigate("/tasks-assignments/tasks", { replace: true });
      return;
    }

    setTask(currentTask);

    reset({
      title: currentTask.title,
      deadline: currentTask.deadline || "",
      description: currentTask.description || ""
    });
  }, [taskId, navigate, reset]);

  const taskTitle = watch("title", "");
  const taskDescription = watch("description", "");

  const titleRegister = register("title", {
    required: "Title is required",
    minLength: {
      value: 3,
      message: "Title must be at least 3 characters",
    },
    maxLength: {
      value: 30,
      message: "Title must be at most 30 characters",
    }
  });
  const deadlineRegister = register("deadline", {
    validate: {
      validDate: (value) => {
        if (deadlineInputRef.current?.validity?.badInput) {
          return "Please enter a valid date";
        }

        if (value && isNaN(Date.parse(value))) {
          return "Invalid date format";
        }

        return true;
      },
      validFutureDate: (value) => {
        if (!value) return true;

        const today = new Date();
        const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

        if (value < localToday) {
          return "Deadline must be in the present or future";
        }

        return true;
      }
    }
  });
  const descriptionRegister = register("description", {
    minLength: {
      value: 10,
      message: "Description must be at least 10 characters",
    },
    maxLength: {
      value: 300,
      message: "Description must be at most 300 characters",
    }
  });

  const handleDeadlineGroupClick = () => {
    if (deadlineInputRef.current) {
      try {
        deadlineInputRef.current.showPicker();
      } catch {
        deadlineInputRef.current.focus();
      }
    }
  };

  const triggerFieldJiggle = (fieldNames) => {
    setShakingFields((prev) => {
      const updated = { ...prev };
      fieldNames.forEach((name) => {
        updated[name] = false;
      });
      return updated;
    });

    requestAnimationFrame(() => {
      setShakingFields((prev) => {
        const updated = { ...prev };
        fieldNames.forEach((name) => {
          updated[name] = true;
        });
        return updated;
      });
    });
  };

  const handleAnimationEnd = (field) => {
    setShakingFields((prev) => ({
      ...prev,
      [field]: false
    }));
  };

  const onSubmit = (data) => {
    try {
      const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      const remainingTasks = existingTasks.filter((t) => String(t.id) !== String(taskId));
      let updatedTask = existingTasks.find((t) => String(t.id) === String(taskId));

      updatedTask = {
        ...updatedTask,
        title: data.title.trim(),
        deadline: data.deadline || null,
        description: data.description ? data.description.trim() : "",
      };

      localStorage.setItem("tasks", JSON.stringify([updatedTask, ...remainingTasks]));
      reset();
      isSubmittedRef.current = true;
      navigate("/tasks-assignments/tasks");
    } catch (error) {
      console.error("Failed to save task to localStorage:", error);
    }
  };

  const onError = (formErrors) => {
    const errorKeys = Object.keys(formErrors);
    triggerFieldJiggle(errorKeys);
  };

  return (
    <PageContent
      title="Edit Task"
      subtitle={task?.title ? `Revision In Progress: ${task.title}` : "Revision In Progress"}
      back_button={true}
    >
      {blocker.state === "blocked" && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3 className="modal__title">Unsaved Changes</h3>
            <p className="modal__message">
              You have unsaved changes. Leaving now will discard all your edits. Are you sure?
            </p>
            <div className="modal__actions">
              <button
                type="button"
                className="modal__btn modal__btn--cancel"
                onClick={() => blocker.reset()}
              >
                Keep Editing
              </button>
              <button
                type="button"
                className="modal__btn modal__btn--confirm"
                onClick={() => blocker.proceed()}
              >
                Discard & Leave
              </button>
            </div>
          </div>
        </div>
      )}
      <form
        className="task-form"
        noValidate
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className="task-form__fields">
          <div
            className={`task-form__group ${shakingFields.title ? "task-form__group--jiggle" : ""} ${errors.title ? "task-form__group--error" : ""}`}
            onAnimationEnd={() => handleAnimationEnd("title")}
          >
            <label
              htmlFor="task-title"
              className={`task-form__label ${errors.title ? "task-form__label--error" : ""}`}
            >
              Title
            </label>
            <div className="task-form__input-wrapper">

              <input
                {...titleRegister}
                type="text"
                id="task-title"
                placeholder="A grand title..."
                className={`task-form__input task-form__input--title ${errors.title ? "task-form__input--error" : ""}`}
              />
              <span
                className={`task-form__char-count ${taskTitle.length > 30 || errors.title
                  ? "task-form__char-count--error"
                  : ""
                  }`}
              >
                {taskTitle.length} / 30
              </span>
            </div>
            {errors.title && <div className="task-form__error">{errors.title.message}</div>}
          </div>

          <div
            className={`task-form__group task-form__group--deadline ${shakingFields.deadline ? "task-form__group--jiggle" : ""} ${errors.deadline ? "task-form__group--error" : ""}`}
            onClick={handleDeadlineGroupClick}
            onAnimationEnd={() => handleAnimationEnd("deadline")}
          >
            <label
              htmlFor="task-deadline"
              className={`task-form__label ${errors.deadline ? "task-form__label--error" : ""}`}
            >
              Deadline
            </label>
            <input
              {...deadlineRegister}
              ref={(e) => {
                deadlineRegister.ref(e);
                deadlineInputRef.current = e;
              }}
              type="date"
              id="task-deadline"
              className={`task-form__input task-form__input--deadline ${errors.deadline ? "task-form__input--error" : ""}`}
            />
            {errors.deadline && <div className="task-form__error">{errors.deadline.message}</div>}
          </div>

          <div
            className={`task-form__group ${shakingFields.description ? "task-form__group--jiggle" : ""} ${errors.description ? "task-form__group--error" : ""}`}
            onAnimationEnd={() => handleAnimationEnd("description")}
          >
            <label
              htmlFor="task-description"
              className={`task-form__label ${errors.description ? "task-form__label--error" : ""}`}
            >
              Description
            </label>
            <div className="task-form__input-wrapper">
              <textarea
                {...descriptionRegister}
                id="task-description"
                placeholder="Write down those juicy details..."
                className={`task-form__input task-form__input--description ${errors.description ? "task-form__input--description--error" : ""}`}
              />
              <span
                className={`task-form__char-count task-form__char-count--textarea ${(taskDescription || "").length > 300 || errors.description
                  ? "task-form__char-count--error"
                  : ""
                  }`}
              >
                {(taskDescription || "").length} / 300
              </span>
            </div>
            {errors.description && <div className="task-form__error">{errors.description.message}</div>}
          </div>
        </div>
        <div className="task-form__actions">
          <button
            type="submit"
            className="task-form__save"
          >
            <i className="fa-solid fa-floppy-disk" />
            Save Edit
          </button>
          <button
            type="reset"
            className="task-form__reset"
            onClick={() => reset()}
          >
            <i className="fa-solid fa-trash" />
            Clear Form
          </button>
        </div>
      </form>
    </PageContent>
  );
}

export default EditTask;
