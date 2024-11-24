import { createContext, useContext, useReducer, useState } from "react";
import { isEmpty } from "lodash";

const TasksContext = createContext(null);

const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added": {
      let tasksAfterNewItemAddition;
      if (!isEmpty(tasks)) {
        tasksAfterNewItemAddition = [
          ...tasks,
          {
            id: action.id,
            text: action.text,
            completed: false,
          },
        ];
      } else {
        tasksAfterNewItemAddition = [
          {
            id: action.id,
            text: action.text,
            completed: false,
          },
        ];
      }

      localStorage.setItem(
        "todoItems",
        JSON.stringify(tasksAfterNewItemAddition)
      );
      return tasksAfterNewItemAddition;
    }
    case "changed": {
      const changedTasks = tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });

      localStorage.setItem("todoItems", JSON.stringify(changedTasks));
      return changedTasks;
    }
    case "showAll": {
      return JSON.parse(localStorage.getItem("todoItems"));
    }
    case "showCompletedTasks": {
      const currentTasks = JSON.parse(localStorage.getItem("todoItems"));
      return currentTasks.filter((t) => t.completed === true);
    }
    case "showInCompletedTasks": {
      const currentTasks = JSON.parse(localStorage.getItem("todoItems"));
      return currentTasks.filter((t) => t.completed === false);
    }
    case "deleted": {
      const deletedTasks = tasks.filter((t) => t.id !== action.id);
      localStorage.setItem("todoItems", JSON.stringify(deletedTasks));
      return deletedTasks;
    }
    case "searchText": {
      const currentTasks = JSON.parse(localStorage.getItem("todoItems"));

      return currentTasks.filter(
        (todoItem) => todoItem.text === action.textToSearch
      );
    }
  }
}

const initialTasks = JSON.parse(localStorage.getItem("todoItems"));
