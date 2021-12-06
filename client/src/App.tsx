import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import GroupRoutes from "./components/routes/GroupRoute";
import FindIdPw from "./pages/FindIdPw";
import MainPage from "./pages/MainPage";
import { GlobalStyle } from "./GlobalStyle";
import ScheduleRoutes from "./components/routes/ScheduleRoute";
import MyPage from "./pages/MyPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/reducers";

function App() {
  const loginState = useSelector((state: RootState) => state.loginReducer);
  const dispatch = useDispatch();

  return (
    <Router>
      <GlobalStyle />
      <Routes>
        {loginState.login ? (
          <Route path="/" element={<MainPage />} />
        ) : (
          <Route path="/" element={<LoginPage />} />
        )}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/findidpw" element={<FindIdPw />} />
        <Route path="/group/*" element={<GroupRoutes />} />
        <Route path="/schedule/*" element={<ScheduleRoutes />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
