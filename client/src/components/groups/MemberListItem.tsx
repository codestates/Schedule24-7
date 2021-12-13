import { FC, useState, useCallback } from "react";
import styled from "styled-components";
import { DefaultLayout, hideMobileCss, mediaQuery } from "../../GlobalStyle";
import MemberListEditItem from "./MemberListEditItem";

const Block = styled.div`
  width: 310px;
  left: 10px;
  top: 160px;
  background-color: #ffffff;
  box-shadow: 3px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  border: 0.01rem solid rgba(0, 0, 0, 0.15);
  margin: 5px;
  padding: 5px 0;

  div.name {
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
  }

  div.position {
    margin-top: 3px;
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 14px;
  }

  &.open {
    width: 310px;
    background: #ffffff;
    box-shadow: 3px rgba(0, 0, 0, 0.25);
    border-radius: 0.5rem;
  }

  div.header {
    padding: 0 40px;
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  div.close {
    display: none;
  }
`;

const VsibleWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  div:nth-child(1) {
    margin-left: 5px;
    width: 20px;
    height: 20px;
    background-color: #323131;
    clip-path: polygon(50% 0%, 100% 50%, 90% 60%, 50% 20%, 10% 60%, 0% 50%);

    &.open {
      clip-path: polygon(50% 80%, 90% 40%, 100% 50%, 50% 100%, 0 50%, 10% 40%);
    }
  }
`;

interface Props {
  name: string;
  position: string;
  vacation: string[];
  memberId: number;
}

const MemberListItem: FC<Props> = ({ name, position, vacation, memberId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const vacationString = vacation.join("\n");

  return (
    <>
      <Block className={isOpen ? "open" : ""}>
        <div className="header">
          <div>
            <div className="name">{name}</div>
            <div className="position">{position}</div>
          </div>
          <VsibleWrapper onClick={toggleIsOpen}>
            <div className={isOpen ? "open" : ""} />
          </VsibleWrapper>
        </div>
        <div className={isOpen ? "open" : "close"}>
          <MemberListEditItem
            name={name}
            position={position}
            vacation={vacationString}
            memberId={memberId}
          />
        </div>
      </Block>
    </>
  );
};

export default MemberListItem;
