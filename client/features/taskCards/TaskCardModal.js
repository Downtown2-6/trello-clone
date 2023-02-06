import React, { useState, Fragment, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import { Modal, Box, TextField, Typography, Input } from "@mui/material";
// import { Textarea } from '@mui/joy/Textarea';
import { updateTaskCard } from "../singleBoard/singleBoardSlice";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs';
import EditableTaskCard from './EditableTaskCard';

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

  const inputRef = useRef();

  const [title, setTitle] = useState(taskCard.title);
  const [description, setDescription] = useState(taskCard.description);
  const [date, setDate] = useState(taskCard.start);
  const dispatch = useDispatch();

  var descriptionHtml = `<p class='taskCard-modal-item'>${description}</p>`

  console.log("This is the date", date)

  const handleDescriptionChange = (evt) => {
    setDescription(sanitizeHtml(evt.target.value, sanitizeConf));
  };

  const sanitizeConf = {
    allowedTags: ["b", "i", "em", "strong", "a"],
    allowedAttributes: { a: ["href"] },
  };

  const handleTaskCardUpdate = async () => {
    await dispatch(
      updateTaskCard({
        boardId,
        taskCardId: taskCard.id,
        description,
        title,
        start
      })
    );
  };

  return (
    <>
      <Box>
        <EditableTaskCard
          text={title}
          childRef={inputRef}
          type='input'
          handleTaskCardUpdate={handleTaskCardUpdate}
        >
          <input
            className='taskCard-modal-title inline-editing'
            ref={inputRef}
            type='text'
            name='title'
            value={title}
            onChange={evt => setTitle(evt.target.value)}
            onBlur={evt => !title.length ? setTitle(taskCard.title) : null}
          />
        </EditableTaskCard>

        {/* <ContentEditable
          className='editable'
          tagName='pre'
          html={titleHtml}
          onChange={handleTitleChange}
          onBlur={handleTaskCardUpdate}
        /> */}
        <small>in list {list.listName}</small>
        </Typography>
      </Box>
      <Box>
       <br/>
      <Typography variant="h5" id="taskCard-modal-activity-label"> Description</Typography>

        {taskCard.description && taskCard.description.length ? (
          <ContentEditable
            className="editable"
            tagName="pre"
            html={descriptionHtml}
            onChange={handleDescriptionChange}
            onBlur={handleTaskCardUpdate}
          />
        ) : (
          <Typography variant="body1" id="taskCard-modal-activity-label">
          <TextField
            placeholder="Add a more detailed description..."
            multiline
            variant="filled"
            size="small"
            fullWidth
            onChange={(evt) => setDescription(evt.target.value)}
            onBlur={handleTaskCardUpdate}
          />
          </Typography>
        )}
      </Box>
      <br/>
      <Box>
        <Typography variant="h6" id="taskCard-modal-activity-label">Activity</Typography>
      </Box>
      <br/>
      <Box>
        <Typography variant="h6" id="taskCard-modal-activity-label">Due Date</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Due Date"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
              size="small"
              onBlur={handleTaskCardUpdate}
            />
          </LocalizationProvider>
      </Box>
    </>
  );
};

export default TaskCardModal;
