import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLists = createAsyncThunk(
  'fetchLists',
  async ({boardId}) => {
    try {
      const {data} = await axios.get(`/api/lists/${boardId}`);
      return data;
    } catch (err) {
      next(err);
    };
  }
);

export const addList = createAsyncThunk(
  'addList',
  async ({boardId, listName, position}) => {
    try {
      const {data} = await axios.post(`/api/lists/${boardId}`, {
        listName,
        position,
        boardId
      });
      return data;
    } catch (err) {
      next(err);
    }
  }
)

const listsSlice = createSlice({
  name: 'lists',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLists.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(addList.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  }
});

export const selectLists = (state) => state.lists;

export default listsSlice.reducer;
