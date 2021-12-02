import { useState } from "react";
import axios from "axios";
import EditUser from "./EditUser";
import { MainLogo, MainWrapper } from "../../style/theme";
import { useNavigate } from "react-router";
import { BtnWrapper } from "../../pages/SignUpPage";
import styled from "styled-components";

axios.defaults.withCredentials = true;

// { handleOnMyPage, userId }

export const InfoBox = styled.div`
  border: 1px solid black;
  margin: 0.3rem;
`;

function UserInfo() {
  let navigate = useNavigate();

  function comeBackHome() {
    navigate("/main");
  }
  //루트페이지로 이동시키는 함수
  const [newPassword, setPassword] = useState({
    password: "",
    newPassword: "",
    newPasswordCheck: "",
  });
  const [errorCheck, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorMessageCheck, setErrorMessageCheck] = useState<boolean>(false);

  const handlePassword =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword({ ...newPassword, [key]: e.target.value });
      console.log(newPassword.newPassword);
    };
  //회원가입 정보를 변경하는 함수

  const checkPassword = () => {
    // axios
    //   .get(
    //     `https://server.webmarker.link/users/password/${newPassword.password}`,
    //     {
    //       headers: {
    //         authorization: `Bearer ${window.localStorage.getItem("token")}`,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     if (res.data.data.result) {
    //       setErrorMessageCheck(false);
    //       setError(res.data.data.result);
    //     } else {
    //       setErrorMessageCheck(true);
    //       setErrorMessage("비밀번호가 일치하지 않습니다");
    //     }
    //   });
    setError(true);
  };
  //패스워드 체크하는 함수

  const handleChangePassowrd = () => {
    // if (newPassword.newPassword === newPassword.newPasswordCheck) {
    //   axios
    //     .patch(
    //       "http://ec2-54-180-96-63.ap-northeast-2.compute.amazonaws.com/users/password",
    //       { password: newPassword.newPassword },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    //         },
    //       }
    //     )
    //     .then(() => {
    //       alert("비밀번호가 성공적으로 변경되었습니다");
    //       setErrorMessageCheck(false);
    //       setError(false);
    //     });
    // } else {
    //   setErrorMessageCheck(true);
    //   setErrorMessage("비밀번호가 일치하지 않습니다");
    // }
    return;
  };
  //비밀번호 변경 요청하는 함수

  return (
    <MainWrapper>
      <MainLogo
        onClick={comeBackHome}
        src="https://media.discordapp.net/attachments/907157959333785630/914705380070785064/s725_logopng.png"
      />
      <div>Schedule 24/7 회원정보</div>
      <form onSubmit={(e) => e.preventDefault()}>
        <InfoBox>userId</InfoBox>
        <InfoBox>유저이름</InfoBox>
        <div>
          <input
            type="email"
            placeholder="email"
            onChange={handlePassword("password")}
          ></input>
        </div>
        <div>
          <input
            type="password"
            placeholder="현재 password"
            onChange={handlePassword("password")}
          ></input>
        </div>
        <BtnWrapper>
          <button onClick={checkPassword}>계정확인</button>
          {/* <button
          onClick={() => handleOnMyPage(false)}
          >
            뒤로
          </button> */}
        </BtnWrapper>
      </form>
      {errorCheck ? (
        <EditUser
        //   errorMessageCheck={errorMessageCheck}
        //   handlePassword={handlePassword}
        //   handleChangePassowrd={handleChangePassowrd}
        />
      ) : (
        ""
      )}
      {errorMessageCheck ? <div>{errorMessage}</div> : ""}
    </MainWrapper>
  );
}

export default UserInfo;
