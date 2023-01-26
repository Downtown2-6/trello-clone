/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTaskCards = createAsyncThunk(
  'fetchTaskCards',
  async ({listId}) => {
    try{
      const { data } = await axios.get(`/api/tasks/${listId}`)
      return data
    }catch (err){
      console.log(err)
    }
  }
)

const taskCardsSlice = createSlice({
  name: 'taskCards',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTaskCards.fulfilled, (state, action) => {
      return action.payload
    })
  }

})

export const selectTaskCards = (state) => state.taskCards

export default taskCardsSlice.reducer

