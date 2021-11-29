import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import GroupRoutes from "./components/routes/GroupRoute";
import FindIdPw from "./pages/FindIdPw";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      <Routes>
        <Route path="/findidpw" element={<FindIdPw />} />
      </Routes>
      <Routes>
        <Route path="/group" element={<GroupRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
