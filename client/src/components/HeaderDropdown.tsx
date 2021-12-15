import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import { logoutChange } from "../redux/actions/loginActions";

const Block = styled.nav`
  width: 120px;
  position: fixed;
  right: 20px;
  top: 50px;
  background-color: #ffffff;
  box-shadow: 0px 0px 3px rgba(58, 58, 58, 0.25);
  border-radius: 3px;
  z-index: 50;
  border: 1px solid rgb(212, 212, 212);

  > a {
    height: 19px;
    display: block;
    font-size: 14px;
    color: #303030;
    padding: 10px;
    text-decoration: none;
    text-align: center;
    border-bottom: 1px solid rgb(212, 212, 212);
  }

  > a:hover {
    background-color: #ebebeb;
  }
`;

export const MenuText = styled.div`
  height: 19px;
  font-size: 14px;
  color: #303030;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid rgb(212, 212, 212);

  :hover {
    background-color: #e0e0e0;
  }
`;

const HeaderDropdown: FC = ({}: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //불러온 유저정보 저장
  const [userInfo, setUserInfo] = useState<string>("");

  //유저정보 불러옴
  useEffect(() => {
    axios
      .get("https://server.schedule24-7.link/users", {
        headers: {
          authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (
          window.localStorage.getItem("test") !== "true" &&
          res.data.user.tokenType === "jwt"
        ) {
          setUserInfo(res.data.user.userId);
        } else {
          setUserInfo(res.data.user.userName);
        }

        // window.localStorage.setItem("id", userInfo.userId);
      });
  }, [dispatch]);

  //로그아웃 실행함수
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("id");
    window.localStorage.removeItem("test");
    dispatch(logoutChange());
    navigate("/");
  };

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
    <Block id="ThreeDot">
      <Link to="/">{userInfo}</Link>
      <MenuText onClick={goMyPage}>마이페이지</MenuText>
      <MenuText onClick={handleLogout}>로그아웃</MenuText>
    </Block>
  );
};

export default HeaderDropdown;
