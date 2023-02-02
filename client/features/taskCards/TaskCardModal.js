import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';
import { Modal, Box } from "@mui/material";
import { updateTaskCardTitle } from '../singleBoard/singleBoardSlice';

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
  const dispatch = useDispatch();

  var html = `<h3 class='taskCard-modal-item'>${title}</h3>`;

  const handleTitleChange = (evt) => {
    setTitle(sanitizeHtml(evt.target.value, sanitizeConf));
  }

  const sanitizeConf = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p'],
    allowedAttributes: { a: ['href'] },
  }

  const handleTitleUpdate = async () => {
    await dispatch(updateTaskCardTitle({
      boardId, 
      taskCardId: taskCard.id, 
      title
    }));
  };

  return (
    <>
      <Box>
        <ContentEditable
          className='editable'
          tagName='pre'
          html={html}
          onChange={handleTitleChange}
          onBlur={handleTitleUpdate}
        />
        <small>in list {list.listName}</small>
      </Box>
      <Box>
        <h5 id='taskCard-modal-description-label'>
          Description
        </h5>
        <p>
          a
        </p>
      </Box>
    </>
  )
}

export default TaskCardModal;