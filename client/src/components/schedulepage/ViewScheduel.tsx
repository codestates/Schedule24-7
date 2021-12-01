import { useState } from "react";
import styled from "styled-components";
import Calendar from "./CalendarGenerator";
import { dayArr, numArr, ScheduleDummy } from "./ScheduleDummy";
import ScheduleItem from "./ScheduleItem";
import TableHeader from "./TableHeader";
import moment, { Moment as MomentTypes } from "moment";
import { useEffect } from "react";

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

export const ScheduleTable = styled.div`
  display: grid;
  height: 60vh;
  justify-content: center;
  margin: 1.5rem;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 0.2fr 1fr 1fr 1fr 1fr 1fr;
  /* grid-template-columns: repeat(7, minmax(auto, auto)); */
  /* grid-template-rows: repeat(6, minmax(1rem, auto)); */
`;

export default function ViewSchedule() {
  const [currentDate, setCurrentDate] = useState(() =>
    moment().format("YYYY-MM-DD")
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
    <div>
      <TableTopWrapper>
        <select onChange={handleCurrentDate}>
          <option value={moment().format("YYYY-MM-DD")}>
            날짜를 선택하세요
          </option>
          {ScheduleDummy.map((el, idx) => {
            return (
              <option key={idx} value={el.period}>
                {el.scheduleName}
              </option>
            );
          })}
        </select>
        <DateWrapper>
          <span>{currentDate.split("-")[0]}년</span>
          <span>{currentDate.split("-")[1]}월</span>
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
    </div>
  );
}

{
  /* <ScheduleTable>
{dayArr.map((el, idx) => {
  return <TableHeader key={idx} DayHeader={el} />;
})}
{numArr.map((el, idx) => {
  return <ScheduleItem key={idx} DayNum={el} />;
})}
{ScheduleDummy[0].contents.map((el, idx) => {
  return <ScheduleItem key={idx} Schedule={el} />;
})}
</ScheduleTable> */
}
