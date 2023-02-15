import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUserBoards = createAsyncThunk(
  "userBoard/fetch",
  async (userId) => {
    const response = await axios.get(`/api/users/allBoards/${userId}`);
    return response.data;
  }
);

export const createUserBoard = createAsyncThunk(
  "userBoard/add",
  async (parameter) => {
    try {
      const response = await axios.post("/api/boards", parameter);
      return response.data;
    } catch (error) {
      console.log(error);
    }
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
      // have board and inside of it is a board. So we were calling board.board. However, when we pushed this, we were just pushing board.
      // So, to fix this, we are pushing into the state {board:action.payload}
      state.push({ board: action.payload });
    });
  },
});

export const selectUserBoards = (state) => state.userBoards;

export default allUserBoardsSlice.reducer;
