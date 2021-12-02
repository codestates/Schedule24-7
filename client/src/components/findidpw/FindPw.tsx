import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FindPw() {
  const [userInfo, setUserInfo] = useState<any>({
    id: "",
    username: "",
    passowrd: "",
  });

  const handleUserInfo =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserInfo({ ...userInfo, [key]: e.target.value });
    };

  let navigate = useNavigate();

  function comeBackHome() {
    navigate("/");
  }
  //루트페이지로 이동시키는 함수

  const handleFindPw = (): void => {
    return;
  };
  //비밀번호 찾는 함수

  return (
    <>
      <input
        type="text"
        placeholder="아이디를 입력하세요"
        onChange={handleUserInfo("id")}
      />
      <input
        type="text"
        placeholder="이름을 입력하세요"
        onChange={handleUserInfo("username")}
      />
      <input
        type="email"
        placeholder="이메일을 입력하세요"
        onChange={handleUserInfo("password")}
      />
      <button onClick={handleFindPw}>비밀번호 찾기</button>
      <button onClick={comeBackHome}>홈으로</button>
    </>
  );
}
