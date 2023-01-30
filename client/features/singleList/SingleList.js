import React, { useEffect, useState }from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskCards from '../taskCards/TaskCards';
import { addTaskCard, fetchTaskCards, selectTaskCards } from "../taskCards/taskCardsSlice";

const SingleList = (props) => {
  const [taskCardName, setTaskCardName] = useState('');

  const list = props.list;
  const listId = list.id;
  const numTaskCards = list.taskcards.length;
  console.log(list)

  const dispatch = useDispatch();
  // const taskCards = useSelector(selectTaskCards);

  // useEffect(() => {
  //   dispatch(fetchTaskCards({listId}));
  // }, [dispatch]);

  const handleSubmitTaskCard = async (evt) => {
    evt.preventDefault();
    if (taskCardName.length) {
      await dispatch(addTaskCard({ listId, taskcardName: taskCardName, position: numTaskCards }));
      setTaskCardName('');
    }
  }

  return (
    <div>
      <h4>{list.listName}</h4>
      <div className='list-taskCards-container'>
        {list.taskcards && list.taskcards.length ? list.taskcards.map((taskCard) => (
          <div key={`taskCard#${taskCard.id}`} className='taskCard'>
            {/* // <TaskCards taskCard={taskCard} /> */}
            <p> TEST TASK CARD </p>
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
