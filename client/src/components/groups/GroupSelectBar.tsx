import { FC } from "react";
import styled from "styled-components";
import { DefaultLayout, hideMobileCss, mediaQuery } from "../../GlobalStyle";
import { Link } from "react-router-dom";

const Block = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 11px 6px;

  a {
    display: block;
    color: #303030;
    text-align: center;
    width: 80px;
    height: 45px;
    left: 24px;
    top: 10.5px;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    line-height: 50px;
    text-decoration: none;
  }
`;

interface Props {
  id: string;
}

const GroupSelectBar: FC<Props> = ({ id }) => {
  return (
    <>
      <Block>
        <Link to="#">스케줄</Link>
        <Link to={`/group/${id}/member`}>멤버관리</Link>
        <Link to={`/group/${id}/info`}>기본정보</Link>
        <Link to={`/group/${id}/condition`}>근무조건</Link>
      </Block>
    </>
  );
};

export default GroupSelectBar;
