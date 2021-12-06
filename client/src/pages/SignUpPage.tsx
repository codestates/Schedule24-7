import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ErrMsg, MainLogo, MainWrapper } from "../style/theme";
import Footer from "../components/Footer";
import Timer from "../components/Timer";

export const SignUpItems = styled.div`
  margin: 0.8rem 0.8rem 0.8rem 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &.sub {
    margin: 0.8rem 0.8rem 0.8rem 0.8rem;
  }
`;

export const SignUpSubItem = styled.div`
  display: flex;
`;

export const SignUpBox = styled.input`
  width: 300px;
  height: 40px;
  padding-left: 10px;
  /* border-radius: 0.3rem; */
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  margin-bottom: 0.25rem;
  &.sub {
    width: 191px;
    margin-right: 8px;
    margin-bottom: 0px;
  }
`;

export const SignUpText = styled.div`
  font-weight: bold;

  &.sub {
    font-size: 12px;
    font-weight: 340;
  }
`;

export const SignUpBtn = styled.button`
  width: 313px;
  height: 43px;
  color: white;
  box-shadow: 0.05rem 0.05rem 0.05rem #696969;
  border: 0px solid #a5a5a5;
  cursor: pointer;
  margin-bottom: 0.5rem;

  &.a {
    margin-top: 1rem;
    background-color: #5c5c5c;
  }
  &.b {
    background-color: #7c7c7c;
  }
  &.c {
    width: 100px;
    background-color: #7c7c7c;
    margin-bottom: 0rem;
  }
`;

export const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

axios.defaults.withCredentials = true;

function SignUpPage() {
  let navigate = useNavigate();

  //루트페이지로 이동시키는 함수
  function comeBackHome() {
    navigate("/");
  }

  //회원가입을 위한 정보 상태
  const [signUpInfo, setSignUpInfo] = useState({
    userId: "",
    userName: "",
    password: "",
    passwordCheck: "",
    email: "",
  });

  //이메일 인증번호
  const [authNumber, setAuthNumber] = useState<{ authNumber: number }>({
    authNumber: 0,
  });

  //메세지 렌더링 상태
  const [messageRender, setMessageRender] = useState(false);

  //아이디가 이미 존재할 경우 에러상태 변경하여 조건부 렌더링
  const [isError, setIsError] = useState(false);

  //인증번호 아이디 관리
  const [authId, setAuthId] = useState<string>("");

  //회원가입 버튼 상태관리
  const [permitSignUp, setPermitSignUp] = useState(false);

  //빈박스 체크
  const [emptyBox, setEmptyBox] = useState(false);

  //이메일존재여부 상태
  const [emailValidCheck, setEmailValidCheck] = useState(false);

  //인증번호 입력창 관리
  const [permitAuth, setPermitAuth] = useState(false);

  //회원가입 정보를 변경하는 함수
  const handleSignUpValue =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setSignUpInfo({ ...signUpInfo, [key]: e.target.value });
    };

  //인증번호 저장 함수
  const handleAuthNumUpValue =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setAuthNumber({ ...authNumber, [key]: e.target.value });
    };

  //아이디 중복 검사 함수
  const handleIdCheck = (): void => {
    axios
      .get(`https://server.schedule24-7.link/auth/userId/${signUpInfo.userId}`)
      .then((res) => {
        // console.log(res);
        setMessageRender(true);
        setIsError(res.data.result);
      })
      .catch(() => {
        setMessageRender(true);
        setIsError(true);
      });
  };

  //비밀번호 일치여부 판단하는 함수
  const passwordMatchConfirm = () => {
    if (signUpInfo.password === signUpInfo.passwordCheck) {
      return true;
    } else {
      return false;
    }
  };

  // 유효성체크해서 에러여부 리턴하는 함수
  const validationConfirm = () => {
    if (strongPassword(signUpInfo.password)) {
      return true;
    } else {
      return false;
    }
  };

  //ID가 이미 존재할 경우 작동하는 함수
  const idMatchConfirm = () => {
    if (isError) {
      return true;
    } else {
      return false;
    }
  };

  //비밀번호 유효성 검사 함수
  function strongPassword(str: string) {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      str
    );
  }

  //오류메세지를 렌더하는 함수
  const renderFeedbackMessage = () => {
    if (!passwordMatchConfirm()) {
      return <ErrMsg className="err">패스워드가 일치하지 않습니다</ErrMsg>;
    }
  };

  //ID가 이미 존재할경우 아이디 입력칸 하단에 에러메시지 표시하는 함수
  const renderIdCheckMessage = () => {
    if (signUpInfo.userId && idMatchConfirm()) {
      return <ErrMsg className="err">이미 존재하는 아이디입니다</ErrMsg>;
    } else if (signUpInfo.userId && !idMatchConfirm()) {
      return <ErrMsg className="ok">사용 가능한 아이디입니다</ErrMsg>;
    } else {
      setMessageRender(false);
    }
  };

  //비밀번호 유효성 검사 결과 렌더링하는 함수
  const renderValidationCheckMessage = () => {
    if (signUpInfo.password !== "" && !validationConfirm()) {
      return <ErrMsg className="err">유효하지 않은 비밀번호입니다</ErrMsg>;
    }
  };

  //인증번호 발송 요청 함수
  const handleAuthnumSend = () => {
    axios
      .get(`https://server.schedule24-7.link/auth/email/${signUpInfo.email}`)
      .then((res: any) => {
        setPermitAuth(true);
        setAuthId(res.data._id);
      })
      .catch(() => {
        setEmailValidCheck(true);
      });
  };

  //이메일 인증 요청 함수
  const handleEmailAuth = () => {
    axios
      .post("https://server.schedule24-7.link/auth/authnumber", {
        authNumber: Number(authNumber.authNumber),
        _id: authId,
      })
      .then(() => setPermitSignUp(true));
  };

  //빈칸있을 경우 메시지 렌더 함수
  const renderEmptyBoxCheck = () => {
    return <ErrMsg className="err">필수정보입니다</ErrMsg>;
  };

  //회원가입 서버에 요청하는 함수
  const handleSignUp = () => {
    setEmptyBox(true);
    if (
      strongPassword(signUpInfo.password) &&
      signUpInfo.password !== "" &&
      signUpInfo.passwordCheck !== "" &&
      signUpInfo.password === signUpInfo.passwordCheck
    ) {
      axios
        .post("https://server.schedule24-7.link/users", {
          userId: signUpInfo.userId,
          userName: signUpInfo.userName,
          password: signUpInfo.password,
          email: signUpInfo.email,
        })
        .then(() => {
          alert("회원가입 성공!");
          comeBackHome();
        });
    }

    //  .catch(() => {
    //   setIsError(true);
    // })
  };

  return (
    <MainWrapper>
      <SignUpWrapper>
        <MainLogo
          onClick={comeBackHome}
          src="https://media.discordapp.net/attachments/907157959333785630/914705380070785064/s725_logopng.png"
        />
        <form onSubmit={(e) => e.preventDefault()}>
          <SignUpItems>
            <SignUpText>아이디</SignUpText>
            <SignUpSubItem>
              <SignUpBox
                className="sub"
                type="text"
                onChange={handleSignUpValue("userId")}
              ></SignUpBox>
              <SignUpBtn onClick={handleIdCheck} className="c">
                아이디 중복확인
              </SignUpBtn>
            </SignUpSubItem>
            {messageRender ? renderIdCheckMessage() : ""}
            {emptyBox
              ? signUpInfo.userId === ""
                ? renderEmptyBoxCheck()
                : ""
              : ""}
          </SignUpItems>
          <SignUpItems>
            <SignUpText>이름</SignUpText>
            <SignUpBox
              type="text"
              onChange={handleSignUpValue("userName")}
            ></SignUpBox>
            {emptyBox
              ? signUpInfo.userName === ""
                ? renderEmptyBoxCheck()
                : ""
              : ""}
          </SignUpItems>
          <SignUpItems>
            <SignUpText>비밀번호</SignUpText>
            <SignUpText className="sub">
              * 8자 이상, 영어, 숫자, 특수문자를 포함한 비밀번호
            </SignUpText>
            <SignUpBox
              type="password"
              onChange={handleSignUpValue("password")}
            ></SignUpBox>
            {emptyBox
              ? signUpInfo.password === ""
                ? renderEmptyBoxCheck()
                : ""
              : ""}
          </SignUpItems>
          <SignUpItems>
            <SignUpText>비밀번호확인</SignUpText>
            <SignUpBox
              type="password"
              onChange={handleSignUpValue("passwordCheck")}
            ></SignUpBox>
            {renderFeedbackMessage()}
            {renderValidationCheckMessage()}
          </SignUpItems>
          <SignUpItems className="sub">
            <SignUpText>이메일</SignUpText>
            <SignUpSubItem className="sub">
              <SignUpBox
                type="email"
                className="sub"
                onChange={handleSignUpValue("email")}
              ></SignUpBox>
              <SignUpBtn onClick={handleAuthnumSend} className="c">
                인증번호발송
              </SignUpBtn>
            </SignUpSubItem>
            {emailValidCheck ? (
              <ErrMsg className="err">이미 존재하는 이메일입니다</ErrMsg>
            ) : (
              ""
            )}
          </SignUpItems>
          {permitAuth ? (
            <SignUpItems>
              <SignUpText className="sub">* 인증번호 입력</SignUpText>
              <SignUpSubItem>
                <SignUpBox
                  type="number"
                  className="sub"
                  onChange={handleAuthNumUpValue("authNumber")}
                ></SignUpBox>
                <SignUpBtn onClick={handleEmailAuth} className="c">
                  이메일인증
                </SignUpBtn>
              </SignUpSubItem>
              {/* <Timer /> */}
            </SignUpItems>
          ) : (
            ""
          )}
          {permitSignUp ? (
            <SignUpItems>
              <SignUpBtn className="a" onClick={handleSignUp}>
                회원가입
              </SignUpBtn>
            </SignUpItems>
          ) : (
            ""
          )}
        </form>
      </SignUpWrapper>
      <Footer />
    </MainWrapper>
  );
}

export default SignUpPage;
