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
  'updateTaskCard',
  async ({boardId, taskCardId, description, title, start}) => {
    try {
      const { data } = await axios.put(`/api/tasks/${boardId}/${taskCardId}`, {
        description,
        title,
        start
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateTaskCardPosition = createAsyncThunk(
  'updateTaskCardPosition',
  async ({boardId, taskCard}) => {
    try {
      const { data } = await axios.put(`/api/tasks/${boardId}/${taskCard.id}`, taskCard);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const persistList = createAsyncThunk(
  'persistList', ({listId, taskcards}) => {
    return {listId, taskcards};
  }
);

export const persistLists = createAsyncThunk(
  'persistLists', ({
    sourceListId,
    sourceListTaskCards,
    destinationListId,
    destinationListTaskCards}) => {
    return {sourceListId, sourceListTaskCards, destinationListId, destinationListTaskCards};
  }
);

export const addComment = createAsyncThunk(
  'addComment',
  async ({content, taskcardId, userId}) => {
    try {
      const { data } = await axios.post(`/api/comments`, {
        content,
        taskcardId,
        userId
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
)

export const updateListPosition = createAsyncThunk(
  'updateListPosition',
  async ({boardId, list}) => {
    try {
      const { data } = await axios.put(`/api/lists/${boardId}/${list.id}`, list)
      return data
    } catch (err){
      console.log(err)
    }
  }
)

export const reorderLists = createAsyncThunk(
  'reorderLists', ({
    list,
    otherList
  }) => {
    return {list, otherList};
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

    builder.addCase(addList.fulfilled, (state, action) => {
      state.lists.push(action.payload);
    });

    builder.addCase(addTaskCard.fulfilled, (state, action) => {
      const listIdx = state.lists.findIndex((list) => list.id === action.payload.listId);
      state.lists[listIdx].taskcards.push(action.payload);
    });

    builder.addCase(updateTaskCard.fulfilled, (state, action) => {
      const listIdx = state.lists.findIndex((list) => list.id === action.payload.listId);
      const taskcardIdx = state.lists[listIdx].taskcards.findIndex((taskcard) => taskcard.id === action.payload.id);
      state.lists[listIdx].taskcards[taskcardIdx] = action.payload;
    });

    builder.addCase(persistList.fulfilled, (state, action) => {
      const listIdx = state.lists.findIndex((list) => list.id === action.payload.listId);
      state.lists[listIdx].taskcards = action.payload.taskcards;
    });

    builder.addCase(persistLists.fulfilled, (state, action) => {
      const sourceListIdx = state.lists.findIndex((list) => list.id === action.payload.sourceListId);
      const destinationListIdx = state.lists.findIndex((list) => list.id === action.payload.destinationListId);
      state.lists[sourceListIdx].taskcards = action.payload.sourceListTaskCards;
      state.lists[destinationListIdx].taskcards = action.payload.destinationListTaskCards;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      const listIdx = state.lists.findIndex((list) => list.id === action.payload.listId);
      const taskcardIdx = state.lists[listIdx].taskcards.findIndex((taskcard) => taskcard.id === action.payload.id);
      state.lists[listIdx].taskcards[taskcardIdx].comments = action.payload.comments;
    });

    builder.addCase(reorderLists.fulfilled, (state, action) => {
      state.lists[action.payload.list.position] = action.payload.list;
      state.lists[action.payload.otherList.position] = action.payload.otherList;
    });
  }
});

export const selectSingleBoard = (state) => state.singleBoard;

export default singleBoardSlice.reducer;
