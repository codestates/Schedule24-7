import { FC, useCallback } from "react";
import styled from "styled-components";
import { DefaultLayout, hideMobileCss, mediaQuery } from "../../GlobalStyle";
import { useState } from "react";
import ThreeDot from "../ThreeDot";

const Block = styled.div`
  padding: 13px;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  position: relative;
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-weight: 700;
    font-size: 20px;
  }
`;
const ContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  h4 {
    font-weight: 700;
    font-size: 20px;
    color: #000000;
    margin: 0;
  }
  p {
    margin: 0;
    margin-top: 8px;
    font-weight: 400;
    font-size: 12px;
    color: #9d9b9b;
  }
`;
const ToggleMenu = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  > div {
    border-radius: 50%;
    width: 6px;
    height: 6px;
    background-color: #000000;
  }
  > div + div {
    margin-top: 2px;
  }
`;



const GroupListItem: FC<Group.GroupListItemProps> = ({
  emoji,
  groupDesc,
  groupName,
}) => {
  const [openThreeDot, setOpenThreeDot] = useState(false);
  const handleOpenThreeDot = () => {
    setOpenThreeDot(true)
  }
  const handleCloseThreeDot = () => {
    return (openThreeDot ? setOpenThreeDot(false) : null)
  }
  
  return (
    <Block onClick={handleCloseThreeDot}>
      <MenuWrapper>
        <span>{emoji}</span>
        <ToggleMenu onClick={handleOpenThreeDot} >
          <div />
          <div />
          <div />
        </ToggleMenu>
      </MenuWrapper>
        {openThreeDot ? <ThreeDot /> : null }
      <ContentWrapper>
        <h4>{groupName}</h4>
        <p>{groupDesc}</p>
      </ContentWrapper>
    </Block>
  );
};

export default GroupListItem;