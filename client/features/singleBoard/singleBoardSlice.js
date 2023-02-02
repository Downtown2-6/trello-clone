import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleBoard = createAsyncThunk(
  'fetchSingleBoard',
  async ({userId, boardId}) => {
    try {
      const {data} = await axios.get(`/api/boards/${userId}/${boardId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addTaskCard = createAsyncThunk(
  'addTaskCard',
  async ({boardId, listId, title, position}) => {
    try {
      const { data } = await axios.post(`/api/tasks/${boardId}`, {
        title,
        position,
        listId,
        boardId
      });
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

const singleBoardSlice = createSlice({
  name: 'singleBoard',
  initialState: {

  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleBoard.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addTaskCard.fulfilled, (state, action) => {
     const listIdx = state.lists.findIndex((list) => {
        //finding the index of the list that taskCard need to be added to
        return list.id == action.payload.listId
      })
      state.lists[listIdx].taskcards.push(action.payload)

    })
  }
});

export const selectSingleBoard = (state) => state.singleBoard;

export default singleBoardSlice.reducer;
