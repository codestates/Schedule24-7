import { useState } from "react";
import { NormalBox, NormalBtn } from "../../style/theme";

export default function FindPw() {
  const [userInfo, setUserInfo] = useState<any>({
    id: "",
    username: "",
    passowrd: "",
  });
  //유저정보상태관리

  const handleUserInfo =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserInfo({ ...userInfo, [key]: e.target.value });
    };
  //유저정보저장함수

  const handleFindPw = (): void => {
    return;
  };
  //비밀번호 찾는 함수

  return (
    <>
      <NormalBox
        type="text"
        placeholder="아이디를 입력하세요"
        onChange={handleUserInfo("id")}
      />
      <NormalBox
        type="text"
        placeholder="이름을 입력하세요"
        onChange={handleUserInfo("username")}
      />
      <NormalBox
        type="email"
        placeholder="이메일을 입력하세요"
        onChange={handleUserInfo("password")}
      />
      <NormalBtn onClick={handleFindPw}>비밀번호 찾기</NormalBtn>
    </>
  );
}
