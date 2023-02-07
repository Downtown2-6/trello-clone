import React, { useState, useRef, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Modal, Box, TextField } from "@mui/material";
import { updateTaskCard } from '../singleBoard/singleBoardSlice';
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

  const inputRef = useRef();

  const [title, setTitle] = useState(taskCard.title);
  const [description, setDescription] = useState(taskCard.description);
  const dispatch = useDispatch();

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
        <EditableTaskCard
          text={title}
          childRef={inputRef}
          type='input'
          handleTaskCardUpdate={handleTaskCardUpdate}
        >
          <input
            className='taskCard-modal-title editable'
            ref={inputRef}
            type='text'
            name='title'
            value={title}
            onChange={evt => setTitle(evt.target.value)}
            onBlur={evt => !title.length ? setTitle(taskCard.title) : null}
          />
        </EditableTaskCard>
        <small>in list {list.listName}</small>
      </Box>
      <Box>
        <h5 id='taskCard-modal-description-label'>
          Description
        </h5>

        {taskCard.description && taskCard.description.length ? 
        <EditableTaskCard
          text={description}
          childRef={inputRef}
          type='textarea'
          handleTaskCardUpdate={handleTaskCardUpdate}
        >
          <textarea
            className='taskCard-modal-description editable'
            ref={inputRef}
            name='description'
            placeholder='Add a more detailed description...'
            rows='3'
            value={description}
            onChange={evt => setDescription(evt.target.value)}
            onBlur={handleTaskCardUpdate}
          />
        </EditableTaskCard>
        : 
        <TextField 
          className='taskCard-modal-description editable'
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