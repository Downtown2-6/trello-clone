import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUserBoards, selectUserBoards } from "./allUserBoardsSlice";
import { useParams, useNavigate } from "react-router-dom";

const UserBoards = () => {
  const dispatch = useDispatch();
  const allUserBoards = useSelector(selectUserBoards);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.me.id);
  console.log("This is allUserBoards", allUserBoards);

  useEffect(() => {
    dispatch(fetchAllUserBoards(userId));
  }, []);

  return (
    <div>
      <h4>Your Boards</h4>
      <div>
        {allUserBoards && allUserBoards.length
          ? allUserBoards.map(({board}, index) => {
              console.log("Board name", board);
              //will need to fix navigate when we have more than one board
              return (
                <div key={index} onClick={() => navigate(`/board`)}>
                  {board.boardName}
                </div>
              );
            })
          : null}
      </div>
      <div onClick={() => navigate(`/newBoard`)}>Add a Board</div>
    </div>
  );
};

export default UserBoards;
