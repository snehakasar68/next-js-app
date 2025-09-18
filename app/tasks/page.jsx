"use client";
import AddTask from "@/app/tasks/addTask/page";
import React, { useState } from "react";
import TaskLists from "./taskLists"
export default function TaskBoard() {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div >
        <div className="flex justify-end">
      <button
        onClick={() => setShowAdd(true)}
        style={{ marginBottom: 10, padding: "6px 12px", cursor: "pointer",background:"#007bff",color:"#fff",borderRadius:"5px" }}
      >
        Add Task
      </button>
      </div>

      <TaskLists />

      {showAdd && <AddTask onClose={() => setShowAdd(false)} />}
    </div>
  );
}