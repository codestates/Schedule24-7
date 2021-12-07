import { FC, useState, useCallback } from "react";
import styled from "styled-components";
import { DefaultLayout, hideMobileCss, mediaQuery } from "../../GlobalStyle";
import SmallButton from "./SmallButton";

const DescBlock = styled.div`
  display: flex;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  border-bottom: 1px solid rgba(170, 170, 170, 0.21);
  padding: 1px;

  > #conditiontitle {
  display: flex;
  font-size: 16px;
  line-height: 20px;
  justify-content: flex-end;
  align-items: flex-end;
  font-style: bold;
  width: 60px;
  }

  > #conditionvalue {
  margin-left: 40px;
  display: flex;
  font-size: 16px;
  justify-content: flex-start;
  align-items: flex-end;
  font-style: bold;
  width: 200px;
  }

  &.button {
  margin-top: 15px;
  margin-right: 20px;
  justify-content: space-between;
  border-style: none;
  }
`

const EditBlock = styled.div`
  position: absolute;
  width: 370px;
  height: 250px;
  margin-top: 70px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
   background: #FFFFFF;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  justify-content: center;
`;

const AddMemberList: FC = () => {
  const [isEdit, setIsEdit] = useState(false)
  const handleButton = () => {
    setIsEdit(true)
  }
   const handleCancleButton = () => {
    setIsEdit(false)
  }
 
  return (
    <>
      <EditBlock>
        <DescBlock>
          <div id="membertitle">이름</div>
          <input id="membervalue" placeholder="이름을 입력해주세요" />
        </DescBlock>
        <DescBlock>
          <div id="membertitle">직급</div>
          <input id="membervalue" placeholder="직급을 입력해주세요" />
        </DescBlock>
        <DescBlock>
          <div id="membertitle">휴가예정일</div>
          <input id="membervalue" placeholder="내용을 입력해주세요" />
        </DescBlock>
        <DescBlock className="button">
          <SmallButton
            title={"저장"}
            onClick={handleButton}
            color={"black"}
          />
          <SmallButton
            title={"취소"}
            onClick={handleCancleButton}
            color={"grey"}
          />
        </DescBlock>      
      </EditBlock >
    </>
   

  );
};

export default AddMemberList;