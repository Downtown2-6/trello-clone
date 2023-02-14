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
import { Box } from "@mui/material";

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
    },
    eggshell: {
      main: '#fffcf2',
    }
  }
});

const pizzaTheme = createTheme({
  palette: {
    primary: {
      main: '#F7AD45',
      darker: '#BB3E00',
    },
    neutral: {
      main: '#5F8D37',
      contrastText: '#FFF1D7',
    },
    lighter: {
      main: '#F7AD45',
      contrastText: '#FFF1D7'
    },
    blue: {
      main: '#BB3E00',
      contrastText: '#FFF1D7'
    },
    eggshell: {
      main: '#FFF1D7',
    }
  }
});

const roseTheme = createTheme({
  palette: {
    primary: {
      main: '#CB857C',
      darker: '#9C2D41',
    },
    neutral: {
      main: '#9C2D41',
      contrastText: '#FAF7F4',
    },
    lighter: {
      main: '#F6CBB7',
      contrastText: '#FAF7F4'
    },
    blue: {
      main: '#CB857C',
      contrastText: '#FAF7F4'
    },
    eggshell: {
      main: '#FAF7F4',
    }
  }
});

const sportsTheme = createTheme({
  palette: {
    primary: {
      main: '#005792',
      darker: '#13334C',
    },
    neutral: {
      main: '#13334C',
      contrastText: '#F6F6E9',
    },
    lighter: {
      main: '#FFEBB7',
      contrastText: '#13334C'
    },
    blue: {
      main: '#FD5F00',
      contrastText: '#F6F6E9'
    },
    eggshell: {
      main: '#F6F6E9',
    }
  }
});

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
    <ThemeProvider theme={pizzaTheme}>
      <Box id="main">
        <Box id="header"></Box>
        <Navbar />
        <br />
        <br />
        <Box>
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
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Main;
