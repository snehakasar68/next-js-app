"use client";

import React, { useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "@/slices/tasksSlice";
import tasksJson from "@/data/tasks.json";

// Define the Task type
interface Task {
  id?: string;
  name: string;
  project: string;
  owner: string;
  subtasks: string[];
}

// Props type
interface AddTaskProps {
  onClose: () => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state:any) => state.tasks.tasks);

  const [task, setTask] = useState<Task>({
    name: "",
    project: "",
    owner: "",
    subtasks: [],
  });

  const generateId = (): string => {
    const ids = tasksJson.map((task) => {
      const match = task.id.match(/MS1-T(\d+)$/);
      return match ? parseInt(match[1], 10) : 0;
    });
    const maxId = ids.length ? Math.max(...ids) : 0;
    return `MS1-T${maxId + 1}`;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = () => {
    if (!task.name) {
      alert("Task name is required");
      return;
    }

    const newTask: Task = { ...task, id: generateId() };
    dispatch(addTask(newTask));
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        width: 300,
        height: "100%",
        background: "#fff",
        padding: 20,
        boxShadow: "-2px 0 5px rgba(0,0,0,0.3)",
        zIndex: 9999,
      }}
    >
      <h3 className="font-bold mb-[20px]">New Task</h3>

      <div style={{ marginBottom: 10 }}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={task.name}
          onChange={handleChange}
          className="border-2 border-solid w-[100%] rounded-[5px]"
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Project:</label>
        <input
          type="text"
          name="project"
          value={task.project}
          onChange={handleChange}
          className="border-2 border-solid w-[100%] rounded-[5px]"
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Owner:</label>
        <input
          type="text"
          name="owner"
          value={task.owner}
          onChange={handleChange}
          className="border-2 border-solid w-[100%] rounded-[5px] mb-[20px]"
        />
      </div>

      <button
        onClick={handleAddTask}
        style={{
          padding: "6px 12px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          marginRight: 10,
        }}
      >
        Add
      </button>
      <button
        onClick={onClose}
        style={{
          padding: "6px 12px",
          background: "#ccc",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default AddTask;
