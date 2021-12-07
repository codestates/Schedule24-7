import { FC } from "react";
import styled from "styled-components";
import { hideMobileCss, mediaQuery } from "../GlobalStyle";
import { Link } from "react-router-dom";

const Block = styled.nav`
  padding-top: 0.5rem;
  border-right: 1px solid rgba(0, 0, 0, 0.25);
  height: 95%;
  width: 140px;
  text-align: center;
  margin: 0px;

  ${mediaQuery.mobile} {
    width: 0px;

    &.open {
      display: block;
      background-color: #3c3c3c;
      z-index: 10;
      width: 140px;
      height: 100%;
      position: fixed;
      top: 58px;
      bottom: 0;
      right: 0;

      > a {
        color: #fff;
        font-weight: 16px;
      }
    }
  }

  ${hideMobileCss(true)}

  > a {
    display: block;
    font-size: 15px;
    color: #6d6d6d;
    text-decoration: none;
    padding: 0.7rem;
  }
  > a:hover {
    /* color: #2f5fd7; */
    color: #252525;
    background-color: #ddeef8;
  }
`;

const Sidebar: FC = () => {
  return (
    <Block id="sidebar">
      <Link to="/">Home</Link>
      <Link to="/group">Group</Link>
      <Link to="/schedule">Schedule</Link>
      <Link to="/mypage">Mypage</Link>
    </Block>
  );
};

export default Sidebar;
