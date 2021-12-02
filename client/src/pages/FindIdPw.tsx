import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BtnWrapper } from "./SignUpPage";
import { MainLogo, MainWrapper } from "../style/theme";
import Footer from "../components/Footer";
import FindId from "../components/findidpw/FindId";
import FindPw from "../components/findidpw/FindPw";

export const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 90vh;
`;

function FindIdPw() {
  const [inputState, setInputState] = useState(true);
  //아이디 찾기 비밀번호 찾기 상태변경

  let navigate = useNavigate();

  function comeBackHome() {
    navigate("/");
  }
  //루트페이지로 이동시키는 함수

  return (
    <MainWrapper>
      <BoxWrapper>
        <MainLogo
          onClick={comeBackHome}
          src="https://media.discordapp.net/attachments/907157959333785630/914705380070785064/s725_logopng.png"
        />
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
        {inputState ? <FindId /> : <FindPw />}
      </BoxWrapper>
      <Footer />
    </MainWrapper>
  );
}

export default FindIdPw;
