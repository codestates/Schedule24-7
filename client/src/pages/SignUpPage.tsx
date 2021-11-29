import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import Footer from "../components/Footer";

export const MainWrapper = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SignUpItems = styled.div`
  margin: 0.3rem;
`;

export const SignUpBox = styled.input`
  border-radius: 0.3rem;
`;

export const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0.3rem;
`;

axios.defaults.withCredentials = true;

function SignUpPage() {
  let navigate = useNavigate();

  function comeBackHome() {
    navigate("/");
  }
  //루트페이지로 이동시키는 함수

  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    password: "",
    passwordCheck: "",
  });
  //회원가입을 위한 정보 상태

  const [isError, setIsError] = useState(false);
  //아이디가 이미 존재할 경우 에러상태 변경하여 조건부 렌더링

  const handleSignUpValue =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setSignUpInfo({ ...signUpInfo, [key]: e.target.value });
    };
  //회원가입 정보를 변경하는 함수

  const passwordMatchConfirm = () => {
    if (signUpInfo.password === signUpInfo.passwordCheck) {
      return true;
    } else {
      return false;
    }
  };
  //비밀번호 일치여부 판단하는 함수

  const validationConfirm = () => {
    if (strongPassword(signUpInfo.password)) {
      return true;
    } else {
      return false;
    }
  };
  //유효성체크해서 에러여부 리턴하는 함수

  const idMatchConfirm = () => {
    if (isError) {
      return true;
    } else {
      return false;
    }
  };
  //ID가 이미 존재할 경우 작동하는 함수

  function strongPassword(str: string) {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      str
    );
  }
  //비밀번호 유효성 검사

  const renderFeedbackMessage = () => {
    if (!passwordMatchConfirm()) {
      return (
        <div className="invalid-feedback">패스워드가 일치하지 않습니다</div>
      );
    }
  };
  //오류메세지를 렌더하는 함수

  const renderIdCheckMessage = () => {
    if (idMatchConfirm()) {
      return <div className="invalid-feedback">이미 존재하는 아이디입니다</div>;
    }
  };
  //ID가 이미 존재할경우 아이디 입력칸 하단에 에러메시지 표시하는 함수

  const renderValidationCheckMessage = () => {
    if (signUpInfo.password !== "" && !validationConfirm()) {
      return (
        <div className="invalid-feedback">유효하지 않은 비밀번호입니다</div>
      );
    }
  };

  const handleSignUp = () => {
    // if (
    //   strongPassword(signUpInfo.password) &&
    //   signUpInfo.password !== "" &&
    //   signUpInfo.passwordCheck !== "" &&
    //   signUpInfo.password === signUpInfo.passwordCheck
    // ) {
    //   axios
    //     .post("https://server.webmarker.link/users/signup", {
    //       email: signUpInfo.email,
    //       password: signUpInfo.password,
    //     })
    //     .then(() => {
    //       alert("회원가입 성공!");
    //       comeBackHome();
    //     })
    //     .catch(() => {
    //       setIsError(true);
    //     });
    // }
    return;
  };
  //회원가입 서버에 요청하는 함수

  const handleEmailAuth = () => {
    return;
  };
  //이메일 인증 요청 함수

  return (
    <MainWrapper>
      <div id="signup-title">Schedule24/7 회원가입</div>
      <form onSubmit={(e) => e.preventDefault()}>
        <SignUpItems>
          <input
            className="signup-box"
            type="text"
            placeholder="아이디"
            onChange={handleSignUpValue("email")}
          ></input>
          {renderIdCheckMessage()}
        </SignUpItems>
        <SignUpItems>
          <input
            className="signup-box"
            type="text"
            placeholder="이름"
            onChange={handleSignUpValue("email")}
          ></input>
        </SignUpItems>
        <SignUpItems>
          <input
            className="signup-box"
            type="password"
            placeholder="8자 이상, 영어, 숫자, 특수문자를 포함한 비밀번호"
            onChange={handleSignUpValue("password")}
          ></input>
        </SignUpItems>
        <SignUpItems>
          <input
            className="signup-box"
            type="password"
            placeholder="비밀번호 확인"
            onChange={handleSignUpValue("passwordCheck")}
          ></input>
          {renderFeedbackMessage()}
          {renderValidationCheckMessage()}
        </SignUpItems>
        <SignUpItems>
          <input
            className="signup-box"
            type="email"
            placeholder="email"
            onChange={handleSignUpValue("email")}
          ></input>
        </SignUpItems>
        <BtnWrapper>
          <button onClick={handleEmailAuth}>이메일인증</button>
        </BtnWrapper>
        <BtnWrapper>
          <button className="signup-btn" onClick={handleSignUp}>
            회원가입
          </button>
          <button className="signup-btn" onClick={comeBackHome}>
            홈으로
          </button>
        </BtnWrapper>
      </form>
      {/* <Footer /> */}
    </MainWrapper>
  );
}

export default SignUpPage;
