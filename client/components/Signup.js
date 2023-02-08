import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../features/auth/authSlice";
import { Button, Stack, TextField, Paper, Grid } from "@mui/material";
import { positions } from '@mui/system'

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSignup = async (evt) => {
    evt.preventDefault();
    if (!email || !password) {
      alert("All fields must be completed to sign up.");
    } else {
      await dispatch(
        authenticate({ email, password, firstName, lastName, method: "signup" })
      );
      setEmail("");
      setPassword("");
    }
  };

  return (
    <Grid container spacing={6}>
      <Grid container item xs={2} direction="column">
        <form id="signup-form" className="form" onSubmit={handleSignup}>
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="text"
            label="firstName"
            size="small"
            variant="outlined"
            onChange={(evt) => setFirstName(evt.target.value)}
          />
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="text"
            label="lastName"
            size="small"
            variant="outlined"
            onChange={(evt) => setLastName(evt.target.value)}
          />
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="email"
            label="email"
            size="small"
            variant="outlined"
            onChange={(evt) => setEmail(evt.target.value)}
          />
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="password"
            label="password"
            size="small"
            variant="outlined"
            onChange={(evt) => setPassword(evt.target.value)}
          />
          <button type="submit" position="absolute" right="0">Sign Up</button>
          {error && <div> {error} </div>}
        </form>
      </Grid>
    </Grid>
  );
};

export default Signup;
