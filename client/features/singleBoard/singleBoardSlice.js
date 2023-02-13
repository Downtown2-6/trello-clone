import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleBoard = createAsyncThunk(
  "fetchSingleBoard",
  async ({ userId, boardId }) => {
    try {
      const { data } = await axios.get(`/api/boards/${userId}/${boardId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addList = createAsyncThunk("addList", async (listValues) => {
  try {
    const { data } = await axios.post(
      `/api/lists/${listValues.boardId}`,
      listValues
    );
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const addListSocket = createAsyncThunk(
  'addListSocket',
  async (newList) => {
    try {
      return newList;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteThisList = createAsyncThunk(
  "deleteThisList",
  async ({ listId, userId, boardId }) => {
    try {
      const { data } = await axios.delete(
        `/api/lists/${boardId}/${listId}`
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteListSocket = createAsyncThunk(
  "deleteListSocket",
  async (deletedList) => {
    try {
      return deletedList;
    } catch (err) {
      console.log(err);
    };
  }
);

export const addTaskCard = createAsyncThunk(
  "addTaskCard",
  async (taskCardValues) => {
    try {
      const { data } = await axios.post(
        `/api/tasks/${taskCardValues.boardId}`,
        taskCardValues
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const addTaskCardSocket = createAsyncThunk(
  'addTaskCardSocket',
  async (newTaskCard) => {
    try {
      return newTaskCard;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateTaskCard = createAsyncThunk(
  "updateTaskCard",
  async ({ boardId, taskCardId, description, title, start }) => {
    try {
      const { data } = await axios.put(`/api/tasks/${boardId}/${taskCardId}`, {
        description,
        title,
        start,
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateTaskCardSocket = createAsyncThunk(
  "updateTaskCardSocket",
  async (updatedTaskCard) => {
    try {
      return updatedTaskCard;
    } catch (err) {
      console.log(err);
    };
  }
);

export const deleteThisTaskCard = createAsyncThunk(
  "deleteThisTaskCard",
  async ({ taskCardId, userId, boardId }) => {
    const { data } = await axios.delete(
      `/api/tasks/thisTask/${taskCardId}/thisUser/${userId}/thisBoard/${boardId}`
    );
    return data;
  }
);

export const deleteTaskCardSocket = createAsyncThunk(
  "deleteTaskCardSocket",
  async (deletedTaskCard) => {
    try {
      return deletedTaskCard;
    } catch (err) {
      next(err);
    };
  }
);

export const updateTaskCardPosition = createAsyncThunk(
  "updateTaskCardPosition",
  async ({ boardId, taskCard }) => {
    try {
      const { data } = await axios.put(
        `/api/tasks/${boardId}/${taskCard.id}`,
        taskCard
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const persistList = createAsyncThunk(
  "persistList",
  ({ listId, taskcards }) => {
    return { listId, taskcards };
  }
);

export const persistLists = createAsyncThunk(
  "persistLists",
  ({
    sourceListId,
    sourceListTaskCards,
    destinationListId,
    destinationListTaskCards,
  }) => {
    return {
      sourceListId,
      sourceListTaskCards,
      destinationListId,
      destinationListTaskCards,
    };
  }
);

export const addComment = createAsyncThunk(
  "addComment",
  async ({ content, taskcardId, userId }) => {
    try {
      const { data } = await axios.post(`/api/comments`, {
        content,
        taskcardId,
        userId,
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const addCommentSocket = createAsyncThunk(
  "addCommentSocket",
  async (comments) => {
    try {
      return comments;
    } catch (err) {
      console.log(err);
    };
  }
);

export const deleteComment = createAsyncThunk(
  'deleteComment',
  async (commentId) => {
    try {
      const { data } = await axios.delete(`/api/comments/${commentId}`);
      console.log("This is data in the deleteComment thunk", data)
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteCommentSocket = createAsyncThunk(
  'deleteCommentSocket',
  async (deletedComment) => {
    try {
      return deletedComment;
    } catch (err) {
      console.log(err);
    };
  }
);

export const updateListPosition = createAsyncThunk(
  "updateListPosition",
  async ({ boardId, list }) => {
    try {
      const { data } = await axios.put(
        `/api/lists/${boardId}/${list.id}`,
        list
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const reorderLists = createAsyncThunk(
  "reorderLists",
  ({ list, otherList }) => {
    return { list, otherList };
  }
);

const singleBoardSlice = createSlice({
  name: "singleBoard",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleBoard.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(addList.fulfilled, (state, action) => {
      state.lists.push(action.payload);
    });

    builder.addCase(addListSocket.fulfilled, (state, action) => {
      state.lists.push(action.payload);
    });

    builder.addCase(addTaskCard.fulfilled, (state, action) => {
      const listIdx = state.lists.findIndex(
        (list) => list.id === action.payload.listId
      );
      state.lists[listIdx].taskcards.push(action.payload);
    });

    builder.addCase(addTaskCardSocket.fulfilled, (state, action) => {
      const listIdx = state.lists.findIndex(
        (list) => list.id === action.payload.listId
      );
      state.lists[listIdx].taskcards.push(action.payload);
    });

    builder.addCase(updateTaskCard.fulfilled, (state, action) => {
      const listIdx = state.lists.findIndex(
        (list) => list.id === action.payload.listId
      );
      const taskcardIdx = state.lists[listIdx].taskcards.findIndex(
        (taskcard) => taskcard.id === action.payload.id
      );
      state.lists[listIdx].taskcards[taskcardIdx] = action.payload;
    });

    builder.addCase(updateTaskCardSocket.fulfilled, (state, action) => {
      const listIdx = state.lists.findIndex(
        (list) => list.id === action.payload.listId
      );
      const taskcardIdx = state.lists[listIdx].taskcards.findIndex(
        (taskcard) => taskcard.id === action.payload.id
      );
      state.lists[listIdx].taskcards[taskcardIdx] = action.payload;
    });

    builder.addCase(persistList.fulfilled, (state, action) => {
      const listIdx = state.lists.findIndex(
        (list) => list.id === action.payload.listId
      );
      state.lists[listIdx].taskcards = action.payload.taskcards;
    });

    builder.addCase(persistLists.fulfilled, (state, action) => {
      const sourceListIdx = state.lists.findIndex(
        (list) => list.id === action.payload.sourceListId
      );
      const destinationListIdx = state.lists.findIndex(
        (list) => list.id === action.payload.destinationListId
      );
      state.lists[sourceListIdx].taskcards = action.payload.sourceListTaskCards;
      state.lists[destinationListIdx].taskcards =
        action.payload.destinationListTaskCards;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      const listIdx = state.lists.findIndex(
        (list) => list.id === action.payload.listId
      );
      const taskcardIdx = state.lists[listIdx].taskcards.findIndex(
        (taskcard) => taskcard.id === action.payload.id
      );
      state.lists[listIdx].taskcards[taskcardIdx].comments =
        action.payload.comments;
    });

    builder.addCase(addCommentSocket.fulfilled, (state, action) => {
      const listIdx = state.lists.findIndex(
        (list) => list.id === action.payload.listId
      );
      const taskcardIdx = state.lists[listIdx].taskcards.findIndex(
        (taskcard) => taskcard.id === action.payload.id
      );
      state.lists[listIdx].taskcards[taskcardIdx].comments =
        action.payload.comments;
    });

    builder.addCase(deleteComment.fulfilled, (state, action) => {
      const listIdx = state.lists.findIndex((list) => list.id === action.payload.taskCard.listId);
      const taskcardIdx = state.lists[listIdx].taskcards.findIndex((taskcard) => taskcard.id === action.payload.taskCard.id);
      const commentIdx = state.lists[listIdx].taskcards[taskcardIdx].comments.findIndex((comment) => comment.id === action.payload.theCommentBeingDestroyed.id);
      state.lists[listIdx].taskcards[taskcardIdx].comments = action.payload.taskCard.comments;
    });

    builder.addCase(deleteCommentSocket.fulfilled, (state, action) => {
      const listIdx = state.lists.findIndex((list) => list.id === action.payload.taskCard.listId);
      const taskcardIdx = state.lists[listIdx].taskcards.findIndex((taskcard) => taskcard.id === action.payload.taskCard.id);
      const commentIdx = state.lists[listIdx].taskcards[taskcardIdx].comments.findIndex((comment) => comment.id === action.payload.theCommentBeingDestroyed.id);
      state.lists[listIdx].taskcards[taskcardIdx].comments = action.payload.taskCard.comments;
    });

    builder.addCase(reorderLists.fulfilled, (state, action) => {
      const listIdx = state.lists.findIndex((list) => list.id === action.payload.list.id);
      const otherListIdx = state.lists.findIndex((list) => list.id === action.payload.otherList.id);
      state.lists[listIdx] = action.payload.otherList;
      state.lists[otherListIdx] = action.payload.list;
    });

    builder.addCase(deleteThisTaskCard.fulfilled, (state, action) => {
      const listIdx = state.lists.findIndex(
        (list) => list.id === action.payload.listId
      );

      state.lists[listIdx].taskcards = state.lists[listIdx].taskcards.filter(
        (taskcard) => taskcard.id !== action.payload.id
      );
    });

    builder.addCase(deleteTaskCardSocket.fulfilled, (state, action) => {
      const listIdx = state.lists.findIndex(
        (list) => list.id === action.payload.listId
      );

      state.lists[listIdx].taskcards = state.lists[listIdx].taskcards.filter(
        (taskcard) => taskcard.id !== action.payload.id
      );
    });

    builder.addCase(deleteThisList.fulfilled, (state, action) => {
      state.lists = state.lists.filter((list) => list.id !== action.payload.id);
    });

    builder.addCase(deleteListSocket.fulfilled, (state, action) => {
      state.lists = state.lists.filter((list) => list.id !== action.payload.id);
    });
  },
});

export const selectSingleBoard = (state) => state.singleBoard;

export default singleBoardSlice.reducer;
