import React, { useState } from "react";
import { Modal, Box, Dialog, Typography, IconButton } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import TaskCardModal from "./TaskCardModal";
import NotesIcon from "@mui/icons-material/Notes";
import CommentIcon from "@mui/icons-material/Comment";

const TaskContainer = styled.div``;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  bgcolor: "#fafafa",
  outline: "none",
  borderRadius: 0.5,
  boxshadow: 24,
};

const SingleTaskCard = (props) => {
  const { list, taskCard } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Draggable
      key={`task-${taskCard.title}`}
      draggableId={taskCard.id.toString()}
      index={props.index}
    >
      {(provided, snapshot) => (
        <TaskContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          <Box
            className="taskCard-draggable"
            onClick={handleOpen}
            sx={{
              boxShadow: 1,
              borderRadius: 1,
              margin: 0.5,
              // minHeight: 35,
              padding: 0.5,
              backgroundColor: "white",
              "&:hover": { boxShadow: 3 },
            }}
          >
            <Typography variant="body1">{taskCard.title}</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "left",
              }}
            >
              {taskCard.start ? (
                <Box
                  sx={{
                    fontSize: 12,
                    backgroundColor: "#bdbdbd",
                    height: 15,
                    borderRadius: 1,
                    padding: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {taskCard.start}
                </Box>
              ) : null}
              {taskCard.description ? (
                <IconButton
                  aria-label="description-included"
                  sx={{
                    fontSize: 12,
                    color: (theme) => theme.palette.grey[500],
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "left",
                  }}
                >
                  <NotesIcon
                    sx={{
                      fontSize: 12,
                      color: (theme) => theme.palette.grey[500],
                    }}
                  />
                </IconButton>
              ) : null}
              {taskCard.comments && taskCard.comments.length ? (
                <IconButton
                  aria-label="comments-included"
                  sx={{
                    fontSize: 12,
                    color: (theme) => theme.palette.grey[500],
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "left",
                  }}
                >
                  <CommentIcon
                    sx={{
                      fontSize: 12,
                      color: (theme) => theme.palette.grey[500],
                    }}
                  />
                </IconButton>
              ) : null}
            </Box>
          </Box>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="taskCard-modal-title"
            aria-describedby="taskCard-modal-description"
          >
            <Box
              sx={{
                ...style,
                width: "90vw",
                maxHeight: "90vh",
                height: "90vh",
                maxWidth: "800px",
                overflowY: "auto",
                padding: 2,
              }}
            >
              <TaskCardModal list={list} taskCard={taskCard} style={style} />
            </Box>
          </Modal>
        </TaskContainer>
      )}
    </Draggable>
  );
};

export default SingleTaskCard;
