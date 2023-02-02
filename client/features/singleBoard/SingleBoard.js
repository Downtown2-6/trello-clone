import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleBoard, selectSingleBoard } from "./singleBoardSlice";
import SingleList from "../singleList/SingleList";
import { DragDropContext } from "react-beautiful-dnd";
import list from "@fullcalendar/list";

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

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    console.log(result)
    console.log("taskcards", board.lists.taskcards)

    //if no destination in result object return
    if(!destination) return

    //if destination is same as source && index is the same, return
    if (destination.droppableId === source.droppableId
      && destination.index === source.index) {
        return
    }

    //reorder taskIds for the column
    const sourceList = board.lists.taskcards[source.droppableId]
    const destinationList = board.lists.taskcards[destination.droppableId]


    const { index: sourceIndex } = source
    const { index: destinationIndex } = destination
    // const taskcard = { ...sourceList.taskCards[sourceIndex]}

    sourceList.splice(sourceIndex, 1)
    destinationList.taskCards.splice(destinationIndex, 0, draggableId)

    // console.log("******LISTS*******", board.lists)

  }

  console.log("******LISTS*******", board.lists)

  // if (!board.list) {
  //   return (
  //     <div>
  //       Generic loading message
  //     </div>
  //   )
  // }

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
