import { FC, useState, useCallback,useEffect } from "react";
import styled from "styled-components";
import { DefaultLayout, hideMobileCss, mediaQuery } from "../../GlobalStyle";
import ConditionListEditItem from "./ConditionListEditItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { useParams } from "react-router";
import { getGroups } from "../../redux/actions/Group";
import { getGroupsApi } from "../../lib/api/group";

const Block = styled.div`
  width: 370px;
  height: 70px;
  left: 10px;
  top: 160px;
  background: #FFFFFF;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  margin: 10px;

  div.name {
  position: absolute;
  margin-top: 17px;
  margin-left: 35px;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  }

  div.position {
  position: absolute;
  margin-top: 40px;
  margin-left: 35px;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;  
  }

  &.open {
  width: 370px;
  height: 300px;
  background: #FFFFFF;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;  
  }
  
  div.close {
  display: none
  }
`;

const VsibleWrapper = styled.div`
  position: absolute;
  margin-top: 30px;
  margin-left: 315px;
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
  conditionName: string,
  conditionDesc: string,
  target: string,
  cycle: string,
  workId: number,
  operation: string,
  value: number
  conditionId: number;
}


const CoiditionListItem: FC<Props> = (
 {conditionName, conditionDesc, target, cycle, workId, operation, value, conditionId }
) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleIsOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [])
 
  const groups = useSelector((store: RootState) => store.group.groups);
  const { groupId } = useParams();
  const selectGroup = groups.find((item) => item._id === groupId);
  console.log(selectGroup, 1)
  
  return (
    <>
      <Block
       className= {isOpen ? "open" : ""}
      >
        <div className="name">{conditionName}</div>
        <div className="position">{conditionDesc}</div>
          <VsibleWrapper onClick={toggleIsOpen}>
          <div
           className= {isOpen ? "open" : ""}
          />
        </VsibleWrapper>
        <div className={isOpen ? "open" : "close"}>
          <ConditionListEditItem
            target={target}
            cycle={cycle}
            workId={workId}
            operation={operation}
            value={value}
            conditionId={conditionId}
          />
        </div>
      </Block>
    </>
   

  );
};

export default CoiditionListItem;