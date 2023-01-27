/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTaskCards = createAsyncThunk(
  'fetchTaskCards',
  async ({listId}) => {
    try{
      const { data } = await axios.get(`/api/tasks/${listId}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
)

export const addTaskCard = createAsyncThunk(
  'addTaskCard',
  async ({listId, taskcardName, position}) => {
    try {
      const { data } = await axios.post(`/api/tasks/${listId}`, {
        taskcardName,
        position,
        listId
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

const taskCardsSlice = createSlice({
  name: 'taskCards',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTaskCards.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(addTaskCard.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  }
})

export const selectTaskCards = (state) => state.taskCards

export default taskCardsSlice.reducer

