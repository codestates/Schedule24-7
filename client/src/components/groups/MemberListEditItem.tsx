import { FC, useState, useCallback } from "react";
import styled from "styled-components";
import { DefaultLayout, hideMobileCss, mediaQuery } from "../../GlobalStyle";
import SmallButton from "./SmallButton";

const Block = styled.div`
  position: absolute;
  width: 330px;
  height: 190px;
  margin-top: 60px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;

  &.edit {
    display: none !important;
  }
`;

const DescBlock = styled.div`
  display: flex;
  margin-top: 20px;
  margin-left: 20px;

  > #membertitle {
    display: flex;
    font-size: 12px;
    justify-content: flex-end;
    align-items: flex-end;
    font-style: bold;
    width: 60px;
  }
  > #membervalue {
    margin-left: 50px;
    display: flex;
    font-size: 22px;
    justify-content: flex-start;
    align-items: flex-end;
    font-style: bold;
    width: 200px;
  }

  &.button {
    margin-top: 30px;
    margin-right: 20px;
    justify-content: space-between;
  }
`;

const EditBlock = styled.div`
  position: absolute;
  width: 330px;
  height: 190px;
  margin-top: 60px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;

  &.edit {
    display: none !important;
  }
`;

interface Props {
  name: string;
  position: string;
  vacation: string;
}

const MemberListEditItem: FC<Props> = ({name, position, vacation}) => {
  const [isEdit, setIsEdit] = useState(false);
  const handleButton = () => {
    setIsEdit(true);
  };
  const handleCancleButton = () => {
    setIsEdit(false);
  };

  return (
    <>
      <Block className={isEdit ? "edit" : ""}>
        <DescBlock>
          <div id="membertitle">이름</div>
          <div id="membervalue">{name} </div>
        </DescBlock>
        <DescBlock>
          <div id="membertitle">직급</div>
          <div id="membervalue">{position}</div>
        </DescBlock>
        <DescBlock>
          <div id="membertitle">휴가예정일</div>
          <div id="membervalue">{vacation}</div>
        </DescBlock>
        <DescBlock className="button">
          <SmallButton title={"수정"} onClick={handleButton} color={"black"} />
          <SmallButton title={"삭제"} onClick={handleButton} color={"red"} />
        </DescBlock>
      </Block>
      <EditBlock className={isEdit ? "" : "edit"}>
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
            title={"수정 완료"}
            onClick={handleButton}
            color={"black"}
          />
          <SmallButton
            title={"수정 취소"}
            onClick={handleCancleButton}
            color={"grey"}
          />
        </DescBlock>
      </EditBlock>
    </>
  );
};

export default MemberListEditItem;
