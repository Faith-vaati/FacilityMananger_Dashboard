import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import NotFound from "./Pages/NotFound";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ProtectedRoute from "./components/Login/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/*" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
