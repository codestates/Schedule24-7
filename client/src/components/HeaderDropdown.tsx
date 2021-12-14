import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
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
  const [userInfo, setUserInfo] = useState<any>({
    userId: "",
    userName: "",
    email: "",
    tokenType: "",
  });

  //유저정보 불러옴
  useEffect(() => {
    axios
      .get("https://server.schedule24-7.link/users", {
        headers: {
          authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUserInfo({
          ...userInfo,
          userId: res.data.user.userId,
          userName: res.data.user.userName,
          email: res.data.user.email,
        });
        window.localStorage.setItem("id", userInfo.userId);
      });
  }, [dispatch]);

  //로그아웃 실행함수
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("id");
    dispatch(logoutChange());
    navigate("/");
  };

  return (
    <Block id="ThreeDot">
      <Link to="/">{userInfo.userId}</Link>
      <Link to="/mypage">마이페이지</Link>
      <MenuText onClick={handleLogout}>로그아웃</MenuText>
    </Block>
  );
};

export default HeaderDropdown;
