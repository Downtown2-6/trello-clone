import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTaskCard,
  deleteThisTaskCard,
  deleteThisList,
  addTaskCardSocket,
  updateList
} from "../singleBoard/singleBoardSlice";
import SingleTaskCard from "../taskCards/SingleTaskCard";
import EditableList from "./EditableList";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import io from "socket.io-client";
import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import { ClickAwayListener } from "@mui/base";
import DeleteIcon from "@mui/icons-material/Delete";

const socket = io();

const ListContainer = styled.div``;

const SingleList = (props) => {
  const { boardId, list } = props;
  const userId = useSelector((state) => state.auth.me.id);
  const listId = list.id;
  const numTaskCards = list.taskcards ? list.taskcards.length + 1 : 1;

  const dispatch = useDispatch();
  const inputRef = useRef();

  const [listName, setListName] = useState(list.listName);
  const [taskCardTitle, setTaskCardTitle] = useState("");
  const [addingTaskCard, setAddingTaskCard] = useState(false);

  useEffect(() => {
    socket.off("add-taskCard").on("add-taskCard", (newTaskCard) => {
      dispatch(addTaskCardSocket(newTaskCard));
    });
  }, [dispatch]);

  useEffect(() => {
    socket.off('update-list-state').on('update-list-state', 
    (updatedList) => {
      setListName(list.listName);
    });
  }, [list]);

  const handleListUpdate = async () => {
    const updatedList = await dispatch(
      updateList({
        boardId,
        listId,
        listName
      })
    );
    socket.emit('update-list', updatedList.payload);
  };

  const handleSubmitTaskCard = async () => {
    if (taskCardTitle.length) {
      const newTaskCard = await dispatch(
        addTaskCard({
          boardId,
          listId,
          title: taskCardTitle,
          position: numTaskCards,
        })
      );
      socket.emit('add-taskCard', newTaskCard.payload);
      setAddingTaskCard(false);
      setTaskCardTitle("");
    }
  };

  const cancelAddCard = () => {
    setAddingTaskCard(false);
    setTaskCardTitle("");
  };

  const handleDeleteList = async (evt) => {
    const deletedList = await dispatch(deleteThisList({ listId, userId, boardId }));
    socket.emit('delete-list', deletedList.payload);
  };

  return (
    <Box
      className="list-container-content"
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
        borderRadius: 1,
        boxShadow: 1,
        // backgroundColor: "#f5f5f5",
        bgcolor: "lighter.main",
      }}
    >
      <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        paddingBottom: 1,
        boxShadow: 0,
        justifyContent: "space-between",
      }}>
        <Typography 
        variant="h5" 
        sx={{paddingLeft: 1, paddingRight: 1}}>
          <EditableList
            text={listName}
            childRef={inputRef}
            type="input"
            handleListUpdate={handleListUpdate}
          >
            <textarea
              className="listName editable"
              ref={inputRef}
              type="text"
              name="listName"
              value={listName}
              onChange={(evt) => setListName(evt.target.value)}
              onBlur={(evt) =>
                !listName.length ? setListName(list.listName) : null
              }
            />
          </EditableList>
        </Typography>
        <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "top"
        }}>
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteList(list.id)}
            sx={{
              fontSize: 12,
              color: (theme) => theme.palette.grey[500],
              float: "right",
              "&:hover": { fontSize: 20 },
            }}
          >
            <DeleteIcon
              sx={{
                fontSize: 12,
                color: (theme) => theme.palette.grey[500],
                float: "right",
                "&:hover": { fontSize: 20 },
              }}
            />
          </IconButton>
        </Box>
      </Box>
      <Droppable droppableId={listId.toString()}>
        {(provided) => (
          <ListContainer
            // className='list-container-content'
            innerRef={provided.innerRef}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {list.taskcards && list.taskcards.length
              ? list.taskcards.map((taskCard, index) => (
                  <div key={`taskCard#${taskCard.id}`} className="taskCard">
                    <SingleTaskCard
                      list={list}
                      taskCard={taskCard}
                      index={index}
                    />
                  </div>
                ))
              : null}
            {provided.placeholder}
          </ListContainer>
        )}
      </Droppable>
      {addingTaskCard ? (
        <Box className="list-bottom-container">
          <TextField
          className="taskCard-title"
          color="neutral"
          placeholder="Enter a title for this card..."
          size="small"
          multiline
          fullWidth
          inputProps={{ style: { fontSize: 14 }}}
          onChange={(evt) => setTaskCardTitle(evt.target.value)}
          />
          <Box sx={{ marginTop: 0.5 }}>
            <Button 
            color="neutral"
            variant="contained"
            style={{ justifyContent: 'flex-start', textTransform: 'none' }} 
            onClick={handleSubmitTaskCard}
            >
              Add card
            </Button>
            <Button color="neutral" onClick={cancelAddCard}>
              X
            </Button>
          </Box>
        </Box>
      ) : (
        <Box className="add-card-container">
          <Button 
          className="add-card-button" 
          color="neutral"
          fullWidth
          style={{ justifyContent: 'flex-start', textTransform: 'none' }}
          onClick={() => setAddingTaskCard(true)}
          >
            + Add a card
          </Button>
        </Box>
      )}
                      
    </Box>
  );
};

export default SingleList;
