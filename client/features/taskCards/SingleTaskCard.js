import React, { useState } from 'react';
import { Modal, Box, Dialog } from "@mui/material";
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import TaskCardModal from './TaskCardModal';

const TaskContainer = styled.div ``

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  bgcolor: '#fafafa',
  outline: 'none',
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
    <Draggable key={`task-${taskCard.title}`} draggableId={taskCard.id.toString()} index={props.index}>

      {(provided, snapshot) => (
      <TaskContainer
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        isDragging={snapshot.isDragging}
      >
        <div className='taskCard-draggable' onClick={handleOpen}>
          {taskCard.title}
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='taskCard-modal-title'
          aria-describedby='taskCard-modal-description'
        >
          <Box sx={{ ...style, width: '90vw', maxHeight: '90vh', height: '90vh', maxWidth: '800px', overflowY: 'auto', padding: 2 }}>
            <TaskCardModal list={list} taskCard={taskCard} style={style} />
          </Box>
        </Modal>
      </TaskContainer>
      )}

    </Draggable>
  )
}

export default SingleTaskCard;
