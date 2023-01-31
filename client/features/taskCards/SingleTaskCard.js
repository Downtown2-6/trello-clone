import React from 'react';
import { Link } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components';

const TaskContainer = styled.div ``


const SingleTaskCard = (props) => {
  const taskCard = props.taskCard;
console.log(taskCard)
  return (
    <Draggable draggableId={taskCard.id.toString()} index={props.index}>
      {(provided, snapshot) => (
      <TaskContainer
        innerRef={provided.innerRef}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        isDragging={snapshot.isDragging}
      >
        <p>{taskCard.title}</p>
      </TaskContainer>
      )}
    </Draggable>
  )
}

export default SingleTaskCard;
