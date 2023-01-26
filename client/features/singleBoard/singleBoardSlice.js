import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleBoard = createAsyncThunk(
  'fetchSingleBoard',
  async ({userId, boardId}) => {
    try {
      const response = await axios.get(`/api/boards/${userId}/${boardId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    };
  }
);

const singleBoardSlice = createSlice({
  name: 'singleBoard',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleBoard.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const selectSingleBoard = (state) => state.singleBoard;

export default singleBoardSlice.reducer
