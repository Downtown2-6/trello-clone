import React, { useState }from "react";
import { useDispatch } from "react-redux";
import { addTaskCard } from "../taskCards/taskCardsSlice";
import SingleTaskCard from "../taskCards/SingleTaskCard";

const SingleList = (props) => {
  const [taskCardName, setTaskCardName] = useState('');

  const boardId = props.boardId;
  const list = props.list;
  const listId = list.id;
  const numTaskCards = list.taskcards.length + 1;

  const dispatch = useDispatch();

  const handleSubmitTaskCard = async (evt) => {
    evt.preventDefault();
    if (taskCardName.length) {
      await dispatch(addTaskCard({ 
        boardId, 
        listId, 
        taskcardName: taskCardName, 
        position: numTaskCards 
      }));
      setTaskCardName('');
    }
  }

  return (
    <div className='list-container-content'>
      <h4>{list.listName}</h4>
      <div className='list-taskCards-container'>
        {list.taskcards && list.taskcards.length ? list.taskcards.map((taskCard) => (
          <div key={`taskCard#${taskCard.id}`} className='taskCard'>
            <SingleTaskCard taskCard={taskCard} />
          </div>
        )) : null}

      </div>
      <div className='list-bottom-container'>
        <form className='add-taskCard-form' onSubmit={handleSubmitTaskCard}>
          <input 
            className='add-taskCard' 
            name='taskcardName'
            type='text'
            value={taskCardName}
            onChange={(evt) => setTaskCardName(evt.target.value)}
          />
          <button className='add-taskCard-button' type='submit'>
            Add card
          </button>
        </form>
      </div>
    </div>
  )
}

export default SingleList;
