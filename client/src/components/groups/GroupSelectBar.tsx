import { FC } from "react";
import styled from "styled-components";
import { DefaultLayout, hideMobileCss, mediaQuery } from "../../GlobalStyle";

const Block = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 11px 6px;

  a {
    text-align: center;
    width: 80px;
    height: 45px;
    left: 24px;
    top: 10.5px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
  }
`;

const GroupSelectBar: FC = () => {
  return (
    <>
    <Block>      
      <a href="#">스케줄</a>
      <a href="/group/member">멤버관리</a>
      <a href="/group/info">기본정보</a>
      <a href="/group/condition">근무조건</a>
    </Block>
    </>
  );
};

export default GroupSelectBar;