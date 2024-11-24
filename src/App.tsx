import React, { FC, useState } from "react";
import AddTask from "./AddTask.tsx";
import TaskList from "./TaskList.tsx";
import { TasksProvider } from "./TasksContext.js";

const App = () => {
  const [disableAnyAction, setDisableAnyAction] = useState(false);

  return (
    <TasksProvider>
      <div className="todoListAlignment">
        <TaskList
          disableAnyAction={disableAnyAction}
          setDisableAnyAction={setDisableAnyAction}
        />
        <AddTask disableAnyAction={disableAnyAction} />
      </div>
    </TasksProvider>
  );
};

export default App;
