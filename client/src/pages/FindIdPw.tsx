import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BtnWrapper } from "./SignUpPage";
import { MainLogo, MainWrapper } from "../style/theme";

export const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function FindIdPw() {
  const [inputState, setInputState] = useState(true);
  //아이디 찾기 비밀번호 찾기 상태변경

  let navigate = useNavigate();

  function comeBackHome() {
    navigate("/");
  }
  //루트페이지로 이동시키는 함수

  const handleFindId = () => {
    return;
  };
  //아이디 찾는 함수

  const handleFindPw = () => {
    return;
  };
  //비밀번호 찾는 함수

  return (
    <MainWrapper>
      <div>
        <MainLogo
          onClick={comeBackHome}
          src="https://media.discordapp.net/attachments/907157959333785630/914705380070785064/s725_logopng.png"
        />
      </div>
      <BtnWrapper>
        <button
          onClick={() => {
            setInputState(true);
          }}
        >
          아이디찾기
        </button>
        <button
          onClick={() => {
            setInputState(false);
          }}
        >
          비밀번호찾기
        </button>
      </BtnWrapper>
      <BoxWrapper>
        <input
          type="text"
          placeholder="이름을 입력하세요"
          // onChange={}
        />
        <input
          className="signup-box"
          type="email"
          placeholder="이메일을 입력하세요"
          // onChange={}
        ></input>
        {inputState ? (
          <button onClick={handleFindId}>아이디 찾기</button>
        ) : (
          <button onClick={handleFindPw}>비밀번호 찾기</button>
        )}
        <button className="signup-btn" onClick={comeBackHome}>
          홈으로
        </button>
      </BoxWrapper>
    </MainWrapper>
  );
}

export default FindIdPw;
