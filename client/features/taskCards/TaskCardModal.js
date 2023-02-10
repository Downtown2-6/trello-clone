import React, { useState, useRef, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Modal,
  Box,
  TextField,
  Typography,
  Input,
  Dialog,
} from "@mui/material";
import { updateTaskCard, addComment } from "../singleBoard/singleBoardSlice";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import EditableTaskCard from "./EditableTaskCard";
import Comment from "./Comment";
import moment from "moment";

function ChildModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    // React Fragment allows to return multiple elements from a React component by allowing to group a list of children without adding extra nodes to the DOM
    <Fragment>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h4 id="child-modal-title">Text in a child modal</h4>
          <p id="child-modal-description">Description</p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </Fragment>
  );
}

const TaskCardModal = (props) => {
  const { list, taskCard, style } = props;
  const { boardId } = useParams();
  const userId = useSelector((state) => state.auth.me.id);

  const inputRef = useRef();

  const [title, setTitle] = useState(taskCard.title);
  const [description, setDescription] = useState(taskCard.description);
  const [comment, setComment] = useState("");
  const [date, setDate] = useState(taskCard.start);
  const dispatch = useDispatch();

  useEffect(() => {
    handleTaskCardUpdate();
  }, [date]);

  // console.log("This is the date", date);

  const handleTaskCardUpdate = async () => {
    // console.log("This is date in the handleTaskCardUpdate", date);
    await dispatch(
      updateTaskCard({
        boardId,
        taskCardId: taskCard.id,
        description,
        title,
        start: date,
      })
    );
  };

  const handleSubmitComment = async () => {
    if (comment.length) {
      await dispatch(
        addComment({
          content: comment,
          taskcardId: taskCard.id,
          userId,
        })
      );
      setComment("");
    }
  };

  return (
    <>
      <Box sx={{ marginBottom: "1em" }}>
        <Typography variant="h5">
          <EditableTaskCard
            text={title}
            childRef={inputRef}
            type="input"
            handleTaskCardUpdate={handleTaskCardUpdate}
          >
            <input
              className="taskCard-modal-title editable"
              ref={inputRef}
              type="text"
              name="title"
              value={title}
              onChange={(evt) => setTitle(evt.target.value)}
              onBlur={(evt) =>
                !title.length ? setTitle(taskCard.title) : null
              }
            />
          </EditableTaskCard>
        </Typography>
        <small>in list {list.listName}</small>
      </Box>
      <Box>
        {/* <Typography variant="h6" id="taskCard-modal-activity-label">
          Due Date
        </Typography> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Due Date"
            value={date}
            clearable
            onChange={(newValue) => {
              setDate(newValue.$d);
            }}
            renderInput={(params) => <TextField {...params} />}
            size="small"
            onClose={handleTaskCardUpdate}
            // onAccept={handleTaskCardUpdate}
          />
        </LocalizationProvider>
      </Box>
      <br />
      <Box sx={{ marginBottom: "1em" }}>
        <Typography variant="h6" id="taskCard-modal-description-label">
          Description
        </Typography>

        {taskCard.description && taskCard.description.length ? (
          <EditableTaskCard
            text={description}
            childRef={inputRef}
            type="textarea"
            handleTaskCardUpdate={handleTaskCardUpdate}
          >
            <textarea
              className="taskCard-modal-description editable"
              ref={inputRef}
              name="description"
              placeholder="Add a more detailed description..."
              rows="3"
              value={description}
              onChange={(evt) => setDescription(evt.target.value)}
              onBlur={handleTaskCardUpdate}
            />
          </EditableTaskCard>
        ) : (
          <TextField
            className="taskCard-modal-description editable"
            placeholder="Add a more detailed description..."
            multiline
            size="small"
            fullWidth
            onChange={(evt) => setDescription(evt.target.value)}
            onBlur={handleTaskCardUpdate}
          />
        )}
      </Box>
      <Box sx={{ marginBottom: "1em" }}>
        <Typography variant="h6" id="taskCard-modal-activity-label">
          Activity
        </Typography>
        <TextField
          className="taskCard-modal-comment editable"
          placeholder="Write a comment..."
          multiline
          size="small"
          fullWidth
          value={comment}
          onChange={(evt) => setComment(evt.target.value)}
          onBlur={handleSubmitComment}
        />
        <Comment taskCard={taskCard} />
      </Box>
    </>
  );
};

export default TaskCardModal;
