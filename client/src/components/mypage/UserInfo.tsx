import { useState } from "react";
import axios from "axios";
import EditUser from "./EditUser";
import { NormalBox, NormalBtn, MainLogo, ErrMsg } from "../../style/theme";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useEffect } from "react";
import { mediaQuery } from "../../GlobalStyle";
import ConfirmModal from "./ConfirmModal";
import { useDispatch } from "react-redux";
import { logoutChange } from "../../redux/actions/loginActions";

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

  ${mediaQuery.mobile} {
    max-width: 290px;
    padding: 15px;
    border-radius: 5px;
  }
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
  background-color: #e2e2e2;
  ${mediaQuery.mobile} {
    max-width: 260px;
  }
`;

function UserInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userName: "",
    email: "",
  });
  const [tokenType, setTokenType] = useState<boolean>(true);

  //화면최초렌더링시 유저정보 불러옴
  useEffect(() => {
    axios
      .get("https://server.schedule24-7.link/users", {
        headers: {
          authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setUserInfo({
          ...userInfo,
          userId: res.data.user.userId,
          userName: res.data.user.userName,
          email: res.data.user.email,
        });
        if (res.data.user.tokenType === "jwt") {
          setTokenType(true);
        } else {
          setTokenType(false);
        }
      });
  }, []);

  //회원가입 정보를 변경하는 함수
  const handlePassword =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword({ ...newPassword, [key]: e.target.value });
      // console.log(newPassword.newPassword);
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
          navigate("/mypage/pwchange");
          setErrorMessageCheck(false);
          setError(false);
        });
    } else {
      setErrorMessageCheck(true);
      setErrorMessage("비밀번호가 일치하지 않습니다");
    }
  };

  const [openModal, setOpenModal] = useState<boolean>(false);

  //모달창 여는 함수
  const handleOpenModal = (): void => {
    setOpenModal(true);
  };

  //모달창 닫는 함수
  const handleCloseModal = (): void => {
    setOpenModal(false);
  };

  //회원탈퇴 함수
  const deleteConfirm = (): void => {
    axios
      .delete("https://server.schedule24-7.link/users", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        dispatch(logoutChange());
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("id");
        // alert("계정삭제가 정상적으로 처리되었습니다");
        navigate("/");
      });
  };

  //로그아웃 실행함수
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("id");
    dispatch(logoutChange());
    navigate("/");
  };

  return (
    <UserInfoSection>
      {tokenType ? (
        <UserInfoDiv>
          <MainLogo
            onClick={comeBackHome}
            src="https://media.discordapp.net/attachments/907157959333785630/914705380070785064/s725_logopng.png"
          />
          <form onSubmit={(e) => e.preventDefault()}>
            <UserInfoWrapper>
              <UserInfoItems>
                <InfoHeader>아이디</InfoHeader>
                <InfoBox>{userInfo.userId}</InfoBox>
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
                <NormalBtn onClick={handleLogout}>로그아웃</NormalBtn>
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
          {errorMessageCheck ? (
            <ErrMsg className="err">{errorMessage}</ErrMsg>
          ) : (
            ""
          )}
        </UserInfoDiv>
      ) : (
        <UserInfoDiv>
          <MainLogo
            onClick={comeBackHome}
            src="https://media.discordapp.net/attachments/907157959333785630/914705380070785064/s725_logopng.png"
          />
          <form onSubmit={(e) => e.preventDefault()}>
            <UserInfoWrapper>
              <UserInfoItems>
                <InfoHeader>아이디</InfoHeader>
                <InfoBox>{userInfo.userName}</InfoBox>
              </UserInfoItems>
              <UserInfoItems>
                <InfoHeader>이메일</InfoHeader>
                <InfoBox>{userInfo.email}</InfoBox>
              </UserInfoItems>
              <UserInfoItems>
                <InfoHeader className="pwd">회원탈퇴</InfoHeader>
                <NormalBtn className="out" onClick={handleOpenModal}>
                  회원탈퇴
                </NormalBtn>
                {openModal ? (
                  <ConfirmModal
                    handleCloseModal={handleCloseModal}
                    deleteConfirm={deleteConfirm}
                  />
                ) : (
                  ""
                )}
                <NormalBtn onClick={handleLogout}>로그아웃</NormalBtn>
              </UserInfoItems>
            </UserInfoWrapper>
          </form>
          {errorMessageCheck ? (
            <ErrMsg className="err">{errorMessage}</ErrMsg>
          ) : (
            ""
          )}
        </UserInfoDiv>
      )}
    </UserInfoSection>
  );
}

export default UserInfo;
