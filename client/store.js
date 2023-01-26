import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from './features/auth/authSlice';
import singleBoardSlice from './features/board/singleBoardSlice';
import allUserBoardSlice from './features/boards/allUserBoardsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    board: singleBoardSlice,
    userBoards: allUserBoardSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
