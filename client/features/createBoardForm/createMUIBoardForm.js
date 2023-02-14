import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserBoard,
  fetchAllUserBoards,
} from "../boards/allUserBoardsSlice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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

const CreateBoardFormMUI = (props) => {
  const [boardName, setBoardName] = useState("");
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.auth.me.id);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("this is the handleSubmit", e);
    console.log("and\n this\n is\n the\n me", loggedInUserId);
    if (!boardName || boardName === "null" || boardName == null)
      return alert("Please enter a board name.");
    dispatch(createUserBoard({ boardName, loggedInUserId }));
    setOpen(false);
  };

  return (
    <>
      <Grid item xs={2}>
        <Card
          sx={{ height: 100, width: 200, minWidth: 200 }}
          onClick={handleClickOpen}
        >
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Create new board
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a new board</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new board, enter the board name here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Board Name"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setBoardName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateBoardFormMUI;
