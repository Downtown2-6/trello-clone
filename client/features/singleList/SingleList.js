import React, { useState }from "react";
import { useDispatch } from "react-redux";
import { addTaskCard } from "../taskCards/taskCardsSlice";
import SingleTaskCard from "../taskCards/SingleTaskCard";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const ListContainer = styled.div``

console.log(`***
***
***
***
***
***
`, );
const SingleList = (props) => {
  const boardId = props.boardId;
  const list = props.list;
  const listId = list.id;
  const numTaskCards = list.taskcards.length + 1;

  const dispatch = useDispatch();

  const [taskCardTitle, setTaskCardTitle] = useState('');

  const handleSubmitTaskCard = async (evt) => {
    evt.preventDefault();
    if (taskCardTitle.length) {
      await dispatch(addTaskCard({
        boardId,
        listId,
        title: taskCardTitle,
        position: numTaskCards
      }));
      setTaskCardTitle('');
    }
  }

  return (
    <Droppable droppableId={listId.toString()}>
      {(provided, snapshot) => (
        <ListContainer
          innerRef={provided.innerRef}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          <div className='list-container-content'>
            <h4>{list.listName}</h4>
            <div className='list-taskCards-container'>
              {list.taskcards && list.taskcards.length ? list.taskcards.map((taskCard, index) => (
                <div key={`taskCard#${taskCard.id}`} className='taskCard'>
                  <SingleTaskCard taskCard={taskCard} index={index} />
                </div>
              )) : null}

            </div>
            <div className='list-bottom-container'>
              <form className='add-taskCard-form' onSubmit={handleSubmitTaskCard}>
                <input
                  className='add-taskCard'
                  name='title'
                  type='text'
                  value={taskCardTitle}
                  onChange={(evt) => setTaskCardTitle(evt.target.value)}
                />
                <button className='add-taskCard-button' type='submit'>
                  Add card
                </button>
              </form>
            </div>
          </div>
        </ListContainer>
      )}
    </Droppable>
  )
}

export default SingleList;
