import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBoard = createAsyncThunk(
  'fetchBoard',
  async (id) => {
    const response = await axios.get(`/api/boards/`)
    console.log(response.data)
    return response.data
  }
)

const singleBoardSlice = createSlice({
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

export default singleBoardSlice.reducer
