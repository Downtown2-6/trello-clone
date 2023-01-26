import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchLists, selectLists } from "../lists/listsSlice";
import { fetchSingleBoard, selectSingleBoard } from "./singleBoardSlice";
import SingleList from "../singleList/SingleList";

const SingleBoard = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id);
  const { boardId } = useParams();
  const board = useSelector(selectSingleBoard);
  const lists = useSelector(selectLists);

  useEffect(() => {
    dispatch(fetchSingleBoard({userId, boardId}));
    dispatch(fetchLists({userId, boardId}));
  }, [dispatch, board.boardId]);

  return (
    <div>
      {board ?
      <div className='board-container'>
        <h2>{board.boardName}</h2>
        <div className='board-lists-container'>

          {lists && lists.length ? lists.map((list) => (
            <div key={`list#${list.id}`} className='list-container'>
              <SingleList list={list} />
            </div>
          )) : null}

        </div>
      </div>
      : null}
    </div>
  )
}

export default SingleBoard;
