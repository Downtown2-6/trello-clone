import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from './features/auth/authSlice';
import singleBoardReducer from './features/singleBoard/singleBoardSlice';
import listsReducer from './features/lists/listsSlice';
import taskCardsReducer from './features/taskCards/taskCardsSlice'
import allUserBoardSlice from './features/boards/allUserBoardsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    singleBoard: singleBoardReducer,
    lists: listsReducer,
    taskCards: taskCardsReducer,
    userBoards: allUserBoardSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
