import { useState } from "react";
import axios from "axios";
import EditUser from "./EditUser";
import { NormalBox, NormalBtn, MainLogo } from "../../style/theme";
import { useNavigate } from "react-router";
import styled from "styled-components";

axios.defaults.withCredentials = true;

// { handleOnMyPage, userId }

export const UserInfoSection = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
`;

export const UserInfoDiv = styled.div`
  background-color: #f9f9f9;
  width: 450px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  border: 1px solid #cacacac0;
  box-shadow: 1px 1px 1px #cacaca57;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: #f9f9f9; */
`;

export const UserInfoItems = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
`;

export const InfoHeader = styled.div`
  font-weight: bold;
  &.sub {
    font-size: 12px;
    font-weight: 340;
  }
`;

export const InfoBox = styled.div`
  width: 300px;
  height: 30px;
  padding-top: 15px;
  padding-left: 10px;
  /* border-radius: 0.3rem; */
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  margin-bottom: 0.4rem;
  align-items: center;
  background-color: white;
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
    <UserInfoSection>
      <UserInfoDiv>
        <MainLogo
          onClick={comeBackHome}
          src="https://media.discordapp.net/attachments/907157959333785630/914705380070785064/s725_logopng.png"
        />
        <form onSubmit={(e) => e.preventDefault()}>
          <UserInfoWrapper>
            <UserInfoItems>
              {/* <h2>회원정보</h2> */}
              <InfoHeader>아이디</InfoHeader>
              <InfoBox>TeamDevUp</InfoBox>
            </UserInfoItems>
            <UserInfoItems>
              <InfoHeader>사용자이름</InfoHeader>
              <InfoBox>이민형</InfoBox>
            </UserInfoItems>
            <UserInfoItems>
              <InfoHeader>비밀번호변경 및 탈퇴</InfoHeader>
              <InfoHeader className="sub">
                * 계정정보확인 후 가능합니다
              </InfoHeader>
              <NormalBox
                type="email"
                placeholder="email"
                onChange={handlePassword("password")}
              />
              <NormalBox
                type="password"
                placeholder="비밀번호"
                onChange={handlePassword("password")}
              />
              <NormalBtn onClick={checkPassword}>계정확인</NormalBtn>
            </UserInfoItems>
          </UserInfoWrapper>
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
      </UserInfoDiv>
    </UserInfoSection>
  );
}

export default UserInfo;
