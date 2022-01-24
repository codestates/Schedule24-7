import { useState } from "react";
import styled from "styled-components";
import { selectBoxOptions } from "./ScheduleDummy";
import EmojiBox from "./EmojiBox";
import { useEffect } from "react";
import { mediaQuery } from "../../GlobalStyle";

export const AddScheduleWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;
`;

export const AddDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  width: 450px;
  height: 450px;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #cacacac0;
  box-shadow: 1px 1px 1px #cacaca57;
`;

export const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
`;

export const TitleHeader = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

export const NameBox = styled.input`
  width: 231px;
  height: 40px;
  padding-left: 10px;
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  margin-left: 2px;
  background-color: white;

  ${mediaQuery.mobile} {
    max-width: 201px;
  }
`;

export const TeamSelect = styled.select`
  width: 300px;
  height: 45px;
  padding-left: 10px;
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  margin: 0.2rem;
  background-color: white;
`;

export const AddBtnWrapper = styled.button`
  display: flex;
  border: none;
  background-color: #f9f9f9;
`;

export const AddBtn = styled.button`
  width: 142px;
  height: 40px;
  color: white;
  box-shadow: 0.05rem 0.05rem 0.05rem #696969;
  border: 0px solid #a5a5a5;
  cursor: pointer;
  margin: 0.5rem;
  background-color: #5c5c5c;

  &.delete {
    background-color: #b60000;
  }
  &.edit {
    width: 300px;
  }
`;

export const Div1 = styled.div`
  display: flex;
  align-items: center;
`;

export default function ScheduleInfoEdit({
  scheduleInfo,
  handleTextInfo,
  handleEmoji,
  setScheduleInfo,
}: scheduleInfoTypes) {
  const [startDate, setStartDate] = useState<any>(new Date());

  useEffect(() => {
    let newDate = new Date(startDate);
    let result = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-01`;
    setScheduleInfo({ ...scheduleInfo, period: result });
  }, [startDate]);

  return (
    <>
      {console.log(scheduleInfo)}
      <DivWrapper>
        <TitleHeader>스케줄 정보</TitleHeader>
      </DivWrapper>
      <DivWrapper>
        <Title>스케줄 이름</Title>
        <Div1>
          <EmojiBox options={selectBoxOptions} handleEmoji={handleEmoji} />
          <NameBox
            type="text"
            onChange={handleTextInfo("scheduleName")}
            placeholder="수정할 스케줄 이름 입력"
          />
        </Div1>
      </DivWrapper>
    </>
  );
}
