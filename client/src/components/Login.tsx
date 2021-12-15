import React, { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginChange } from "../redux/actions/loginActions";
import { ErrMsg } from "../style/theme";
// import GoogleLogin from "react-google-login";

axios.defaults.withCredentials = true;

export const LoginItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.6rem;
  > a {
    text-decoration: none;
  }
  > a:visited {
    color: #4c4c4c;
    text-decoration: none;
  }
`;

export const LoginBox = styled.input`
  width: 280px;
  height: 45px;
  padding-left: 10px;
  border-radius: 0.1rem;
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  margin-bottom: 0.25rem;
`;

export const LoginBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 293px;
  height: 45px;
  color: white;
  box-shadow: 0.05rem 0.05rem 0rem #6969693d;
  border: 0.1px solid #a5a5a575;
  border-radius: 0.1rem;
  cursor: pointer;
  margin-bottom: 0.25rem;

  &.a {
    background-color: #5c5c5c;
  }
  &.b {
    background-color: #e7e7e7;
    color: black;
  }
`;

export const LoginText = styled.div`
  margin-top: 0.1rem;
  font-size: 15px;
  margin-bottom: 0.15rem;
  color: #3d3d3d;
  &:hover {
    color: #131db3;
  }
  a {
    text-decoration: none;
  }
  a:visitied {
    text-decoration: none;
  }
`;

export const GoogleLogo = styled.img`
  width: 23px;
`;

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //로그인할 아이디 비밀번호 상태
  const [loginInfo, setLoginInfo] = useState({
    userId: "",
    password: "",
  });

  //로그인할 아이디 비밀번호 저장함수
  const handleLoginInfo =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginInfo({ ...loginInfo, [key]: e.target.value });
    };

  //일반 로그인 요청 함수
  const handleLogin = () => {
    axios
      .post("https://server.schedule24-7.link/auth/login", {
        userId: loginInfo.userId,
        password: loginInfo.password,
      })
      .then((res) => {
        window.localStorage.setItem("token", res.data.accessToken);
        dispatch(loginChange());
        navigate("/");
      })
      .catch(() => {
        setIsError(true);
        setErrorMessage("아이디 또는 비밀번호를 확인해주세요");
      });
  };

  //ouath 로그인 요청 함수
  const socialLoginHandler = () => {
    window.location.assign("https://server.schedule24-7.link/auth/google");

    let newCookie = document.cookie;
    let newCookieArr = newCookie.split(";");
    let finalCookie = newCookieArr[0].split("%22")[3];

    window.localStorage.setItem("token", finalCookie);
    dispatch(loginChange());
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <LoginItems>
          <LoginBox
            type="text"
            placeholder="아이디"
            onChange={handleLoginInfo("userId")}
          ></LoginBox>
          <LoginBox
            type="password"
            placeholder="비밀번호"
            onChange={handleLoginInfo("password")}
          ></LoginBox>
        </LoginItems>
        <LoginItems>
          <LoginBtn className="a" onClick={handleLogin}>
            로그인
          </LoginBtn>
          {isError ? <ErrMsg className="loginErr">{errorMessage}</ErrMsg> : ""}
          <LoginBtn className="b" onClick={socialLoginHandler}>
            <GoogleLogo src="https://media.discordapp.net/attachments/907157959333785630/910685960612765786/google_logo.png" />
            구글아이디로 로그인
          </LoginBtn>
        </LoginItems>
      </form>
      <LoginItems>
        <Link to="/signup">
          <LoginText>아이디가 없으신가요?</LoginText>
        </Link>
        <Link to="/findidpw">
          <LoginText>아이디/비밀번호찾기</LoginText>
        </Link>
      </LoginItems>
    </div>
  );
}
