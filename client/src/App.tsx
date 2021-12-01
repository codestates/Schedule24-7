import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import GroupRoutes from "./components/routes/GroupRoute";
import FindIdPw from "./pages/FindIdPw";
import MainPage from "./pages/MainPage";
import { GlobalStyle } from "./GlobalStyle";
import ScheduleRoutes from "./components/routes/ScheduleRoute";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/findidpw" element={<FindIdPw />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/group/*" element={<GroupRoutes />} />
        <Route path="/schedule/*" element={<ScheduleRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
