import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from './features/auth/authSlice';
import singleBoardReducer from './features/singleBoard/singleBoardSlice';
import allUserBoardSlice from './features/boards/allUserBoardsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    singleBoard: singleBoardReducer,
    userBoards: allUserBoardSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
