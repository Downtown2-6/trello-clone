import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsersInBoard,
  grantUserAccess,
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
  Alert,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

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

    dispatch(grantUserAccess({ userEmail, boardId }));
    setUserEmail('')
    // setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchAllUsersInBoard(boardId));
  }, []);

  const allUsersInThisBoard = useSelector((state) => state.singleBoardUsers);
  return (
    <>
      <Button color='neutral' variant="contained" onClick={handleClickOpen}>
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
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            onSubmit={(boardName) =>  handleSubmit() }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
        <DialogContent>
          <DialogContentText>Current Board Users</DialogContentText>
          {allUsersInThisBoard && allUsersInThisBoard.length
            ? allUsersInThisBoard.map((item, index) => {
                return <li key={index}>{(item.user || {}).email}</li>;
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
