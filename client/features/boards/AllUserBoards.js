import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUserBoards, selectUserBoards } from "./allUserBoardsSlice";
import { useParams, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {
  CardActionArea,
  Box,
  Container,
  Typography,
  Grid,
} from "@mui/material";
import CreateBoardFormMUI from "../createBoardForm/createMUIBoardForm";

const UserBoards = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allUserBoards = useSelector(selectUserBoards);
  const userId = useSelector((state) => state.auth.me.id);
  console.log("This is allUserBoards", allUserBoards);

  useEffect(() => {
    dispatch(fetchAllUserBoards(userId));
  }, []);

  return (
    <Container>
      <br />
      <Typography variant="h5">Your Boards</Typography>
      <br />
      <Grid container spacing={1}>
        {allUserBoards && allUserBoards.length
          ? allUserBoards.map(({ board }, index) => {
              console.log("Board name", board);
              //will need to fix navigate when we have more than one board
              return (
                <Grid item xs={4} key={index}>
                  <Card key={index} sx={{height: 100, width: 200, minWidth: 200}}>
                    <CardActionArea
                      onClick={() => navigate(`/board/${board.id}`)}
                    >
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {board.boardName}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })
          : null}
        <Grid item xs={2} >
          <CreateBoardFormMUI />
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserBoards;
