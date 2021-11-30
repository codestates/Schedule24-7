import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import GroupRoutes from "./components/routes/GroupRoute";
import { GlobalStyle } from "./GlobalStyle";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/group" element={<GroupRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
