import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUsersInBoard = createAsyncThunk(
  "userBoard/fetch",
  async (boardId) => {
    const response = await axios.get(`/api/boards/allUsers/${boardId}`);
    console.log(
      `***
    ***
    ***
    Logging:The api response
    ***
    ***
    ***
    `,
      response.data
    );
    return response.data;
  }
);

export const fetchGrantUserAccess = createAsyncThunk(
  "userBoard/put",
  async ({ userEmail, boardId }) => {

    const response = await axios.post(
      `/api/users/grantAccess/${boardId}`,
      { userEmail }
    );
    return response.data;
  }
);

export const singleBoardUsersSlice = createSlice({
  name: "All Users In Single Board",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsersInBoard.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const allUsersInThisBoard = (state) => state.userBoards;

export default singleBoardUsersSlice.reducer;
