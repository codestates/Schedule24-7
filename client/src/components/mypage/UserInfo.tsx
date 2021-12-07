import { useState } from "react";
import axios from "axios";
import EditUser from "./EditUser";
import { NormalBox, NormalBtn, MainLogo, ErrMsg } from "../../style/theme";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useEffect } from "react";

axios.defaults.withCredentials = true;

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
    padding-left: 4px;
  }
  &.pwd {
    padding-left: 4px;
  }
`;

export const InfoBox = styled.div`
  width: 300px;
  height: 30px;
  padding-top: 15px;
  padding-left: 10px;
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  margin-bottom: 0.4rem;
  align-items: center;
  background-color: white;
`;

function UserInfo() {
  let navigate = useNavigate();

  //루트페이지로 이동시키는 함수
  function comeBackHome() {
    navigate("/main");
  }

  //패스워드, 변경할 패스워드, 변경할패스워드 확인
  const [newPassword, setPassword] = useState({
    password: "",
    newPassword: "",
    newPasswordCheck: "",
  });

  //에러체크 및 에러메시지 관련 상태
  const [errorCheck, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorMessageCheck, setErrorMessageCheck] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState({ userName: "", email: "" });

  //화면최초렌더링시 유저정보 불러옴
  useEffect(() => {
    axios
      .get("https://server.schedule24-7.link/users", {
        headers: {
          authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUserInfo({
          ...userInfo,
          userName: res.data.userName,
          email: res.data.email,
        });
      });
  }, []);

  //회원가입 정보를 변경하는 함수
  const handlePassword =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword({ ...newPassword, [key]: e.target.value });
      console.log(newPassword.newPassword);
    };

  //패스워드 일치여부 확인 함수
  const checkPassword = () => {
    axios
      .get(
        `https://server.schedule24-7.link/auth/password/${newPassword.password}`,
        {
          headers: {
            authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.result) {
          setErrorMessageCheck(false);
          setError(res.data.result);
        } else {
          setErrorMessageCheck(true);
          setErrorMessage("비밀번호가 일치하지 않습니다");
        }
      });
  };

  //비밀번호 변경 요청하는 함수
  const handleChangePassowrd = () => {
    if (newPassword.newPassword === newPassword.newPasswordCheck) {
      axios
        .patch(
          "https://server.schedule24-7.link/users",
          { new_password: newPassword.newPassword },
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          alert("비밀번호가 성공적으로 변경되었습니다");
          setErrorMessageCheck(false);
          setError(false);
        });
    } else {
      setErrorMessageCheck(true);
      setErrorMessage("비밀번호가 일치하지 않습니다");
    }
  };

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
              <InfoHeader>아이디</InfoHeader>
              <InfoBox>{window.localStorage.getItem("userId")}</InfoBox>
            </UserInfoItems>
            <UserInfoItems>
              <InfoHeader>사용자이름</InfoHeader>
              <InfoBox>{userInfo.userName}</InfoBox>
            </UserInfoItems>
            <UserInfoItems>
              <InfoHeader>이메일</InfoHeader>
              <InfoBox>{userInfo.email}</InfoBox>
            </UserInfoItems>
            <UserInfoItems>
              <InfoHeader className="pwd">비밀번호변경 및 탈퇴</InfoHeader>
              <InfoHeader className="sub">
                * 계정정보확인 후 가능합니다
              </InfoHeader>
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
            newPassword={newPassword}
            handlePassword={handlePassword}
            handleChangePassowrd={handleChangePassowrd}
          />
        ) : (
          ""
        )}
        {errorMessageCheck ? <ErrMsg>{errorMessage}</ErrMsg> : ""}
      </UserInfoDiv>
    </UserInfoSection>
  );
}

export default UserInfo;
