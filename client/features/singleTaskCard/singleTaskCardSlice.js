import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateTaskCardTitle = createAsyncThunk(
  'updateTaskCardTitle',
  async ({boardId, taskCardId, title}) => {
    try {
      const { data } = await axios.put(`/api/tasks/${boardId}/${taskCardId}`, {
        title,
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

const singleTaskCardSlice = createSlice({
  name: 'singleTaskCard',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateTaskCardTitle.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const selectSingleTaskCard = (state) => state.singleTaskCard;

export default singleTaskCardSlice.reducer;