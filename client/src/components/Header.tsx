import { FC, useCallback } from "react";
import styled from "styled-components";
import { DefaultLayout, hideMobileCss, mediaQuery } from "../GlobalStyle";

const Block = styled.header`
  background-color: #272727;
  width: 100%;
  padding: 0.5rem;
  height: 58px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div`
  padding-left: 1rem;
`;
const HeaderRight = styled.div`
  padding-right: 1rem;
`;
const HeaderCenter = styled.div``;
const PageTitle = styled.h1`
  color: #fff;
  font-size: 18px;
  font-weight: 400;
`;

const PageName = styled.span`
  font-weight: 700;
  font-size: 20px;
  color: #fff;

  ${hideMobileCss(true)}
`;

const UserInfoWrap = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  span {
    margin-left: 13px;
    font-size: 16px;
    color: #fff;
    font-weight: 500;
  }

  ${hideMobileCss(true, "flex")}
`;
const LogoWrapper = styled.div`
  width: 64px;
  height: 42px;
  background-color: #fff;

  ${hideMobileCss(false)}
`;
const MenuWrapper = styled.div`
  width: 40px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  > div {
    background-color: #fff;
    border-radius: 100px;
    width: 100%;
    height: 6px;
  }

  ${hideMobileCss(false, "flex")}
`;

interface Props {
  title?: string;
}

const Header: FC<Props> = ({ title }) => {
  const toggleSideBar = useCallback(() => {
    const sideBar = document.getElementById("sidebar");

    if (sideBar === null) return;
    sideBar.classList.toggle("open");
  }, []);
  return (
    <Block>
      <HeaderLeft>
        <PageName>Schedule24/7</PageName>
        <LogoWrapper />
      </HeaderLeft>
      <HeaderCenter>
        {title === undefined ? null : <PageTitle>{title}</PageTitle>}
      </HeaderCenter>
      <HeaderRight>
        <UserInfoWrap>
          <img
            alt="user-img"
            src="https://cdn-icons-png.flaticon.com/512/906/906361.png"
          />
          <span>DevUpUser01</span>
        </UserInfoWrap>
        <MenuWrapper onClick={toggleSideBar}>
          <div />
          <div />
          <div />
        </MenuWrapper>
      </HeaderRight>
    </Block>
  );
};

export default Header;
