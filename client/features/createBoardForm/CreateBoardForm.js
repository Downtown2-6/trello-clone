import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserBoard, fetchAllUserBoards } from "../boards/allUserBoardsSlice";

const CreateBoardForm = (props) => {
  const [boardName, setBoardName] = useState("");
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.auth.me.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUserBoard({ boardName, loggedInUserId }));
  };

  return (
    <div id="createBoardForm">
      {" "}
      <form onSubmit={handleSubmit}>
        <label>
          Board Name:
          <input
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />
        </label>
        <button type="submit">Create Board</button>
      </form>
    </div>
  );
};

export default CreateBoardForm;


