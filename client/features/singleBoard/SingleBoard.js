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
  Button
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const socket = io();

const theme = createTheme({
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
    lighter: {
      main: '#ced3db',
      contrastText: '#fff'
    }
  }
})

const SingleBoard = () => {
  const [listName, setListName] = useState("");
  const [addingList, setAddingList] = useState(false);
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

  const handleSubmitList = async () => {
    const position = board.lists.length ? board.lists[board.lists.length-1].position + 1 : 0;
    if (listName.length) {
      const newList = await dispatch(
        addList({
          boardId: board.id,
          listName,
          position,
        })
      );
      socket.emit("add-list", newList.payload);
      setAddingList(false);
      setListName("");
    }
  };

  const cancelAddList = () => {
    setAddingList(false);
    setListName("");
  };

  const moveList = async (btnValue, list) => {
    const listIdx = board.lists.findIndex((boardlist) => boardlist.id === list.id);
    const newPosition =
      btnValue === "moveRight" ? Number(list.position + 1) : Number(list.position - 1);
    const otherList = 
      btnValue === "moveRight" ? board.lists[listIdx+1] : board.lists[listIdx-1];
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
      <ThemeProvider theme={theme}>
        <SingleBoardUsers />
        <Button 
        color='neutral' 
        variant="contained" 
        style={{ marginLeft: '0.25em'}}
        onClick={() => navigate(`/calendar`)}
        >
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
              <Box className="board-lists-container">
                {board.lists && board.lists.length
                ? board.lists.map((list) => (
                  <Box 
                  key={`list#${list.id}`} 
                  className="list-container" 
                  style={{ minWidth: '250px'}}>
                    <span>
                    {list.position > board.lists[0].position ? (
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
                    {list.position < board.lists[board.lists.length - 1].position ? (
                      <IconButton
                        variant="outlined"
                        onClick={() => moveList("moveRight", list)}
                      >
                        <ArrowForwardIosIcon />
                      </IconButton>
                    ) : null}
                    </span>
                    <SingleList boardId={board.id} list={list} />
                  </Box>
                )) : null}

                {addingList ? (
                  <Box className="list-container" style={{ minWidth: '200px'}}>
                    <Typography variant="h5">
                      <TextField
                      placeholder="Enter list title..."
                      size="small"
                      color="neutral"
                      onChange={(evt) => setListName(evt.target.value)}
                      />
                      <Box>
                        <Button 
                        color="neutral"
                        variant="contained"
                        style={{ justifyContent: 'flex-start', textTransform: 'none' }} 
                        onClick={handleSubmitList}
                        >
                          Add List
                        </Button>
                        <Button color="neutral" onClick={cancelAddList}>
                          X
                        </Button>
                      </Box>
                    </Typography>
                  </Box>
                ) : (
                  <Box 
                  className="list-container" 
                  style={{ minWidth: '200px'}}>
                    <Button 
                    className="add-list-button" 
                    color="neutral"
                    variant="contained"
                    fullWidth
                    style={{ justifyContent: 'flex-start', textTransform: 'none' }} 
                    onClick={() => setAddingList(true)}
                    >
                      + Add another list
                    </Button>
                  </Box>
                )}
              </Box>
            </DragDropContext>
          </Box>
        ) : null}
      </ThemeProvider>
    </>
  );
};

export default SingleBoard;
