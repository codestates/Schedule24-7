import { FC } from "react";
import styled from "styled-components";
import { DefaultLayout, hideMobileCss, mediaQuery } from "../../GlobalStyle";
import { Link } from "react-router-dom";

const Block = styled.div`
  display: flex;
  align-items: center;
  padding: 11px 6px;
  justify-content: center;

  a {
    display: flex;
    color: #303030;
    text-align: center;
    width: 80px;
    height: 40px;
    left: 24px;
    top: 10.5px;
    background-color: #ffffff;
    box-shadow: 3px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    border: 0.01rem solid rgba(0, 0, 0, 0.15);
    justify-content: center;
    align-items: center;
    text-decoration: none;
    margin: 1px;
  }
  a.active {
    background-color: #8a8a8a;
    color: white;
  }
`;

interface Props {
  id: string;
  activeIdx: number;
}

const GroupSelectBar: FC<Props> = ({ id, activeIdx }) => {
  return (
    <>
      <Block>
        <Link
          className={activeIdx === 0 ? "active" : ""}
          to={`/group/${id}/schedule`}
        >
          스케줄
        </Link>
        <Link
          className={activeIdx === 1 ? "active" : ""}
          to={`/group/${id}/member`}
        >
          멤버관리
        </Link>
        <Link
          className={activeIdx === 2 ? "active" : ""}
          to={`/group/${id}/info`}
        >
          기본정보
        </Link>
        <Link
          className={activeIdx === 3 ? "active" : ""}
          to={`/group/${id}/condition`}
        >
          근무조건
        </Link>
      </Block>
    </>
  );
};

export default GroupSelectBar;
