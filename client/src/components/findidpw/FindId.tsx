import { useState } from "react";
import { NormalBox, NormalBtn } from "../../style/theme";

export default function FindId() {
  const [userInfo, setUserInfo] = useState<any>({
    username: "",
    passowrd: "",
  });
  //유저정보 상태관리

  const handleUserInfo =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserInfo({ ...userInfo, [key]: e.target.value });
    };
  //유저정보 저장하는 함수

  const handleFindId = (): void => {
    return;
  };
  //아이디 찾는 함수

  return (
    <>
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
      <NormalBtn onClick={handleFindId}>아이디 찾기</NormalBtn>
    </>
  );
}
