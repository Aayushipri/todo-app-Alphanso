import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { useTasks, useTasksDispatch } from "./TasksContext.js";
import { cx } from "@emotion/css";

interface TaskListProps {
  disableAnyAction: boolean | undefined;
  setDisableAnyAction: Function;
}

interface TaskValue {
  id: string;
  completed: boolean;
  text: string;
}

interface TaskProps {
  task: TaskValue;
  disableAnyAction: boolean | undefined;
  currentFilterSelected: string;
}

export default function TaskList({
  disableAnyAction,
  setDisableAnyAction,
}: TaskListProps) {
  const tasks = useTasks();
  const dispatch = useTasksDispatch();
  const [searchTask, setSearchTask] = useState("");
  const [currentFilterSelected, setCurrentFilterSelected] = useState("All");

  useEffect(() => {
    let timerId;
    if (!isEmpty(searchTask)) {
      timerId = setTimeout(() => {
        dispatch({
          type: "searchText",
          textToSearch: searchTask,
        });
        setDisableAnyAction(true);
      }, 7000);

      console.log("timerId", timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTask]);

  return (
    <React.Fragment>
      <div className="searchOperationsStyle">
        <span className="todayStyle">Today</span>
        <input
          className="searchBoxStyle"
          value={searchTask}
          onChange={(e) => setSearchTask(e.target.value)}
          placeholder="  Search task"
        />
        <div className="buttonDisplay">
          <button
            className={cx("filterButtonStyle", {
              ["filterButtonClicked"]: currentFilterSelected === "All",
            })}
            onClick={() => {
              setDisableAnyAction(false);
              dispatch({
                type: "showAll",
              });
              setCurrentFilterSelected("All");
            }}
          >
            All
          </button>
          <button
            className={cx("filterButtonStyle", {
              ["filterButtonClicked"]: currentFilterSelected === "Completed",
            })}
            onClick={() => {
              setDisableAnyAction(true);
              dispatch({
                type: "showCompletedTasks",
              });
              setCurrentFilterSelected("Completed");
            }}
          >
            Completed
          </button>
          <button
            className={cx("filterButtonStyle", {
              ["filterButtonClicked"]: currentFilterSelected === "Incomplete",
            })}
            onClick={() => {
              setDisableAnyAction(true);
              dispatch({
                type: "showInCompletedTasks",
              });
              setCurrentFilterSelected("Incomplete");
            }}
          >
            Incomplete
          </button>
        </div>
      </div>

      <div className="taskStyle">
        {tasks?.map((task: TaskValue) => (
          <div
            key={task.id}
            className={cx("boxStyle", "todoItemsStyle", {
              ["todoItemCompleted"]: task.completed === true,
            })}
          >
            <Task
              task={task}
              disableAnyAction={disableAnyAction}
              currentFilterSelected={currentFilterSelected}
            />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

// interface TaskProps {
//   disableAnyAction: boolean | undefined;
//   currentFilterSelected: String;
//   task: {
//     id: String;
//     completed: boolean | undefined;
//     text: String;
//   };
// }

function Task({ task, disableAnyAction, currentFilterSelected }: TaskProps) {
  const dispatch = useTasksDispatch();

  return (
    <label className="labelStyle">
      {currentFilterSelected === "All" && (
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => {
            dispatch({
              type: "changed",
              task: {
                ...task,
                completed: !task.completed,
              },
            });
          }}
          disabled={disableAnyAction}
        />
      )}
      {task.text}
      {currentFilterSelected === "All" && (
        <div className="deleteButtonStyle">
          <button
            onClick={() => {
              dispatch({
                type: "deleted",
                id: task.id,
              });
            }}
            disabled={disableAnyAction}
          >
            Delete
          </button>
        </div>
      )}
    </label>
  );
}
