import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import GroupRoutes from "./components/routes/GroupRoute";
import MainPage from "./pages/MainPage";
import { GlobalStyle } from "./GlobalStyle";
import ScheduleRoutes from "./components/routes/ScheduleRoute";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/reducers";
import React, { useEffect } from "react";
import { loginChange } from "./redux/actions/loginActions";
import FindIdPw from "./components/routes/FindIdPw";
import MyRoutes from "./components/routes/MyRoutes";
import { getGroupsApi } from "./lib/api/group";
import { getGroups } from "./redux/actions/Group";
import "./lib/confirm/index.css";
import LandingPage from "./pages/landingPage/LandingPage";

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

  //토큰저장
  useEffect(() => {
    if (document.cookie !== undefined) {
      let newCookie2 = document.cookie;
      let finalCookie2 = newCookie2.split("%22")[3];
      window.localStorage.setItem("token", finalCookie2);
    }
  }, [document.cookie]);

  //그룹정보 업데이트
  // useEffect(() => {
  //   getGroupsApi().then((res) => {
  //     dispatch(getGroups(res.data));
  //   });
  // }, [dispatch]);

  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/schedule/*" element={<ScheduleRoutes />} />
        <Route path="/findidpw/*" element={<FindIdPw />} />
        <Route path="/signup" element={<SignUpPage />} />

        {loginState.login ? (
          <>
            <Route path="/" element={<MainPage />} />
            <Route path="/group/*" element={<GroupRoutes />} />
            <Route path="/mypage/*" element={<MyRoutes />} />
          </>
        ) : (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
