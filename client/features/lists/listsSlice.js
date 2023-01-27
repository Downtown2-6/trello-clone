import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLists = createAsyncThunk(
  'fetchLists',
  async ({userId, boardId}) => {
    try {
      const {data} = await axios.get(`/api/boards/${userId}/${boardId}`);
      return data.lists;
    } catch (err) {
      next(err);
    };
  }
);

const listsSlice = createSlice({
  name: 'lists',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLists.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const selectLists = (state) => state.lists;

export default listsSlice.reducer;
