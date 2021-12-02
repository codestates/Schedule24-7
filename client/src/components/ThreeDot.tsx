import { FC } from "react";
import styled from "styled-components";

const Block = styled.nav`
  width: 100px;
  height: 100px;
  position: relative;
  background-color: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  z-index: 50;
  border-right: 1px solid rgba(0, 0, 0, 0.25);

> a {
  display: block;
  font-size: 15px;
  color: #676767;
  margin-top: 8px;
  text-decoration: none;
  text-align: center;
}
`

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