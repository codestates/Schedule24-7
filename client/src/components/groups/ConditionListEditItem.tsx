import { FC, useState, useCallback } from "react";
import styled from "styled-components";
import { DefaultLayout, hideMobileCss, mediaQuery } from "../../GlobalStyle";
import SmallButton from "./SmallButton";

const Block = styled.div`
  position: absolute;
  width: 330px;
  height: 190px;
  margin-top: 70px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;

  &.edit {
    display: none; !important
  }
`;

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
  width: 330px;
  height: 350px;
  margin-top: 70px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;

  &.edit {
  display: none; !important
  }
`;

const MemberListEditItem: FC = () => {
  const [isEdit, setIsEdit] = useState(false)
  const handleButton = () => {
    setIsEdit(true)
  }
   const handleCancleButton = () => {
    setIsEdit(false)
  }
 
  return (
    <>
      <Block className={isEdit ? "edit" : ""}>
        <DescBlock>        
          <div id="conditiontitle">대상</div>
          <div id="conditionvalue">모든 인원 </div>
        </DescBlock>
        <DescBlock>            
          <div id="conditiontitle">주기</div>
          <div id="conditionvalue">주간</div>
        </DescBlock>
        <DescBlock>            
          <div id="conditiontitle">대상근무</div>
          <div id="conditionvalue">N</div>
        </DescBlock>
        <DescBlock>            
          <div id="conditiontitle">연산자</div>
          <div id="conditionvalue"> + </div>
        </DescBlock>
        <DescBlock>            
          <div id="conditiontitle">값</div>
          <div id="conditionvalue">3</div>
        </DescBlock>
        <DescBlock className="button">        
          <SmallButton
          title={"수정"}
          onClick={handleButton}
          color={"black"}
          />
          <SmallButton
          title={"저장"}
          onClick={handleButton}
          color={"red"}
          />
        </DescBlock>          
      </Block>
      <EditBlock className={isEdit ? "" : "edit" }>
        <DescBlock>        
          <div id="conditiontitle">대상</div>
          <input id="conditionvalue"/>
        </DescBlock>
        <DescBlock>            
          <div id="conditiontitle">주기</div>
          <input id="conditionvalue" />
        </DescBlock>
        <DescBlock>            
          <div id="conditiontitle">대상근무</div>
          <input id="conditionvalue" />
        </DescBlock>
        <DescBlock>            
          <div id="conditiontitle">연산자</div>
          <input id="conditionvalue" />
        </DescBlock>
        <DescBlock>            
          <div id="conditiontitle">값</div>
          <input id="conditionvalue" />
        </DescBlock>
        <DescBlock className="button">        
          <SmallButton
          title={"수정"}
          onClick={handleButton}
          color={"black"}
          />
          <SmallButton
          title={"수정 취소"}
          onClick={handleCancleButton}
          color={"grey"}
          />
        </DescBlock>          
      </EditBlock >
    </>
   

  );
};

export default MemberListEditItem;