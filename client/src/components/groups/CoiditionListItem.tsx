import { FC, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { DefaultLayout, hideMobileCss, mediaQuery } from "../../GlobalStyle";
import ConditionListEditItem from "./ConditionListEditItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { useParams } from "react-router";
import { getGroups } from "../../redux/actions/Group";
import { getGroupsApi } from "../../lib/api/group";

const Block = styled.div`
  width: 310px;
  left: 10px;
  top: 160px;
  background-color: #ffffff;
  box-shadow: 0px 0px 7px #7070706c;
  border-radius: 15px;
  border: 1px solid #e4e4e4;
  margin: 0.5rem;
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
    border-radius: 0.5rem;
    box-shadow: 3px rgba(0, 0, 0, 0.25);
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
  conditionName: string;
  conditionDesc: string;
  target: string;
  cycle: string;
  workId: number;
  operation: string;
  value: number;
  conditionId: number;
  workName: string;
}

const CoiditionListItem: FC<Props> = ({
  conditionName,
  conditionDesc,
  target,
  cycle,
  workId,
  operation,
  value,
  conditionId,
  workName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const groups = useSelector((store: RootState) => store.group.groups);
  const { groupId } = useParams();
  const selectGroup = groups.find((item) => item._id === groupId);

  return (
    <>
      <Block className={isOpen ? "open" : ""}>
        <div className="header">
          <div>
            <div className="name">{conditionName}</div>
            <div className="position">{conditionDesc}</div>
          </div>
          <VsibleWrapper onClick={toggleIsOpen}>
            <div className={isOpen ? "open" : ""} />
          </VsibleWrapper>
        </div>
        <div className={isOpen ? "open" : "close"}>
          <ConditionListEditItem
            target={target}
            cycle={cycle}
            workId={workId}
            operation={operation}
            value={value}
            conditionId={conditionId}
            workName={workName}
          />
        </div>
      </Block>
    </>
  );
};

export default CoiditionListItem;
