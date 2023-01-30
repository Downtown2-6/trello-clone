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
    <div id="main">
      <div id="header">
        <h1>Trell-O</h1>
      </div>
      <Navbar />
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after user logs in */}
            <Link to="/home">Home</Link>
            {/* <Link to='/board/:boardId'>Board</Link> */}
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link to="/login" id="nav-link-login" className="nav-link">
              Login
            </Link>
            <Link to="/signup" id="nav-link-signup" className="nav-link">
              Sign Up
            </Link>
          </div>
        )}
      </nav>
      <hr />
      <div>
        {isLoggedIn ? (
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/:user" element={<Home />} />
            <Route path="/board/:boardId" element={<SingleBoard />} />
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
  );
};

export default Main;
