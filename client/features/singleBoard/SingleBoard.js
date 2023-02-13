import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  fetchSingleBoard, 
  selectSingleBoard, 
  addList, 
  updateTaskCardPosition, 
  persistList, 
  persistLists, 
  updateListPosition, 
  reorderLists, 
  addListSocket,
  deleteListSocket,
  updateTaskCardSocket,
  addCommentSocket,
  deleteTaskCardSocket,
  deleteCommentSocket } from "./singleBoardSlice";
import SingleList from "../singleList/SingleList";
import { DragDropContext } from "react-beautiful-dnd";
import SingleBoardUsers from "../singleBoardUsers/singleBoardUsers";
import io from "socket.io-client";
import {
  Modal,
  Box,
  TextField,
  Typography,
  Input,
  Dialog,
  IconButton,
  Button,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const socket = io();

const SingleBoard = () => {
  const [listName, setListName] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id);
  const { boardId } = useParams();
  const board = useSelector(selectSingleBoard);

  useEffect(() => {
    dispatch(fetchSingleBoard({ userId, boardId }));

    socket.off("add-list").on("add-list", (newList) => {
      dispatch(addListSocket(newList));
    });

    socket.off("move-list").on("move-list", ({ newList, newOtherList }) => {
      dispatch(
        reorderLists({
          list: newList,
          otherList: newOtherList,
        })
      );
    });

    socket.off('delete-list').on('delete-list', (deletedList) => {
      dispatch(deleteListSocket(deletedList));
    });

    socket.off('drop-taskCard-sameList').on('drop-taskCard-sameList', ({taskcards, listId}) => {
      dispatch(persistList({
        listId,
        taskcards,
      }));
    });

    socket.off('drop-taskCard-differentList').on('drop-taskCard-differentList', ({ 
      sourceListId, 
      sourceListTaskCards, 
      destinationListId, 
      destinationListTaskCards }) => {
      dispatch(persistLists({
        sourceListId,
        sourceListTaskCards,
        destinationListId,
        destinationListTaskCards,
      }));
    });

    socket.off('update-taskCard').on('update-taskCard', (updatedTaskCard) => {
      dispatch(updateTaskCardSocket(updatedTaskCard));
    });

    socket.off('delete-taskCard').on('delete-taskCard', (deletedTaskCard) => {
      dispatch(deleteTaskCardSocket(deletedTaskCard));
    });

    socket.off('add-comment').on('add-comment', (comments) => {
      dispatch(addCommentSocket(comments));
    });

    socket.off('delete-comment').on('delete-comment', (deletedComment) => {
      dispatch(deleteCommentSocket(deletedComment));
    });
  }, [dispatch]);

  const handleSubmitList = async (evt) => {
    evt.preventDefault();
    const position = board.lists.length ? board.lists.length : 0;
    if (listName.length) {
      const newList = await dispatch(
        addList({
          boardId: board.id,
          listName,
          position,
        })
      );
      socket.emit("add-list", newList.payload);
      setListName("");
    }
  };

  const moveList = async (btnValue, list) => {
    const newPosition =
      btnValue === "moveRight" ? list.position + 1 : list.position - 1;
    const otherList = board.lists.find((list) => list.position === newPosition);
    const newOtherList = { ...otherList, position: list.position };
    const newList = { ...list, position: newPosition };

    await dispatch(
      updateListPosition({
        boardId,
        list: {
          id: list.id,
          position: newPosition,
        },
      })
    );

    await dispatch(
      updateListPosition({
        boardId,
        list: {
          id: otherList.id,
          position: list.position,
        },
      })
    );

    await dispatch(
      reorderLists({
        list: newList,
        otherList: newOtherList,
      })
    );

    socket.emit("move-list", newList, newOtherList);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    const { index: sourceIndex } = source;
    const { index: destinationIndex } = destination;

    //if no destination in result object return
    if (!destination) return;

    //if destination is same as source && index is the same, return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //reorder taskIds for the column
    const sourceList = board.lists.find(
      (list) => list.id === parseInt(source.droppableId, 10)
    );

    //if the taskcard is grabbed and then dropped within the same list this logic fires
    if (source.droppableId === destination.droppableId) {
      const sourceListTasks = Array.from(sourceList.taskcards);
      const taskToMove = sourceListTasks.find(
        (task) => task.id === parseInt(draggableId, 10)
      );
      sourceListTasks.splice(sourceIndex, 1);
      sourceListTasks.splice(destinationIndex, 0, taskToMove);

      const sourceListTasksUpdated = sourceListTasks.map((task, index) => ({
        ...task,
        position: index,
      }));

      const sourceListId = sourceList.id;

      socket.emit(
        "drop-taskCard-sameList",
        sourceListTasksUpdated,
        sourceListId
      );

      dispatch(
        persistList({
          listId: sourceList.id,
          taskcards: sourceListTasksUpdated,
        })
      );

      sourceListTasks.forEach(async (task, index) => {
        await dispatch(
          updateTaskCardPosition({
            boardId,
            taskCard: {
              ...task,
              position: index,
            },
          })
        );
      });

      //if the task is moved from one list to another, this logic fires
    } else {
      const destinationList = board.lists.find(
        (list) => list.id === parseInt(destination.droppableId, 10)
      );
      const sourceListTasks = Array.from(sourceList.taskcards);
      const destinationListTasks = Array.from(destinationList.taskcards);
      const taskToMove = sourceListTasks.find(
        (task) => task.id === parseInt(draggableId, 10)
      );
      sourceListTasks.splice(sourceIndex, 1);
      destinationListTasks.splice(destinationIndex, 0, taskToMove);

      const sourceListTasksUpdated = sourceListTasks.map((task, index) => ({
        ...task,
        position: index,
      }));
      const destinationListTasksUpdated = destinationListTasks.map(
        (task, index) => ({ ...task, position: index })
      );

      dispatch(
        persistLists({
          sourceListId: sourceList.id,
          sourceListTaskCards: sourceListTasksUpdated,
          destinationListId: destinationList.id,
          destinationListTaskCards: destinationListTasksUpdated,
        })
      );

      const sourceListId = sourceList.id;
      const destinationListId = destinationList.id;

      socket.emit(
        "drop-taskCard-differentList",
        sourceListId,
        sourceListTasksUpdated,
        destinationListId,
        destinationListTasksUpdated
      );

      sourceListTasks.forEach((task, index) => {
        dispatch(
          updateTaskCardPosition({
            boardId,
            taskCard: {
              ...task,
              position: index,
            },
          })
        );
      });

      destinationListTasks.forEach((task, index) => {
        dispatch(
          updateTaskCardPosition({
            boardId,
            taskCard: {
              ...task,
              position: index,
              listId: parseInt(destination.droppableId),
            },
          })
        );
      });
    }
  };

  return (
    <>
      <br />
      <SingleBoardUsers />
      <Button variant="outlined" onClick={() => navigate(`/calendar`)}>
        My Calendar
      </Button>
      {board ? (
        <Box className="board-container">
          <Box
            className="board-container-title"
            sx={{
              padding: 2,
            }}
          >
            <Typography variant="h4">{board.boardName}</Typography>
          </Box>

          <DragDropContext onDragEnd={onDragEnd}>
            <div className="board-lists-container">
              {board.lists && board.lists.length
                ? board.lists.map((list) => (
                    <div key={`list#${list.id}`} className="list-container">
                      <span>
                        {list.position > 0 ? (
                          <IconButton
                            variant="outlined"
                            onClick={() => moveList("moveLeft", list)}
                            sx={{
                              fontSize: "xs",
                            }}
                          >
                            <ArrowBackIosIcon />
                          </IconButton>
                        ) : null}
                        {list.position < board.lists.length - 1 ? (
                          <IconButton
                            variant="outlined"
                            onClick={() => moveList("moveRight", list)}
                          >
                            <ArrowForwardIosIcon />
                          </IconButton>
                        ) : null}
                      </span>
                      <SingleList boardId={board.id} list={list} />
                    </div>
                  ))
                : null}
                <Box className="list-container">
                  <Typography variant="h5">
                    <TextField
                    className="list-title"
                    placeholder="Add another list"
                    size="small"
                    // fullWidth
                    onChange={(evt) => setListName(evt.target.value)}
                    onBlur={handleSubmitList}
                  />
                  </Typography>
          </Box>
              {/* <div className="list-container">
                <form className="add-list-form" onSubmit={handleSubmitList}>
                  <input
                    className="add-list"
                    name="listName"
                    type="text"
                    value={listName}
                    onChange={(evt) => setListName(evt.target.value)}
                  />
                  <Button className="add-list-button" type="submit">
                    Add another list
                  </Button>
                </form>
              </div> */}
            </div>
          </DragDropContext>
        </Box>
      ) : null}
    </>
  );
};

export default SingleBoard;
