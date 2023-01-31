import React, { useState, Fragment } from 'react';
import { Button, Modal, Box } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  bgcolor: 'gainsboro',
  boxshadow: 24,
};

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

const SingleTaskCard = (props) => {
  const taskCard = props.taskCard;

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button 
        sx={{ 
          width: '100%', 
          fontFamily: 'Segoe UI', 
          justifyContent: 'left', 
          textTransform: 'unset !important' 
        }} 
        onClick={handleOpen}
      >
        {taskCard.title}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: '90vw', height: '90vh' }}>
          <h4 id='parent-modal-title'>{taskCard.title}</h4>
          <p id='parent-modal-description'>
            TaskCard Description
          </p>
        </Box>
      </Modal>
    </>
  )
}

export default SingleTaskCard;
