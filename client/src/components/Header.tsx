import { FC, useCallback } from "react";
import styled from "styled-components";
import { DefaultLayout, hideMobileCss, mediaQuery } from "../GlobalStyle";

const Block = styled.header`
  background-color: #3c3c3c;
  width: 100%;
  z-index:15;

  ${mediaQuery.mobile} {
    background-color: #000;
  }
`

const PaddingLayout = styled(DefaultLayout)`
  padding: 0 25px;
  height: 69px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* @media (max-width: 768px) */
  ${mediaQuery.mobile} {
    padding: 0 10px;
    height: 58px;
  }
`;

const HeaderLeft = styled.div``;
const HeaderRight = styled.div``;
const HeaderCenter = styled.div``;
const PageTitle = styled.h1`
  color: #fff;
  font-size: 22px;
`;

const PageName = styled.span`
  font-weight: 700;
  font-size: 24px;
  color: #fff;

  ${hideMobileCss(true)}
`;
const UserInfoWrap = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
  span {
    margin-left: 13px;
    font-size: 20px;
    color: #fff;
    font-weight: 700;
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
  padding: 3px;
  width: 51px;
  height: 39px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  > div {
    background-color: #fff;
    border-radius: 100px;
    width: 100%;
    height: 7px;
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
      <PaddingLayout>
        <HeaderLeft>
          <LogoWrapper />
          <PageName>Schedule24/7</PageName>
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
      </PaddingLayout>
    </Block>
  );
};

export default Header;
