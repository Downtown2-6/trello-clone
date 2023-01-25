import React from "react";
import { useSelector } from "react-redux";
import List from '../list/List';

const Board = () => {
  const lists = useSelector(selectLists);

  return (
    <div>
      <h2>Board Name</h2>
      <div className='board-lists-container'>
        {lists.map((list) => (
          <div key={`list#${list.id}`} className='list-container'>
            <List list={list} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Board;