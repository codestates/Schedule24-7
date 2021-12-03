import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { BoxHeader, BoxSection } from "../../style/theme";
import DatePicker from "react-datepicker";
import "./react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import MultiColumnSelectBox from "../MultiColumnSelectBox";
import { selectBoxOptions } from "./ScheduleDummy";

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
  width: 235px;
  height: 42px;
  padding-left: 10px;
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  margin: 0.2rem;
  background-color: white;
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

export const AddBtn = styled.button`
  width: 300px;
  height: 40px;
  color: white;
  box-shadow: 0.05rem 0.05rem 0.05rem #696969;
  border: 0px solid #a5a5a5;
  cursor: pointer;
  margin: 0.5rem;
  background-color: #5c5c5c;
`;

export default function AddSchedule() {
  const [startDate, setStartDate] = useState<any>(new Date());
  const handleAddSchedule = (): void => {
    return;
  };
  //스케쥴 생성 함수(만들예정)
  //   const state = useSelector((state)=>{})

  return (
    <BoxSection>
      <BoxHeader>
        <span>신규스케쥴생성</span>
      </BoxHeader>
      <AddScheduleWrapper>
        <AddDiv>
          <DivWrapper>
            <TitleHeader>신규스케쥴 생성 설정</TitleHeader>
          </DivWrapper>
          <DivWrapper>
            <Title>이름설정</Title>
            <div>
              <MultiColumnSelectBox options={selectBoxOptions} />
              <NameBox type="text" placeholder="스케쥴 이름 입력" />
            </div>
          </DivWrapper>
          <DivWrapper>
            <Title>그룹선택</Title>
            <TeamSelect>
              <option>당직1팀</option>
              <option>당직2팀</option>
              <option>당직3팀</option>
            </TeamSelect>
          </DivWrapper>
          <DivWrapper>
            <Title>날짜선택</Title>
            <DatePicker
              locale={ko}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              showFullMonthYearPicker
            />
          </DivWrapper>
          <AddBtn onClick={handleAddSchedule}>스케쥴생성</AddBtn>
        </AddDiv>
      </AddScheduleWrapper>
    </BoxSection>
  );
}
