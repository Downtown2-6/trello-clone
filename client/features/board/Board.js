import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from '../list/List';
import { fetchBoard } from "./singleBoardSlice";

const Board = () => {
  // const lists = useSelector(selectLists);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBoard())
  }, []);

  const board = useSelector(state => state.board)
  console.log(board)
  return (
    <div>
      {/* <h2>Board Name</h2>
      <div className='board-lists-container'>
        {lists.map((list) => (
          <div key={`list#${list.id}`} className='list-container'>
            <List list={list} />
          </div>
        ))}
      </div> */}
      <h1>BOARD LIST </h1>
    </div>
  )
}

export default Board;
