import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLists = createAsyncThunk(
  'fetchLists',
  async (id) => {
    const response = await axios.get(`/api/boards/:boardId`)
    console.log(response.data)
    return response.data
  }
)

const listsSlice = createSlice({
  name: 'board',
  initialState: {
    lists: [],
  },
  reducers: {},
  extraReducers: {
    [fetchBoard.fulfilled]: (state, action) => {
      const board = action.payload
      state.board = board
    },
  }
})

export default listsSlice.reducer