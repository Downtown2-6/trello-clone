import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../features/navBar/NavBar";
import UserBoards from "../features/boards/AllUserBoards";
import CreateBoardForm from "../features/createBoardForm/CreateBoardForm";
import CreateBoardFormMUI from "../features/createBoardForm/createMUIBoardForm";
import AllUserBoardsSlice from "../features/boards/allUserBoardsSlice";
import { Container, Typography, Grid } from "@mui/material";

const Home = () => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <>
      <Container sx={{ paddingTop: 5 }}>
        <Typography variant="h4">Welcome!</Typography>
          <UserBoards />
          {/* <CreateBoardForm />
          <CreateBoardFormMUI/> */}
      </Container>
    </>
  );
};

export default Home;
