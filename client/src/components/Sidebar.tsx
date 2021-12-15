import { FC } from "react";
import styled from "styled-components";
import { hideMobileCss, mediaQuery } from "../GlobalStyle";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

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
    cursor: pointer;
  }
  > a:hover {
    /* color: #2f5fd7; */
    color: #252525;
    background-color: #ddeef8;
  }
`;

const Sidebar: FC = () => {
  const navigate = useNavigate();

  //마이페이지 진입 시 필터링
  const goMyPage = () => {
    if (window.localStorage.getItem("test") === "true") {
      swal({
        text: "체험계정은 마이페이지를 조회할 수 없습니다. \n\n회원가입 후 이용해주세요!",
        icon: "error",
      });
    } else {
      navigate("/mypage");
    }
  };

  return (
    <Block id="sidebar">
      <Link to="/">Home</Link>
      <Link to="/group">Group</Link>
      <Link to="/schedule">Schedule</Link>
      <a onClick={goMyPage}>Mypage</a>
    </Block>
  );
};

export default Sidebar;
