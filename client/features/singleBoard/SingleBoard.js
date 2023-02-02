import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleBoard, selectSingleBoard, addList } from "./singleBoardSlice";
import SingleList from "../singleList/SingleList";
import { DragDropContext } from "react-beautiful-dnd";

const SingleBoard = () => {
  const [listName, setListName] = useState('');

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id);
  const { boardId } = useParams();
  const board = useSelector(selectSingleBoard);

  useEffect(() => {
    dispatch(fetchSingleBoard({userId, boardId}));
  }, [dispatch]);

  const handleSubmitList = async (evt) => {
    evt.preventDefault();
    const position = board.lists.length + 1;
    if (listName.length) {
      await dispatch(addList({
        boardId: board.id,
        listName,
        position
      }));
      setListName('');
    }
  };

  const onDragEnd = () => {}

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        {board ?
        <div className='board-container'>
          <h2>{board.boardName}</h2>
          <div className='board-lists-container'>

          {board.lists && board.lists.length ? 
          board.lists.map((list) => (

            <div key={`list#${list.id}`} className='list-container'>
              <SingleList boardId={board.id} list={list} />
            </div>

          )) : null}

            <div className='list-container'>
              <form className='add-list-form' onSubmit={handleSubmitList}>
                <input 
                  className='add-list' 
                  name='listName'
                  type='text'
                  value={listName}
                  onChange={(evt) => setListName(evt.target.value)}
                />
                <button className='add-list-button' type='submit'>
                  Add another list
                </button>
              </form>
            </div>

          </div>
        </div>
        : null}
      </div>
    </DragDropContext>
  )
}

export default SingleBoard;
