import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ErrMsg, MainLogo, MainWrapper } from "../style/theme";
import Footer from "../components/Footer";
import swal from "sweetalert";
import moment from "moment";
import ReCAPTCHA from "react-google-recaptcha";

axios.defaults.withCredentials = true;

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
  &.timer {
    margin-top: 5px;
    font-size: 14px;
    color: #c40000;
  }
`;

export const SignUpBox = styled.input`
  width: 300px;
  height: 40px;
  padding-left: 10px;
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

function SignUpPage() {
  let navigate = useNavigate();

  //회원가입을 정보
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

  //인증번호 아이디
  const [authId, setAuthId] = useState<string>("");

  //에러상태묶음
  const [errors, setErrors] = useState({
    idOverlap: false,
    permitSignUpBtn: false,
    emptyBoxCheck: false,
    emailValidCheck: false,
    permitAuthNumBox: false,
    authCodeErr: false,
    recaptcha: false,
  });

  //메세지 렌더링 상태
  const [messageRender, setMessageRender] = useState(false);

  //타이머 렌더링 상태
  const [viewTimer, setViewTimer] = useState<boolean>(false);

  //타이머
  const [timer, setTimer] = useState<string>("");

  //이메일인증성공 메시지 상태
  const [authSuccessMsg, setAuthSuccessMsg] = useState<boolean>(false);

  //회원가입 정보를 변경하는 함수
  const handleSignUpValue =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setSignUpInfo({ ...signUpInfo, [key]: e.target.value });
    };

  //아이디 중복 검사 함수
  const handleIdCheck = (): void => {
    axios
      .get(`https://server.schedule24-7.link/auth/userId/${signUpInfo.userId}`)
      .then((res) => {
        setMessageRender(true);
        setErrors({ ...errors, idOverlap: res.data.result });
      })
      .catch(() => {
        setMessageRender(true);
        setErrors({ ...errors, idOverlap: true });
      });
  };

  //ID가 이미 존재할 경우 작동하는 함수
  const idMatchConfirm = () => {
    if (errors.idOverlap) {
      return true;
    } else {
      return false;
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

  //비밀번호 유효성 검사 함수
  const strongPassword = (str: string): boolean => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      str
    );
  };

  //유효성체크해서 에러여부 리턴하는 함수
  const validationConfirm = (): boolean => {
    if (strongPassword(signUpInfo.password)) {
      return true;
    } else {
      return false;
    }
  };

  //비밀번호 유효성 검사 결과 렌더링하는 함수
  const renderValidationCheckMessage = () => {
    if (signUpInfo.password !== "" && !validationConfirm()) {
      return <ErrMsg className="err">유효하지 않은 비밀번호입니다</ErrMsg>;
    }
  };

  //비밀번호 일치여부 판단하는 함수
  const passwordMatchConfirm = () => {
    if (signUpInfo.password === signUpInfo.passwordCheck) {
      return true;
    } else {
      return false;
    }
  };

  //비밀번호 불일치 오류메세지를 렌더하는 함수
  const renderFeedbackMessage = () => {
    if (!passwordMatchConfirm()) {
      return <ErrMsg className="err">패스워드가 일치하지 않습니다</ErrMsg>;
    }
  };

  //인증번호 저장 함수
  const handleAuthNumUpValue =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setAuthNumber({ ...authNumber, [key]: e.target.value });
    };

  //인증번호 발송 요청 함수
  const handleAuthnumSend = () => {
    axios
      .get(`https://server.schedule24-7.link/auth/email/${signUpInfo.email}`)
      .then((res: any) => {
        setErrors({
          ...errors,
          permitAuthNumBox: true,
          emailValidCheck: false,
        });
        setAuthId(res.data._id);
        setViewTimer(true);
        startTimer(300);
      })
      .catch(() => {
        setErrors({ ...errors, emailValidCheck: true });
      });
  };

  //이메일 인증 요청 함수
  const handleEmailAuth = () => {
    axios
      .post("https://server.schedule24-7.link/auth/authnumber", {
        authNumber: Number(authNumber.authNumber),
        _id: authId,
      })
      .then(() => {
        // stopTimer(1);
        // setTimer("");
        // startTimer(0);
        setViewTimer(false);
        setErrors({ ...errors, permitSignUpBtn: true, authCodeErr: false });
        setAuthSuccessMsg(true);
      })
      .catch(() => {
        setErrors({ ...errors, authCodeErr: true });
      });
  };

  //빈칸있을 경우 메시지 렌더 함수
  const renderEmptyBoxCheck = () => {
    return <ErrMsg className="err">필수정보입니다</ErrMsg>;
  };

  //회원가입 서버에 요청하는 함수
  const handleSignUp = () => {
    setAuthSuccessMsg(false);
    setErrors({ ...errors, emptyBoxCheck: true });
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
          swal({
            title: "회원가입 성공!",
            icon: "success",
          });
          navigate("/");
        });
    }
    //  .catch(() => {
    //   setIsError(true);
    // })
  };

  //리캡차생성함수
  const handleRecaptcha = () => {
    setErrors({ ...errors, recaptcha: true });
  };

  //타이머 생성 함수
  let setTimeId: any;
  const startTimer = (setTime: number): void => {
    // 타이머 중복 실행 방지로 기존 시작된 타이머를 리셋하여 점점 빨라지는 오류를 방지
    clearInterval(setTimeId);
    let countDownDate = moment().add(setTime, "seconds");
    setTimeId = setInterval(function () {
      let diff = countDownDate.diff(moment());
      if (diff <= 0) {
        clearInterval(setTimeId);
        // console.log("시간이초과 되었습니다. 다시 시도해주세요.");
        setErrors({ ...errors, permitSignUpBtn: false });
        return false;
      } else {
        // console.log(moment.utc(diff).format("mm:ss") + " 남았습니다.");
        setTimer(moment.utc(diff).format("mm:ss"));
      }
    });
  };

  // const stopTimer = (setTime: number): void => {
  // let countDownDate = moment().add(setTime, "seconds");
  // setInterval(function () {
  //   let diff = countDownDate.diff(moment());
  //   if (diff <= 0) {
  //     setErrors({ ...errors, permitSignUpBtn: false });
  //     return false;
  //   } else {
  //     setTimer(moment.utc(diff).format("mm:ss"));
  //   }
  // });
  // console.log(setTimeId);
  // clearInterval(setTimeId);
  // setTimeId = null;
  //   console.log("타이머끝");
  // };

  return (
    <MainWrapper>
      {/* {console.log(setTimeId)} */}
      <SignUpWrapper>
        <MainLogo
          onClick={() => navigate("/")}
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
            {errors.emptyBoxCheck
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
            {errors.emptyBoxCheck
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
            {errors.emptyBoxCheck
              ? signUpInfo.password === ""
                ? renderEmptyBoxCheck()
                : ""
              : ""}
            {renderValidationCheckMessage()}
          </SignUpItems>
          <SignUpItems>
            <SignUpText>비밀번호확인</SignUpText>
            <SignUpBox
              type="password"
              onChange={handleSignUpValue("passwordCheck")}
            ></SignUpBox>
            {renderFeedbackMessage()}
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
            {errors.emailValidCheck ? (
              <ErrMsg className="err">이미 존재하는 이메일입니다</ErrMsg>
            ) : (
              ""
            )}
          </SignUpItems>
          {errors.permitAuthNumBox ? (
            <SignUpItems>
              <SignUpText className="sub">* 인증번호 입력</SignUpText>
              <SignUpSubItem>
                <SignUpBox
                  type="text"
                  className="sub"
                  onChange={handleAuthNumUpValue("authNumber")}
                ></SignUpBox>
                <SignUpBtn onClick={handleEmailAuth} className="c">
                  이메일인증
                </SignUpBtn>
              </SignUpSubItem>
              {viewTimer ? (
                <SignUpSubItem className="timer">{timer}</SignUpSubItem>
              ) : (
                ""
              )}
              {authSuccessMsg ? (
                <ErrMsg className="ok">이메일 인증 성공!</ErrMsg>
              ) : (
                ""
              )}
              <SignUpItems>
                <ReCAPTCHA
                  sitekey="6LfebJ8dAAAAAM7VL3z0RwncwAA2czDI4bMLVZJc"
                  onChange={handleRecaptcha}
                />
              </SignUpItems>
              {errors.authCodeErr ? (
                <ErrMsg className="err">잘못된 인증번호 입니다</ErrMsg>
              ) : (
                ""
              )}
            </SignUpItems>
          ) : (
            ""
          )}
          {errors.permitSignUpBtn && errors.recaptcha ? (
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

// {errors.permitSignUpBtn && errors.recaptcha ? (
//   <SignUpItems>
//     <SignUpBtn className="a" onClick={handleSignUp}>
//       회원가입
//     </SignUpBtn>
//   </SignUpItems>
// ) : (
//   ""
// )}

// {errors.permitSignUpBtn ? (
//   <SignUpItems>
//     <SignUpBtn className="a" onClick={handleSignUp}>
//       회원가입
//     </SignUpBtn>
//   </SignUpItems>
// ) : (
//   ""
// )}
