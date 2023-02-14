import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTaskCard,
  deleteThisTaskCard,
  deleteThisList,
  addTaskCardSocket,
} from "../singleBoard/singleBoardSlice";
import SingleTaskCard from "../taskCards/SingleTaskCard";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import io from "socket.io-client";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  FormControl,
  Input,
  InputLabel,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const socket = io();

const ListContainer = styled.div``;

const SingleList = (props) => {
  const { boardId, list } = props;
  const userId = useSelector((state) => state.auth.me.id);
  const listId = list.id;
  const numTaskCards = list.taskcards ? list.taskcards.length + 1 : 1;

  const dispatch = useDispatch();

  const [taskCardTitle, setTaskCardTitle] = useState("");

  useEffect(() => {
    socket.off("add-taskCard").on("add-taskCard", (newTaskCard) => {
      dispatch(addTaskCardSocket(newTaskCard));
    });
  }, [dispatch]);

  const handleSubmitTaskCard = async (evt) => {
    evt.preventDefault();
    if (taskCardTitle.length) {
      const newTaskCard = await dispatch(
        addTaskCard({
          boardId,
          listId,
          title: taskCardTitle,
          position: numTaskCards,
        })
      );
      socket.emit("add-taskCard", newTaskCard.payload);
      setTaskCardTitle("");
    }
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
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          paddingBottom: 1,
          boxShadow: 0,
          justifyContent: "space-between",
        }}
      >
<Typography variant="h5">{list.listName}</Typography>
<IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteList(list.id)}
                        sx={{
                          fontSize: 12,
                          color: (theme) => theme.palette.grey[500],
                          // float: 'right',
                        }}
                      >
                        <DeleteIcon
                          sx={{
                            fontSize: 12,
                            color: (theme) => theme.palette.grey[500],
                            // float: 'right',
                          }}
                        />
                      </IconButton>
                      </Box>
      <Droppable droppableId={listId.toString()}>
        {(provided) => (
          <ListContainer
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
      <div className="list-bottom-container">
        <form className="add-taskCard-form" onSubmit={handleSubmitTaskCard}>
          <input
            className="add-taskCard"
            name="title"
            type="text"
            value={taskCardTitle}
            onChange={(evt) => setTaskCardTitle(evt.target.value)}
          />
          <button className="add-taskCard-button" type="submit">
            Add card
          </button>
        </form>
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate(`/calendar`)}
        >
          Add card
        </Button>
      </div>
    </Box>
  );
};

export default SingleList;
