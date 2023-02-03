import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "./features/auth/authSlice";
import singleBoardReducer from "./features/singleBoard/singleBoardSlice";
import allUserBoardSlice from "./features/boards/allUserBoardsSlice";
import allUserBoardsSlice from "./features/singleBoardUsers/singleBoardUsersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    singleBoard: singleBoardReducer,
    userBoards: allUserBoardSlice,
    singleBoardUsers: allUserBoardsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
