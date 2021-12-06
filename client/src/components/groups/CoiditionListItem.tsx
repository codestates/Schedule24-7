import { FC, useState, useCallback } from "react";
import styled from "styled-components";
import { DefaultLayout, hideMobileCss, mediaQuery } from "../../GlobalStyle";
import ConditionListEditItem from "./ConditionListEditItem";

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




const CoiditionListItem: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleIsOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [])
 
  return (
    <>
      <Block
       className= {isOpen ? "open" : ""}
      >
        <div className="name">주 연속 3번 N 불가</div>
        <div className="position">1주에 한명이 연속으로 3번 나이트 근무 불가</div>
          <VsibleWrapper onClick={toggleIsOpen}>
          <div
           className= {isOpen ? "open" : ""}
          />
        </VsibleWrapper>
        <div className={isOpen ? "open" : "close"}>
          <ConditionListEditItem />
        </div>
      </Block>
    </>
   

  );
};

export default CoiditionListItem;