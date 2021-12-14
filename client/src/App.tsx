import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import GroupRoutes from "./components/routes/GroupRoute";
import MainPage from "./pages/MainPage";
import { GlobalStyle } from "./GlobalStyle";
import ScheduleRoutes from "./components/routes/ScheduleRoute";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/reducers";
import { useEffect } from "react";
import { loginChange } from "./redux/actions/loginActions";
import FindIdPw from "./components/routes/FindIdPw";
import MyRoutes from "./components/routes/MyRoutes";
import { getGroupsApi } from "./lib/api/group";
import { getGroups } from "./redux/actions/Group";
import "./lib/confirm/index.css";

function App() {
  const loginState = useSelector((state: RootState) => state.loginReducer);
  const dispatch = useDispatch();

  //로그인 유지를 위한 함수
  const keepLogin = () => {
    if (window.localStorage.getItem("token")) {
      dispatch(loginChange());
    }
  };

  //최초렌더시 로그인 유지함수 실행
  useEffect(() => {
    keepLogin();
  }, []);

  //그룹정보 업데이트
  useEffect(() => {
    getGroupsApi().then((res) => {
      dispatch(getGroups(res.data));
    });
  }, [dispatch]);

  return (
    <Router>
      <GlobalStyle />
      {loginState.login ? (
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/findidpw/*" element={<FindIdPw />} />
          <Route path="/group/*" element={<GroupRoutes />} />
          <Route path="/schedule/*" element={<ScheduleRoutes />} />
          <Route path="/mypage/*" element={<MyRoutes />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/findidpw/*" element={<FindIdPw />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
