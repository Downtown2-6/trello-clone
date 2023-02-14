/*eslint-disable no-unused-vars */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { me, logout } from "../features/auth/authSlice";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import SingleBoard from "../features/singleBoard/SingleBoard";
import Navbar from "../features/navBar/NavBar";
import { MyCalendar } from "../features/calendar/Calendar";
import MyUserProfile from "../features/userProfile/MyUserProfile";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
    lighter: {
      main: '#ced3db',
      contrastText: '#fff'
    },
    blue: {
      main: '#004e89',
      contrastText: '#fff'
    }
  }
})

const Main = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id); // !! lets you convert a non-Boolean value to Boolean
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(me());
  }, []);

  const logoutAndRedirectHome = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
    <div id="main">
      <div id="header"></div>
      <Navbar />
      <br />
      <br />
      <div>
        {isLoggedIn ? (
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/:user" element={<Home />} />
            <Route path="/board/:boardId" element={<SingleBoard />} />
            <Route path="/myProfile" element={<MyUserProfile />} />
            <Route path="/calendar" element={<MyCalendar />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/*" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        )}
      </div>
    </div>
    </ThemeProvider>
  );
};

export default Main;
