import React from "react";
import { useSelector } from "react-redux";
import TaskCard from '../taskCard/TaskCard';

const List = (props) => {
  const taskCards = useSelector(selectTaskCards);

  return (
    <div>
      <h4>{props.list.listName}</h4>
      <div className='list-taskCards-container'>
        {taskCards.map((taskCard) => (
          <TaskCard taskCard={taskCard} />
        ))}
      </div>
    </div>
  )
}

export default List;