import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';
import { Modal, Box, TextField } from "@mui/material";
// import { Textarea } from '@mui/joy/Textarea';
import { updateTaskCard } from '../singleBoard/singleBoardSlice';

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
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...style, width: 200 }}>
          <h4 id='child-modal-title'>Text in a child modal</h4>
          <p id='child-modal-description'>
            Description
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </Fragment>
  )
};

const TaskCardModal = (props) => {
  const { list, taskCard, style } = props;
  const { boardId } = useParams();

  const [title, setTitle] = useState(taskCard.title);
  const [description, setDescription] = useState(taskCard.description);
  const dispatch = useDispatch();

  var titleHtml = `<h3 class='taskCard-modal-item'>${title}</h3>`;
  var descriptionHtml = `<p class='taskCard-modal-item'>${description}</p>`

  const handleTitleChange = (evt) => {
    setTitle(sanitizeHtml(evt.target.value, sanitizeConf));
  }

  const handleDescriptionChange = (evt) => {
    setDescription(sanitizeHtml(evt.target.value, sanitizeConf));
  }

  const sanitizeConf = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a'],
    allowedAttributes: { a: ['href'] },
  }

  const handleTaskCardUpdate = async () => {
    await dispatch(updateTaskCard({
      boardId, 
      taskCardId: taskCard.id, 
      description,
      title
    }));
  };

  return (
    <>
      <Box>
        <ContentEditable
          className='editable'
          tagName='pre'
          html={titleHtml}
          onChange={handleTitleChange}
          onBlur={handleTaskCardUpdate}
        />
        {/* <Textarea
          className='editable'
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
          onBlur={handleTaskCardUpdate}
        /> */}
        <small>in list {list.listName}</small>
      </Box>
      <Box>
        <h5 id='taskCard-modal-description-label'>
          Description
        </h5>

        {taskCard.description && taskCard.description.length ? 
        <ContentEditable
          className='editable'
          tagName='pre'
          html={descriptionHtml}
          onChange={handleDescriptionChange}
          onBlur={handleTaskCardUpdate}
        />
        : 
        <TextField 
          placeholder='Add a more detailed description...' 
          multiline
          variant='filled' 
          size='small'
          fullWidth
          onChange={(evt) => setDescription(evt.target.value)}
          onBlur={handleTaskCardUpdate}
        />
        }

      </Box>
      <Box>
        <h5 id='taskCard-modal-activity-label'>
          Activity
        </h5>
      </Box>
    </>
  )
}

export default TaskCardModal;