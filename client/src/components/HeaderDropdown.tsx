import { FC } from "react";
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
    border-top: 1px solid rgb(212, 212, 212);
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

  :hover {
    background-color: #e0e0e0;
  }
`;

const HeaderDropdown: FC = () => {
  const navigate = useNavigate();
  const dipatch = useDispatch();
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("password");
    dipatch(logoutChange());
    navigate("/");
  };

  return (
    <Block id="ThreeDot">
      <MenuText onClick={handleLogout}>로그아웃</MenuText>
      <Link to="/mypage">마이페이지</Link>
    </Block>
  );
};

export default HeaderDropdown;
