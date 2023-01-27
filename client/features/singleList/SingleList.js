import React, { useEffect }from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskCards from '../taskCards/TaskCards';
import { fetchTaskCards, selectTaskCards } from "../taskCards/taskCardsSlice";

const SingleList = (props) => {

  const list = props.list
  console.log(list)

  // const dispatch = useDispatch();
  // const taskCards = useSelector(selectTaskCards);

  // useEffect(() => {
  //   dispatch(fetchTaskCards({listId}))
  // }, [dispatch])

  const addTaskCard = async (evt) => {
    evt.preventDefault();
    await dispatch()
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
        <form className='add-taskCard-form' onSubmit={addTaskCard}>
          <input 
            className='add-taskCard' 
            name='taskcardName'
            type='text'
            minlength='1'
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
