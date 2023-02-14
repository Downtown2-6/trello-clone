import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../features/auth/authSlice";
import { Button, Stack, TextField, Paper, Grid, Box } from "@mui/material";
import { positions } from "@mui/system";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogin = async (evt) => {
    evt.preventDefault();
    await dispatch(authenticate({ email, password, method: "login" }));
    setEmail("");
    setPassword("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        float: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          float: "center",
          width: 250,
          padding: 2,
          borderRadius: 1,
          boxShadow: 1,
          backgroundColor: "#f5f5f5",
        }}
      >
        {/* <Grid container spacing={2}>
    <Grid container item xs={3} direction="row"> */}
        {/* <form id="signup-form" className="form" onSubmit={handleLogin}> */}
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
        <Button
          variant="outlined"
          onClick={() => handleLogin}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignSelf: "right",
          }}
        >
          Log In
        </Button>
        {/* {error && <div> {error} </div>} */}
        {/* </form> */}
        {/* </Grid>
  </Grid> */}
      </Box>
    </Box>
    // <form id='login-form' className='form' onSubmit={handleLogin}>
    //   <label htmlFor='email'>Email:</label>
    //   <input
    //     name='email'
    //     value={email}
    //     onChange={(evt) => setEmail(evt.target.value)}
    //   />

    //   <label htmlFor='password'>Password:</label>
    //   <input
    //     type='password'
    //     name='password'
    //     value={password}
    //     onChange={(evt) => setPassword(evt.target.value)}
    //   />

    //   <button type='submit'>Log In</button>
    //   {error && <div> {error} </div>}
    // </form>
  );
};

export default Login;
