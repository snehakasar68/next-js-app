"use client";

import { useState, ChangeEvent, KeyboardEvent } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "@/slices/tasksSlice";



const ViewTask = ({ selectedTask, setSelectedTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState<string>(selectedTask?.name || "");
  const dispatch = useDispatch();

  const handleDoubleClick = () => setIsEditing(true);

  const handleBlur = () => {
    setIsEditing(false);
    if (selectedTask && value !== selectedTask.name) {
      dispatch(updateTask({ ...selectedTask, name: value }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") e.currentTarget.blur();
    if (e.key === "Escape") {
      setValue(selectedTask?.name || "");
      setIsEditing(false);
    }
  };

  if (!selectedTask) return null; 

  return (
    <div
      style={{ padding: 16, borderRadius: 8, background: "#FFF" }}
      className="absolute top-[64px] left-[240px] w-[calc(100%-240px)] h-[calc(100%-64px)]"
    >
      <div className="flex justify-between items-center">
        <h1 className="font-bold">Task Details</h1>
        <span
          onClick={() => setSelectedTask(null)}
          style={{
            padding: "6px 12px",
            cursor: "pointer",
            border: "none",
            borderRadius: 4,
            color: "#000",
          }}
        >
          X
        </span>
      </div>

      <p>
        <span className="w-[25%] inline-block font-bold mb-[10px]">ID:</span>{" "}
        {selectedTask.id}
      </p>

      <p>
        <span className="w-[25%] inline-block font-bold mb-[10px]">Name:</span>{" "}
        {isEditing ? (
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="border border-gray-300 px-2 py-1 rounded w-[70%] focus-visible:outline-none"
          />
        ) : (
          <span onDoubleClick={handleDoubleClick}>{value}</span>
        )}
      </p>

      <p>
        <span className="w-[25%] inline-block font-bold mb-[10px]">Project:</span>{" "}
        {selectedTask.project}
      </p>

      <p>
        <span className="w-[25%] inline-block font-bold mb-[10px]">Owner:</span>{" "}
        {selectedTask.owner}
      </p>

      {selectedTask.subtasks && selectedTask.subtasks.length > 0 && (
        <>
          <p className="mt-[20px]">
            <strong>Subtasks:</strong>
          </p>
          <ul>
            {selectedTask.subtasks.map((st) => (
              <li key={st.id || st.name}>
                {st.name} — {selectedTask.project} — {selectedTask.owner}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ViewTask;
