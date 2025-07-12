import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./loginForm"; 
import HomePage from "./HomePage";
import UserProfile from "./UserProfile";
import PublicProfile from "./PublicProfile";
import SwapRequestForm from "./SwapRequestForm";
import ApplicationStatus from "./ApplicationStatus";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<UserProfile/>} />
        <Route path="/user/:id" element={<PublicProfile />} />
        <Route path="/request" element={<SwapRequestForm/>} />
        <Route path="/status" element={<ApplicationStatus/>}/>
      </Routes>
    </Router>
  );
}

export default App;

