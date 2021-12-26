import { FC, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BackGround } from "../../style/theme";
import ThreeDot from "../ThreeDot";

export const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 8rem;
  height: 8rem;
  border: 1px solid #e4e4e4;
  box-shadow: 0px 0px 7px #7070706c;
  border-radius: 15px;
  background-color: white;
  margin: 0.5rem;
  padding: 7px 10px 7px 10px;

  a {
    text-decoration: none;
  }
  a:visited {
    text-decoration: none;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 auto;
  padding-bottom: 15px;
`;

export const Div1 = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

export const SubDiv1 = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const SubDiv2 = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const Div2 = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: black;
  word-break: break-all;
  cursor: pointer;
`;

export const Div3 = styled.div`
  font-size: 13px;
  font-weight: 300;
  margin-top: 2px;
  word-break: break-all;
`;
const ToggleMenu = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  > div {
    border-radius: 50%;
    width: 4px;
    height: 4px;
    background-color: #000000;
  }
  > div + div {
    margin-top: 2px;
  }
`;

interface Props {
  emoji: string;
  desc: string;
  name: string;
  id: string;
}
const GroupListItem: FC<Props> = ({ emoji, desc, name, id }) => {
  const [openThreeDot, setOpenThreeDot] = useState(false);
  const handleOpenThreeDot = () => {
    setOpenThreeDot(true);
  };
  const handleCloseThreeDot = () => {
    return openThreeDot ? setOpenThreeDot(false) : null;
  };

  return (
    <MainDiv onClick={handleCloseThreeDot}>
      <Div1>
        <SubDiv1>{emoji}</SubDiv1>
        <SubDiv2>
          <ToggleMenu onClick={handleOpenThreeDot}>
            <div />
            <div />
            <div />
          </ToggleMenu>
        </SubDiv2>
        {openThreeDot ? (
          <>
            <ThreeDot id={id} />{" "}
            <BackGround onClick={handleCloseThreeDot}></BackGround>{" "}
          </>
        ) : (
          ""
        )}
      </Div1>
      <TitleWrapper>
        <Link to={`/group/${id}/schedule`}>
          <Div2>{name}</Div2>
        </Link>
        <Div3>{desc}</Div3>
      </TitleWrapper>
    </MainDiv>
  );
};

export default GroupListItem;
