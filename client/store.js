import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from './features/auth/authSlice';
import singleBoardSlice from './features/board/singleBoardSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    board: singleBoardSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
