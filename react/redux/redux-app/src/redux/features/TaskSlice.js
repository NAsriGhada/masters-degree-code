import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [];

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (description) => ({
        payload: {
          id: nanoid(),
          description,
          isDone: false,
        },
      }),
    },
    toggleTask: (state, action) => {
      const task = state.find((t) => t.id === action.payload);
      if (task) task.isDone = !task.isDone;
    },
    editTask: (state, action) => {
      const { id, description } = action.payload;
      const task = state.find((t) => t.id === id);
      if (task) task.description = description;
    },
  },
});

export const { addTask, toggleTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;
