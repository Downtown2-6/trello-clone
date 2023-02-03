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

export const addList = createAsyncThunk(
  'addList',
  async (listValues) => {
    try {
      const {data} = await axios.post(`/api/lists/${listValues.boardId}`, listValues);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const addTaskCard = createAsyncThunk(
  'addTaskCard',
  async (taskCardValues) => {
    try {
      const { data } = await axios.post(`/api/tasks/${taskCardValues.boardId}`, taskCardValues);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateTaskCard = createAsyncThunk(
  'updateTaskCardTitle',
  async ({boardId, taskCardId, description, title}) => {
    try {
      const { data } = await axios.put(`/api/tasks/${boardId}/${taskCardId}`, {
        description,
        title
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateTaskCard = createAsyncThunk(
  'updateTaskCard',
  async ({boardId, taskCard}) => {
    try {
      const { data } = await axios.put(`/api/tasks/${boardId}/${taskCard.id}`, {
        ...taskCard,
      });
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

    builder.addCase(addList.fulfilled, (state, action) => {
      state.lists.push(action.payload);
    })

    builder.addCase(addTaskCard.fulfilled, (state, action) => {
      const listIdx = state.lists.findIndex((list) => list.id === action.payload.listId);
      state.lists[listIdx].taskcards.push(action.payload);
    });

    builder.addCase(updateTaskCard.fulfilled, (state, action) => {
      const listIdx = state.lists.findIndex((list) => list.id === action.payload.listId);
      const taskcardIdx = state.lists[listIdx].taskcards.findIndex((taskcard) => taskcard.id === action.payload.id);
      state.lists[listIdx].taskcards[taskcardIdx] = action.payload;
    });

    builder.addCase(updateTaskCard.fulfilled, (state, action) => {
      const listIdx = state.lists.findIndex((list) => list.id === action.payload.listId);
      const taskcardIdx = state.lists[listIdx].taskcards.findIndex((taskcard) => taskcard.id === action.payload.id);
      state.lists[listIdx].taskcards[taskcardIdx] = action.payload;
      // state.lists[listIdx].taskcards = state.lists[listIdx].taskcards.sort((a, b) => {
      //   // a = state.lists[listIdx].taskcards[a]
      //   // b = state.lists[listIdx].taskcards[b]
      //   if(state.lists[listIdx].taskcards[a] > state.lists[listIdx].taskcards[b]){
      //     return state.lists[listIdx].taskcards[b]
      //   } else {
      //     return state.lists[listIdx].taskcards[a]
      //   }
      // let newArray =[]
      // for (let i = 0; i < state.lists[listIdx].taskcards.length; i++){
      //   if(state.lists[listIdx].taskcards[i].position === i){
      //     newArray.push(state.lists[listIdx].taskcards[i])
      //   }
      // }
      // state.lists[listIdx].taskcards = newArray
      // console.log(newArray)
    });
  }
});

export const selectSingleBoard = (state) => state.singleBoard;

export default singleBoardSlice.reducer;
