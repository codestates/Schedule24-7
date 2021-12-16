import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MainLogo, MainWrapper } from "../style/theme";
import Footer from "../components/Footer";
import FindId from "../components/findidpw/FindId";
import FindPw from "../components/findidpw/FindPw";
import { mediaQuery } from "../GlobalStyle";

export const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 90vh;
`;

export const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.3rem;
`;

export const ChangeBtn = styled.button`
  width: 152px;
  height: 35px;
  color: white;
  box-shadow: 0.05rem 0.05rem 0.05rem #696969;
  border: 0px solid #a5a5a5;
  cursor: pointer;
  margin-bottom: 1rem;
  background-color: #7c7c7c;
  margin: 0.2rem;

  &:hover {
    background-color: #001988;
  }

  &:focus {
    background-color: #5c5c5c;
  }
  ${mediaQuery.mobile} {
    max-width: 133px;
  }
`;

function FindIdPwPage() {
  let navigate = useNavigate();

  //아이디 찾기 비밀번호 찾기 상태변경
  const [inputState, setInputState] = useState(true);

  //루트페이지로 이동시키는 함수
  function comeBackHome() {
    navigate("/");
  }

  return (
    <MainWrapper>
      <BoxWrapper>
        <MainLogo
          onClick={comeBackHome}
          src="https://media.discordapp.net/attachments/907157959333785630/914705380070785064/s725_logopng.png"
        />
        <BtnWrapper>
          <ChangeBtn
            onClick={() => {
              setInputState(true);
            }}
          >
            아이디찾기
          </ChangeBtn>
          <ChangeBtn
            onClick={() => {
              setInputState(false);
            }}
          >
            비밀번호찾기
          </ChangeBtn>
        </BtnWrapper>
        {inputState ? <FindId /> : <FindPw />}
      </BoxWrapper>
      <Footer />
    </MainWrapper>
  );
}

export default FindIdPwPage;
