import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsersInBoard,
  fetchGrantUserAccess,
} from "./singleBoardUsersSlice";
import { useParams } from "react-router-dom";
import {
  Button,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  DialogContentText,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const SingleBoardUsers = () => {
  const [userEmail, setUserEmail] = useState("");
  const dispatch = useDispatch();
  const { boardId } = useParams();

  // const loggedInUserId = useSelector((state) => state.auth.me.id);
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
    dispatch(fetchGrantUserAccess({userEmail, boardId}));
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchAllUsersInBoard(1));
  }, []);

  const allUsersInThisBoard = useSelector((state) => state.singleBoardUsers);

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Users
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Users</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add user's email. User must have existing Trell-O account.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="New User Email"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setUserEmail(e.target.value)}
            onSubmit={(boardName) => handleSubmit()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
        <DialogContent>
          <DialogContentText>Current Board Users</DialogContentText>
          {/*
          We need to map through the users associated with the board and include a toggle to give them admin access


          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="New User Email"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setBoardName(e.target.value)}
          /> */}
          {allUsersInThisBoard && allUsersInThisBoard.length
            ? allUsersInThisBoard.map((item, index) => {
                return <li key={index}>{item.user.email}</li>;
              })
            : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SingleBoardUsers;
