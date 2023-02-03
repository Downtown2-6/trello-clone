import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleBoard, selectSingleBoard, addList, updateTaskCard } from "./singleBoardSlice";
import SingleList from "../singleList/SingleList";
import { DragDropContext } from "react-beautiful-dnd";
import SingleBoardUsers from "../singleBoardUsers/singleBoardUsers";



const SingleBoard = () => {
  const [listName, setListName] = useState('');

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id);
  const { boardId } = useParams();
  const board = useSelector(selectSingleBoard);

  //testing for persistent DnD
  // const [boardState, setBoardState] = useState(board)

  // useEffect(() => {
  //   setBoardState(board);
  // }, [board]);


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

    //if no destination in result object return
    if(!destination) return


    //if destination is same as source && index is the same, return
    if (destination.droppableId === source.droppableId
      && destination.index === source.index) {
        return
    }

    const { index: sourceIndex } = source
    const { index: destinationIndex } = destination

    //reorder taskIds for the column


    const sourceList = board.lists.find((list) => list.id === parseInt(source.droppableId, 10))

    if (source.droppableId === destination.droppableId){
      const sourceListTasks = Array.from(sourceList.taskcards)
      const taskToMove = sourceListTasks.find((task) => task.id === parseInt(draggableId, 10))
      sourceListTasks.splice(sourceIndex, 1)
      sourceListTasks.splice(destinationIndex, 0, taskToMove)


      const newLists = board.lists.map((list) => {

        if (list.id.toString() === source.droppableId){
          return {
            ...list,
            taskcards: sourceListTasks
          }
        } else {
          return list
        }
      })

      const newBoard = {
        ...board,
        lists: newLists
      }

      sourceListTasks.forEach((task, index )=> {
        dispatch(updateTaskCard({
          boardId,
          taskCard: {
            ...task,
            position: index
          }
        }));

      })


      // setBoardState(newBoard)

    } else {
      const destinationList = board.lists.find((list) => list.id === parseInt(destination.droppableId, 10))
      const sourceListTasks = Array.from(sourceList.taskcards)
      const destinationListTasks = Array.from(destinationList.taskcards)
      const taskToMove = sourceListTasks.find((task) => task.id === parseInt(draggableId, 10))
      sourceListTasks.splice(sourceIndex, 1)
      destinationListTasks.splice(destinationIndex, 0, taskToMove)

      const newLists = board.lists.map((list) => {

        if (list.id.toString() === source.droppableId){
          return {
            ...list,
            taskcards: sourceListTasks
          }
        }
        if (list.id.toString() === destination.droppableId){
          return {
            ...list,
            taskcards: destinationListTasks
          }
        }
        return list
      })

      const newBoard = {
        ...board,
        lists: newLists
      }

      // destinationListTasks.forEach((task, index )=> {
      //   dispatch(updateTaskCard({
      //     boardId,
      //     taskCard: {
      //       ...task,
      //       position: index + 1
      //     }
      //   }));
      // })



      // setBoardState(newBoard)
      //if list.id === source.droppableId => build out source list
    }

    //sourceList id + position of taskCard in the sourceList if(taskcard id > minus 1 from positon )
    //destination id + new position in the destination if(taskcard id < incoming taskcard add 1 to position )

  }



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
