import axios from "axios";
import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { DefaultLayout, hideMobileCss, mediaQuery } from "../GlobalStyle";
import HeaderDropdown from "./HeaderDropdown";

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
  width: 270px;
  padding-left: 1rem;
  ${mediaQuery.mobile} {
    width: 140px;
    padding-left: 5px;
  }
`;
const HeaderRight = styled.div`
  display: flex;
  justify-content: right;
  width: 115px;
  padding-right: 1rem;
  ${mediaQuery.mobile} {
    padding-right: 5px;
  }
`;
const HeaderCenter = styled.div``;
const PageTitle = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 400;

  ${mediaQuery.mobile} {
    margin-left: 0;
    font-size: 15px;
  }
`;

const HeaderLogo = styled.img`
  width: 10rem;
  ${hideMobileCss(true)}
`;

const MobileLogo = styled.img`
  width: 95px;
  ${hideMobileCss(false)}
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

export const UserId = styled.div`
  color: white;
  margin-left: 7px;
  cursor: pointer;
`;

export const BackGround = styled.div`
  background-color: rgba(0, 0, 0, 0);
  position: fixed;
  top: 0%;
  left: 0%;
  bottom: 0%;
  right: 0%;
`;

export const UserImg = styled.img`
  cursor: pointer;
`;

interface Props {
  title?: string;
}

const Header: FC<Props> = ({ title }) => {
  const dispatch = useDispatch();

  const [openDropdown, setOpenDropdown] = useState(false);
  const handleOpenDropdown = () => {
    setOpenDropdown(true);
  };
  const handleCloseDropdown = () => {
    return openDropdown ? setOpenDropdown(false) : null;
  };

  //불러온 유저정보 저장
  // const [userInfo, setUserInfo] = useState<any>({
  //   userId: "",
  //   userName: "",
  //   email: "",
  // });

  //유저정보 불러옴
  // useEffect(() => {
  //   axios
  //     .get("https://server.schedule24-7.link/users", {
  //       headers: {
  //         authorization: `Bearer ${window.localStorage.getItem("token")}`,
  //       },
  //     })
  //     .then((res) => {
  //       setUserInfo({
  //         ...userInfo,
  //         userId: res.data.user.userId,
  //         userName: res.data.user.userName,
  //         email: res.data.user.email,
  //       });
  //       window.localStorage.setItem("id", userInfo.userId);
  //     });
  // }, [dispatch]);

  const toggleSideBar = useCallback(() => {
    const sideBar = document.getElementById("sidebar");

    if (sideBar === null) return;
    sideBar.classList.toggle("open");
  }, []);
  return (
    <Block>
      <HeaderLeft>
        <Link to="/">
          <HeaderLogo src="https://media.discordapp.net/attachments/907157959333785630/916227740267581440/S247_Logoheadertitle.png" />
          <MobileLogo src="https://media.discordapp.net/attachments/907157959333785630/919775103275892747/S247_Logomobiletitle.png" />
        </Link>
      </HeaderLeft>
      <HeaderCenter>
        {title === undefined ? null : <PageTitle>{title}</PageTitle>}
      </HeaderCenter>
      <HeaderRight>
        <UserInfoWrap>
          <UserImg
            onClick={handleOpenDropdown}
            alt="user-img"
            src="https://media.discordapp.net/attachments/907157959333785630/920107206064611358/noun-user-4433438_1.png"
          />
          {/* <UserId onClick={handleOpenDropdown}>
            {window.localStorage.getItem("id")}
          </UserId> */}
          {openDropdown ? (
            <>
              <HeaderDropdown />
              <BackGround onClick={handleCloseDropdown}></BackGround>
            </>
          ) : (
            ""
          )}
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
