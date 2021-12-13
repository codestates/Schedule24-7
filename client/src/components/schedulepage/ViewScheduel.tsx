import { useState } from "react";
import styled from "styled-components";
import Calendar from "./CalendarGenerator";
import { dayArr, ScheduleDummy } from "./ScheduleDummy";
import ScheduleItem from "./ScheduleItem";
import TableHeader from "./TableHeader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import ScheduleItemColumn from "./ScheduleItemColumn";
import moment from "moment";
import { Navigate, useNavigate, useParams } from "react-router";
import { getGroupsApi } from "../../lib/api/group";
import { getGroups } from "../../redux/actions/Group";
import { Link } from "react-router-dom";

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
  a {
    color: black;
    text-decoration: none;
  }
  a:visited {
    color: black;
    text-decoration: none;
  }
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  //스토리지에서 데이터 호출
  const groups = useSelector((store: RootState) => store.group.groups);

  //현재 그룹 필터링
  const currentGroup: any = groups.filter((el: any) => {
    return el._id === params.groupId;
  });

  //현재 스케쥴만 필터링
  let currentSchedule: any;
  if (currentGroup.length !== 0) {
    currentSchedule = currentGroup[0].schedules.filter((el: any) => {
      return el._id === params.scheduleId;
    });
  } else {
    currentSchedule = ScheduleDummy;
  }

  //페이지 첫 렌더링 또는 새로고침시 실행
  useEffect(() => {
    getGroupsApi().then((res) => {
      dispatch(getGroups(res.data));
    });
    handleFirstRender(currentSchedule[0].period);
  }, [dispatch, params]);

  useEffect(() => {
    handleFirstRender(currentSchedule[0].period);
  }, [groups]);

  //현재 날짜
  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));

  //보기모드 변경 상태
  const [viewMode, setViewMode] = useState(true);

  //보기모드변경 함수
  const handleViewChange = (value: boolean): void => {
    setViewMode(value);
  };

  //드롭다운 바뀔때 캘린더 렌더하는 함수
  let newArr: string[] = Calendar(currentDate);
  const handleCurrentDate = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    let url = e.target.value.split(",");
    navigate(`/schedule/view/${url[0]}/${url[1]}`);
  };

  //최초렌더링시 캘린더 렌더링 함수
  const handleFirstRender = (date: string): void => {
    setCurrentDate(date);
    newArr = Calendar(date);
  };

  //목록형 캘린더 만드는 함수
  let columnArr = newArr.filter((el: any) => {
    let tmp: string;
    if (Number(currentDate.split("-")[1]) < 10) {
      tmp = `0${currentDate.split("-")[1]}`;
    } else {
      tmp = currentDate.split("-")[1];
    }
    return el.split("-")[1] === tmp;
  });

  //스케쥴 이름 및 팀이름
  let tableName: string = currentSchedule[0].scheduleName;
  let tableTeam: string = currentSchedule[0].group.groupName;

  return (
    <ViewScheduleWrapper>
      <TableTopWrapper>
        <SelectBox onChange={handleCurrentDate}>
          {groups.map((el: any, idx: any) => {
            return el.schedules.map((item: any, idx: any) => {
              return (
                <option key={idx} value={[el._id, item._id]}>
                  {item.scheduleName}
                </option>
              );
            });
          })}
        </SelectBox>
        <DateWrapper>
          <TableTitle>
            <Link to={`/schedule/info/${params.groupId}/${params.scheduleId}`}>
              {tableName}
            </Link>
          </TableTitle>

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
          {columnArr.map((el, idx) => {
            return (
              <ScheduleItemColumn
                key={idx}
                DayNum={el}
                NewDummy={currentSchedule[0]}
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
              <ScheduleItem
                key={idx}
                DayNum={el}
                NewDummy={currentSchedule[0]}
              />
            );
          })}
        </ScheduleTable>
      )}
    </ViewScheduleWrapper>
  );
}
