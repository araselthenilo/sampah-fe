import { useState, useRef } from "react";
import "../css/CreateTask.css";
import PageContent from "../components/PageContent";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function CreateTask() {
  const navigate = useNavigate();
  const [shakingFields, setShakingFields] = useState({});
  const deadlineInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    mode: "onChange"
  });

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
      const newTask = {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        title: data.title.trim(),
        deadline: data.deadline || null,
        description: data.description ? data.description.trim() : "",
        createdAt: new Date().toISOString()
      };

      localStorage.setItem("tasks", JSON.stringify([...existingTasks, newTask]));
      reset();
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
      title="Create Task"
      subtitle="Add a new task to the list"
      back_button={true}
    >
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
          <button type="submit" className="task-form__submit">
            <i className="fa-solid fa-plus" />
            Create Task
          </button>
          <button type="reset" className="task-form__reset" onClick={() => reset()}>
            <i className="fa-solid fa-trash" />
            Clear Form
          </button>
        </div>
      </form>
    </PageContent>
  );
}

export default CreateTask;
