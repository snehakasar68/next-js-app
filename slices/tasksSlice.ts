import { createSlice } from "@reduxjs/toolkit";
import tasksJson from "../data/tasks.json";

const initialState = tasksJson;


const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("tasks_data", JSON.stringify(state));
    },
    deleteTask: (state, action) => {
      const updated = state.filter(task => task.id !== action.payload);
      localStorage.setItem("tasks_data", JSON.stringify(updated));
      return updated;
    },
     updateTask: (state, action) => {
     const updatedTask = action.payload; 
  const index = state.findIndex(task => task.id === updatedTask.id);

  if (index !== -1) {
    state[index] = updatedTask; 
  }

  localStorage.setItem("tasks_data", JSON.stringify(state));
    },
    reorderTasks: (state, action) => {
      const { oldIndex, newIndex } = action.payload;
      const item = state.splice(oldIndex, 1)[0];
      state.splice(newIndex, 0, item);
      localStorage.setItem("tasks_data", JSON.stringify(state));
    },
  
  },
});

export const { addTask,deleteTask,updateTask, reorderTasks } = tasksSlice.actions;
export default tasksSlice.reducer;