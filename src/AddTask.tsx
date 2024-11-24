import "./App.css";
import { useState } from "react";
import { useTasks, useTasksDispatch } from "./TasksContext.js";
import { isEmpty } from "lodash";
import React from "react";

type AddTaskProps = {
  disableAnyAction: boolean | undefined;
};

export default function AddTask({ disableAnyAction }: AddTaskProps) {
  const [text, setText] = useState("");
  const dispatch = useTasksDispatch();
  const tasks = useTasks();

  const addItem = () => {
    if (!isEmpty(text)) {
      setText("");
      dispatch({
        type: "added",
        id: Math.random().toString(36).slice(2, 7),
        text: text,
      });
    }
  };

  return (
    <div className="inputBoxSubmitButtonLayout">
      <input
        className="boxStyle"
        placeholder="  Type Something"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />

      <button
        onClick={addItem}
        className="addButtonStyle boxStyle"
        disabled={disableAnyAction}
      >
        Add Task
      </button>
    </div>
  );
}
