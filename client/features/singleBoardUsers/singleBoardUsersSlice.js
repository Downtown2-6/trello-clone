import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUsersInBoard = createAsyncThunk(
  "boardUsers/fetch",
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

export const grantUserAccess = createAsyncThunk(
  "boardUsers/post",
  async ({ userEmail, boardId }) => {
    console.log("userEmail in grantUserAccess thunk", userEmail)

    const response = await axios.post(
      `/api/users/grantAccess/${boardId}`,
      { userEmail }
    );
    return response.data;
  }
);

export const singleBoardUsersSlice = createSlice({
  name: "boardUsers",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsersInBoard.fulfilled, (state, action) => {
        return action.payload
    });
    builder.addCase(grantUserAccess.fulfilled, (state, action) => {
      console.log("State in grantUserAccess Builder", state)
        // const userBoard = action.payload.userBoard
        // const newUser = action.payload.findUser
        // userBoard.push(newUser) 
        return action.payload
        console.log("The action.payload of grantUserAccess builder", action.payload)
    });
  },
});

export const allUsersInThisBoard = (state) => state.userBoards;

export default singleBoardUsersSlice.reducer;
