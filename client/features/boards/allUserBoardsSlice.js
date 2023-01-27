import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUserBoards = createAsyncThunk(
  "userBoard/fetch",
  async () => {
    console.log("fetchAllUserBoards");
    const response = await axios.get(`/api/boards/user`);
    console.log(response.data);
    return response.data;
  }
);

export const createUserBoard = createAsyncThunk(
  "userBoard/add",
  async (parameter) => {
    console.log("this is userboard in the add thunk", parameter);
    const { data } = await axios.post(
      "http://localhost:3000/api/boards",
      parameter
    );
    return data;
  }
);

export const allUserBoardsSlice = createSlice({
  name: "userBoards",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUserBoards.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(createUserBoard.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectUserBoards = (state) => state.userBoards;

export default allUserBoardsSlice.reducer;
