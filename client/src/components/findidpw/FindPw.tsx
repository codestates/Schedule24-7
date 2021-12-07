import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ErrMsg, NormalBox, NormalBtn } from "../../style/theme";

export default function FindPw() {
  const navigate = useNavigate();

  //유저정보상태관리
  const [userInfo, setUserInfo] = useState<any>({
    userName: "",
    userId: "",
    Email: "",
  });

  //에러상태
  const [error, setError] = useState(false);

  //유저정보저장함수
  const handleUserInfo =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserInfo({ ...userInfo, [key]: e.target.value });
    };

  //비밀번호 찾는 함수
  const handleFindPw = (): void => {
    axios
      .post("https://server.schedule24-7.link/auth/loss/password", {
        userName: userInfo.userName,
        userId: userInfo.userId,
        email: userInfo.email,
      })
      .then(() => {
        setError(false);
        navigate("/findidpw/pw");
      })
      .catch(() => setError(true));
  };

  return (
    <>
      <NormalBox
        type="text"
        placeholder="아이디를 입력하세요"
        onChange={handleUserInfo("userId")}
      />
      <NormalBox
        type="text"
        placeholder="이름을 입력하세요"
        onChange={handleUserInfo("userName")}
      />
      <NormalBox
        type="email"
        placeholder="이메일을 입력하세요"
        onChange={handleUserInfo("email")}
      />
      <NormalBtn onClick={handleFindPw}>비밀번호 찾기</NormalBtn>
      {error ? (
        <ErrMsg className="centered">
          입력된 항목이 정확한지 다시 한번 확인해주세요
        </ErrMsg>
      ) : (
        ""
      )}
    </>
  );
}
