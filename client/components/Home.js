import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../features/navBar/NavBar";
import UserBoards from "../features/boards/AllUserBoards";
import CreateBoardForm from "../features/createBoardForm/CreateBoardForm";

const Home = () => {
const username = useSelector((state) => state.auth.me.username);


  return (
    <>
      <div>
        <h3>Welcome!</h3>
      </div>
      <div>List of User's Boards</div>
      <div>Create a new board</div>
      <div>Insert the list of all the boards the user belongs to</div>
      <UserBoards />
      <CreateBoardForm />
    </>
  );
};

export default Home;
