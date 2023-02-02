import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addList, fetchLists, selectLists } from "../lists/listsSlice";
import { fetchSingleBoard, selectSingleBoard } from "./singleBoardSlice";
import SingleList from "../singleList/SingleList";
import { fetchTaskCards, selectTaskCards } from "../taskCards/taskCardsSlice";
import { selectSingleTaskCard } from '../singleTaskCard/singleTaskCardSlice';
import { DragDropContext } from "react-beautiful-dnd";
import SingleBoardUsers from "../singleBoardUsers/singleBoardUsers";

const SingleBoard = () => {
  const [listName, setListName] = useState('');

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id);
  const { boardId } = useParams();
  const board = useSelector(selectSingleBoard);
  const lists = useSelector(selectLists);
  const taskCards = useSelector(selectTaskCards);
  const singleTaskCard = useSelector(selectSingleTaskCard);

  useEffect(() => {
    dispatch(fetchSingleBoard({userId, boardId}));
  }, [dispatch, board.id, taskCards.length, lists.length, singleTaskCard]);

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
    <>
    <br/>
    <SingleBoardUsers/>
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
    </>
  )
}

export default SingleBoard;
