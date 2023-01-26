import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from './features/auth/authSlice';
import singleBoardReducer from './features/singleBoard/singleBoardSlice';
import listsReducer from './features/lists/listsSlice';
import taskCardsReducer from './features/taskCards/taskCardsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    singleBoard: singleBoardReducer,
    lists: listsReducer,
    taskCards: taskCardsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
