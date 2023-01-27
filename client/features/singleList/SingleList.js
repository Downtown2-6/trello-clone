import React, { useEffect }from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskCards from '../taskCards/TaskCards';
import { fetchTaskCards, selectTaskCards } from "../taskCards/taskCardsSlice";

const SingleList = (props) => {
  const dispatch = useDispatch()
  const listId = props.list.id
  const taskCards = useSelector(selectTaskCards);

  useEffect(() => {
    dispatch(fetchTaskCards({listId}))

  }, [dispatch])


  return (
    <div>
      <h4>{props.list.listName}</h4>
      <div className='list-taskCards-container'>
        {taskCards && taskCards.length ? taskCards.map((taskCard) => (
          <div key={`taskCard#${taskCard.id}`} className='taskCard'>
            {/* // <TaskCards taskCard={taskCard} /> */}
            <p> TEST TASK CARD </p>
          </div>
        )) : null}
      </div>
    </div>
  )
}

export default SingleList;
