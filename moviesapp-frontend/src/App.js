import React from "react";
import "./App.css";
import { BrowserRouter as Router,Routes , Route, Link } from "react-router-dom";
import Login from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import WelcomeScreen from "./Pages/WelcomeScreen";
import Home from "./Pages/Home";
import { SnackbarProvider } from 'notistack';
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

function App() {
  return (
    <SnackbarProvider>
    <Router>
      <Routes>
              <Route exact path="/" element={<WelcomeScreen/>} />
              <Route path="/sign-in" element={<Login/>} />
              <Route path="/sign-up" element={<SignUp/>} />
              <Route path="/home" element={<Home/>} />
      </Routes>
      <NotificationContainer />
    </Router>
    </SnackbarProvider>
  );
}

export default App;