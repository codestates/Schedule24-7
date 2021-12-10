import { useState } from "react";
import styled from "styled-components";
import Calendar from "./CalendarGenerator";
import { dayArr, ScheduleDummy } from "./ScheduleDummy";
import ScheduleItem from "./ScheduleItem";
import TableHeader from "./TableHeader";
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SelectBox = styled.select`
  border-radius: 0.4rem;
  width: 135px;
  height: 30px;
  color: #3b3b3b;
  border: 0.1px solid #858585;
  cursor: grab;
`;

export const TableTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: 5px;
  text-align: cneter;
`;

export const SubTextWrapper = styled.div`
  display: flex;
  justify-content: ceneter;
`;

export const SubText = styled.div`
  margin-left: 5px;
  margin-right: 5px;
  text-align: cneter;
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
  const scheduleData = useSelector((state: RootState) => state.scheduleReducer);

  const [currentDate, setCurrentDate] = useState(
    () => scheduleData.firstView.date
  );
  const [currentData, setCurrentData] = useState<any[] | undefined>(undefined);
  const [currentId, setCurrentId] = useState<string | undefined>(
    scheduleData.firstView.id
  );

  //보기모드 변경 상태
  const [viewMode, setViewMode] = useState(true);

  //보기모드변경 함수
  const handleViewChange = (value: boolean): void => {
    setViewMode(value);
  };

  //최초렌더링시 실행
  useEffect(() => {
    setCurrentId(scheduleData.firstView.id);
    setCurrentDate(scheduleData.firstView.date);
    handleFirstRender(scheduleData.firstView.date);
  }, []);

  let newDummy: any[];
  let newArr: string[] = Calendar(currentDate);

  //드롭다운 바뀔때 캘린더 렌더하는 함수
  const handleCurrentDate = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    let tmp = scheduleData.data.filter((el: any) => {
      return el._id === e.target.value;
    });

    let newDate = tmp[0].period;

    setCurrentDate(newDate);
    newArr = Calendar(newDate);
    newDummy = scheduleData.data.filter((el: any) => {
      return el._id === e.target.value;
    });
    // console.log(newDummy);
    setCurrentData(newDummy);
  };

  //최초렌더링시 캘린더 렌더링 함수
  const handleFirstRender = (date: string): void => {
    setCurrentDate(date);
    newArr = Calendar(date);
    newDummy = scheduleData.data.filter((el: any) => {
      return el._id === currentId;
    });
    setCurrentData(newDummy);
  };

  let table = scheduleData.data.filter((el: any) => {
    return el._id === scheduleData.firstView.id;
  });
  let tableName: string = table[0].scheduleName;
  let tableTeam: string = table[0].group.groupName;

  return (
    <ViewScheduleWrapper>
      {/* {console.log(currentId)} */}
      {/* {console.log(newDummy)} */}
      {/* {console.log(scheduleData)} */}
      {/* {console.log(table)} */}
      <TableTopWrapper>
        <SelectBox onChange={handleCurrentDate}>
          {scheduleData.data.map((el: any, idx) => {
            return (
              <option key={idx} value={el._id}>
                {el.scheduleName}
              </option>
            );
          })}
        </SelectBox>
        <DateWrapper>
          <TableTitle>{tableName}</TableTitle>
          <SubTextWrapper>
            <SubText>
              {currentDate.split("-")[0]}년 {currentDate.split("-")[1]}월
            </SubText>
            <SubText>{tableTeam}</SubText>
          </SubTextWrapper>
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
