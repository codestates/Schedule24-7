import { FC } from "react";
import styled from "styled-components";

const Block = styled.nav`
  width: 100px;
  /* height: 100px; */
  position: fixed;
  margin-top: 25px;
  margin-left: 36px;
  background-color: #f9f9f9;
  box-shadow: 0px 0px 1px rgba(58, 58, 58, 0.25);
  border-radius: 3px;
  z-index: 50;
  border: 1px solid rgba(88, 88, 88, 0.103);

  > a {
    display: block;
    font-size: 14px;
    color: #303030;
    padding: 5px;
    text-decoration: none;
    text-align: center;
    border-top: 1px solid rgba(136, 136, 136, 0.103);
  }

  > a:hover {
    background-color: #e0e0e0;
  }
`;

const ThreeDot: FC = () => {
  return (
    <Block id="ThreeDot">
      <a href="#">스케줄</a>
      <a href="/group/member">멤버관리</a>
      <a href="/group/info">기본정보</a>
      <a href="#">근무조건</a>
    </Block>
  );
};

export default ThreeDot;