import { FC } from "react";
import styled from "styled-components";
import { hideMobileCss, mediaQuery } from "../GlobalStyle";

const Block = styled.nav`
  width: 175px;
  border-right: 1px solid rgba(0, 0, 0, 0.25);
  text-align: center;

  ${mediaQuery.mobile} {
    width: 0px;

    &.open {
      display: block;
      background-color: #000;
      z-index: 10;
      width: 152px;
      position: fixed;
      top: 58px;
      bottom: 0;
      right: 0;

      > a {
        color: #fff;
        font-weight: 700;
      }
    }
  }

  ${hideMobileCss(true)}

  > a {
    display: block;
    font-size: 23px;
    color: #676767;
    margin-top: 15px;
    text-decoration: none;
  }
`;

const Sidebar: FC = () => {
  return (
    <Block id="sidebar">
      <a href="#">Home</a>
      <a href="#">Group</a>
      <a href="#">Schedule</a>
      <a href="#">Mypage</a>
    </Block>
  );
};

export default Sidebar;
