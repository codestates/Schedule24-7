import { FC, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { hideMobileCss, mediaQuery } from "../GlobalStyle";
import HeaderDropdown from "./HeaderDropdown";
import moment from "moment";

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
    padding-right: 3px;
  }
`;
const HeaderCenter = styled.div`
  color: white;
  ${hideMobileCss(true)}
`;

const MobileHeaderCenter = styled.div`
  color: white;
  font-size: 13px;
  ${hideMobileCss(false)}
`;

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

const MenuWrapper = styled.div`
  width: 28px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  > div {
    background-color: #fff;
    border-radius: 100px;
    width: 100%;
    height: 4px;
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
  const [isEdit, setIsEdit] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(false);
  const handleOpenDropdown = () => {
    setOpenDropdown(true);
  };
  const handleCloseDropdown = () => {
    return openDropdown ? setOpenDropdown(false) : null;
  };

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
        {isEdit ? (
          `오늘은 ${moment().format("YYYY")}년 ${moment().format(
            "MM"
          )}월 ${moment().format("DD")}일 입니다`
        ) : title === undefined ? null : (
          <PageTitle>{title}</PageTitle>
        )}
      </HeaderCenter>
      <MobileHeaderCenter>
        {`${moment().format("YY")}년 ${moment().format(
          "MM"
        )}월 ${moment().format("DD")}일`}
      </MobileHeaderCenter>
      <HeaderRight>
        <UserInfoWrap>
          <UserImg
            onClick={handleOpenDropdown}
            alt="user-img"
            src="https://media.discordapp.net/attachments/907157959333785630/920107206064611358/noun-user-4433438_1.png"
          />
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
