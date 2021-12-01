import { FC } from "react";
import styled from "styled-components";
import { DefaultLayout, hideMobileCss, mediaQuery } from "../../GlobalStyle";

const Block = styled.div`
  padding: 13px;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  position: relative;
`;

const GroupSelectBar: FC = () => {
  return (
    <>
    <h4>그룹 기본정보</h4>
    <Block>      
      <a href="#">스케줄</a>
      <a href="#">멤버관리</a>
      <a href="#">기본정보</a>
    </Block>
    </>
  );
};

export default GroupSelectBar;