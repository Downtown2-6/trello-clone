import React, { useState, Fragment } from 'react';
import ContentEditable from 'react-contenteditable';
import { Modal, Box } from "@mui/material";

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

  const [titleValue, setTitleValue] = useState(taskCard.title);

  const html = `<h3 className='taskCard-modal-item'>${titleValue}</h3>`;

  return (
    <>
      <Box>
        <ContentEditable
          className='editable'
          html={html}
        />
        <div><small>in list {list.listName}</small></div>
      </Box>
      <Box>
        <h5 id='taskCard-modal-description-label'>
          Description
        </h5>
      </Box>
    </>
  )
}

export default TaskCardModal;