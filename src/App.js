import React, { useState, useEffect, useContext } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "./Context";
import ToDoDashboard from "./components/ToDoDashboard";
import Login from "./components/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Protected from "./utils/ProtectedRoute";
import middleware from "./utils/middleware"

const App = () => {
  const navigate = useNavigate();
  const {isLoggedIn, setIsLoggedIn} = useContext(Context);

  const checkUserToken = () => {
    const userToken = localStorage.getItem("user-token");
    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
      navigate("/login");
    } else {
        setIsLoggedIn(true);
        navigate("/");
    }
  };

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Protected isLoggedIn={isLoggedIn}><ToDoDashboard /></Protected>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
