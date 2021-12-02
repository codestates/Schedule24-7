import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AddBtn, BoxHeader, BoxSection } from "../../style/theme";
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

export const DivWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0.1rem;
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
        <span>스케쥴추가</span>
      </BoxHeader>
      <AddScheduleWrapper>
        <DivWrapper>
          <div>이름설정</div>
          <MultiColumnSelectBox options={selectBoxOptions} />
          <input type="text" />
        </DivWrapper>
        <DivWrapper>
          <div>그룹선택</div>
          <select>
            <option>당직1팀</option>
            <option>당직2팀</option>
            <option>당직3팀</option>
          </select>
        </DivWrapper>
        <DivWrapper>
          <div>날짜선택</div>
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
      </AddScheduleWrapper>
    </BoxSection>
  );
}
