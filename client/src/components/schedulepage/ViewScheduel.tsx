import { useState } from "react";
import styled from "styled-components";
import Calendar from "./CalendarGenerator";
import { dayArr, ScheduleDummy } from "./ScheduleDummy";
import ScheduleItem from "./ScheduleItem";
import TableHeader from "./TableHeader";
import moment from "moment";

export const ViewScheduleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
`;

export const TableTopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DateWrapper = styled.div`
  width: 80vw;
  display: flex;
  justify-content: center;
`;

export const SelectBox = styled.select`
  border-radius: 0.4rem;
  width: 135px;
  height: 30px;
  color: #3b3b3b;
  border: 0.1px solid #858585;
  cursor: grab;
`;

export const YearMonth = styled.span`
  font-size: 20px;
  font-weight: bold;
  margin: 5px;
`;

export const ScheduleTable = styled.div`
  display: grid;
  height: 75vh;
  justify-content: center;
  margin: 1.5rem;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 0.2fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;

export default function ViewSchedule() {
  const [currentDate, setCurrentDate] = useState(() =>
    moment().format("YYYY-MM-01")
  );
  const [currentData, setCurrentData] = useState<any[] | undefined>(undefined);

  let newDummy: any[];
  let newArr: string[] = Calendar(currentDate);

  const handleCurrentDate = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setCurrentDate(e.target.value);
    newArr = Calendar(e.target.value);
    newDummy = ScheduleDummy.filter((el) => {
      return el.period === e.target.value;
    });
    console.log(newDummy);
    setCurrentData(newDummy);
  };

  return (
    <ViewScheduleWrapper>
      <TableTopWrapper>
        <SelectBox onChange={handleCurrentDate}>
          <option value={moment().format("YYYY-MM-01")}>
            날짜를 선택하세요
          </option>
          {ScheduleDummy.map((el, idx) => {
            return (
              <option key={idx} value={el.period}>
                {el.scheduleName}
              </option>
            );
          })}
        </SelectBox>
        <DateWrapper>
          <YearMonth>{currentDate.split("-")[0]}년</YearMonth>
          <YearMonth>{currentDate.split("-")[1]}월</YearMonth>
        </DateWrapper>
      </TableTopWrapper>
      <ScheduleTable>
        {dayArr.map((el, idx) => {
          return <TableHeader key={idx} DayHeader={el} />;
        })}
        {newArr.map((el, idx) => {
          return <ScheduleItem key={idx} DayNum={el} NewDummy={currentData} />;
        })}
      </ScheduleTable>
    </ViewScheduleWrapper>
  );
}
