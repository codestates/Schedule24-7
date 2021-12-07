import { useState } from "react";
import styled from "styled-components";
import Calendar from "./CalendarGenerator";
import { dayArr, ScheduleDummy } from "./ScheduleDummy";
import ScheduleItem from "./ScheduleItem";
import TableHeader from "./TableHeader";
import moment from "moment";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import ScheduleItemColumn from "./ScheduleItemColumn";

export const ViewScheduleWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

export const ViewSelect = styled.div`
  width: 140px;
  display: flex;
  justify-content: right;
`;

export const ScheduleTable = styled.div`
  display: grid;
  height: 80vh;
  justify-content: center;
  margin: 1.5rem;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 0.2fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;

export const ScheduleColumnTable = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function ViewSchedule() {
  const [currentDate, setCurrentDate] = useState(() =>
    moment().format("YYYY-MM-01")
  );
  const [currentData, setCurrentData] = useState<any[] | undefined>(undefined);

  //보기모드 변경 상태
  const [viewMode, setViewMode] = useState(true);
  const viewState = useSelector((state: RootState) => state.scheduleReducer);

  //보기모드변경 함수
  const handleViewChange = (value: boolean): void => {
    setViewMode(value);
  };

  //최초렌더링시 실행
  useEffect(() => {
    // console.log(viewState.firstView);
    setCurrentDate(viewState.firstView);
    handleFirstRender(viewState.firstView);
  }, []);

  let newDummy: any[];
  let newArr: string[] = Calendar(currentDate);

  //드롭다운 바뀔때 캘린더 렌더하는 함수
  const handleCurrentDate = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setCurrentDate(e.target.value);
    newArr = Calendar(e.target.value);
    newDummy = viewState.data.filter((el) => {
      return el.period === e.target.value;
    });
    // console.log(newDummy);
    setCurrentData(newDummy);
  };

  //최초렌더링시 캘린더 렌더링 함수
  const handleFirstRender = (date: string): void => {
    setCurrentDate(date);
    newArr = Calendar(date);
    newDummy = viewState.data.filter((el) => {
      return el.period === date;
    });
    setCurrentData(newDummy);
  };

  return (
    <ViewScheduleWrapper>
      <TableTopWrapper>
        <SelectBox onChange={handleCurrentDate}>
          <option value={moment().format("YYYY-MM-01")}>
            스케쥴을 선택하세요
          </option>
          {viewState.data.map((el, idx) => {
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
        <ViewSelect>
          <button onClick={() => handleViewChange(true)}>목록</button>
          <button onClick={() => handleViewChange(false)}>표</button>
        </ViewSelect>
      </TableTopWrapper>
      {viewMode ? (
        <ScheduleColumnTable>
          {newArr.map((el, idx) => {
            return (
              <ScheduleItemColumn
                key={idx}
                DayNum={el}
                NewDummy={currentData}
              />
            );
          })}
        </ScheduleColumnTable>
      ) : (
        <ScheduleTable>
          {dayArr.map((el, idx) => {
            return <TableHeader key={idx} DayHeader={el} />;
          })}
          {newArr.map((el, idx) => {
            return (
              <ScheduleItem key={idx} DayNum={el} NewDummy={currentData} />
            );
          })}
        </ScheduleTable>
      )}
    </ViewScheduleWrapper>
  );
}
