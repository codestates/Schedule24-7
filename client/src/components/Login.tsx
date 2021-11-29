import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { loginChange, logoutChange } from "../actions/loginChange";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

export const LoginItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.3rem;
`;

export const LoginBox = styled.input``;

export const LoginBtn = styled.button``;

axios.defaults.withCredentials = true;

export default function Login() {
  //   const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleLoginInfo =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginInfo({ ...loginInfo, [key]: e.target.value });
    };

  const handleLogin = () => {
    // window.localStorage.setItem("email", loginInfo.email);
    // window.localStorage.setItem("password", loginInfo.password);
    // axios
    //   .post("https://server.webmarker.link/users/login", {
    //     email: loginInfo.email,
    //     password: loginInfo.password,
    //   })
    //   .then((res) => {
    //     window.localStorage.setItem("token", res.data.data.accessToken);
    //     dispatch(loginChange());
    //   })
    //   .catch(() => {
    //     setIsError(true);
    //     setErrorMessage("아이디 또는 비밀번호를 확인해주세요");
    //   });
    return;
  };

  const socialLoginHandler = () => {
    // window.location.assign("https://server.webmarker.link/users/auth/google");
    // window.localStorage.setItem("token", document.cookie.accessToken);
    // dispatch(loginChange());
    return;
  };
  //ouath 로그인 요청 함수

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <LoginItems>
          <LoginBox
            type="email"
            placeholder="email"
            onChange={handleLoginInfo("email")}
          ></LoginBox>
        </LoginItems>
        <LoginItems>
          <LoginBox
            type="password"
            placeholder="password"
            onChange={handleLoginInfo("password")}
          ></LoginBox>
        </LoginItems>
        <LoginItems>
          <LoginBtn onClick={handleLogin}>로그인</LoginBtn>
        </LoginItems>
        {isError ? <div className="invalid-feedback">{errorMessage}</div> : ""}
      </form>
      <div>
        <LoginItems>
          {/* <img src="https://media.discordapp.net/attachments/907157959333785630/910685960612765786/google_logo.png" /> */}
          <LoginBtn onClick={socialLoginHandler}>구글아이디로 로그인</LoginBtn>
        </LoginItems>
        <LoginItems>
          <Link to="/signup">
            <span className="login-text">아이디가 없으신가요?</span>
          </Link>
        </LoginItems>
        <LoginItems>
          <Link to="/signup">
            <span className="login-text">아이디/비밀번호찾기</span>
          </Link>
        </LoginItems>
      </div>
    </div>
  );
}
