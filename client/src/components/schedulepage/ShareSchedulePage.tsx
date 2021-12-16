import { FC, useCallback, useMemo, useState } from "react";
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
import { useNavigate, useParams } from "react-router";
import { getGroupsApi } from "../../lib/api/group";
import { getGroups } from "../../redux/actions/Group";
import { Link } from "react-router-dom";
import { mediaQuery } from "../../GlobalStyle";
import axios from "axios";
import { ReturnApi } from "../../types/api";
import apiClient from "../../lib/client";

export const ViewScheduleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TableTopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  ${mediaQuery.mobile} {
    margin-bottom: 8px;
  }
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
  /* margin-left: 26px; */
  ${mediaQuery.mobile} {
    margin-left: 0px;
  }
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

  ${mediaQuery.mobile} {
    font-size: 17px;
    margin: 3px;
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
  ${mediaQuery.mobile} {
    font-size: 14px;
  }
`;

export const ViewSelect = styled.div`
  width: 135px;
  display: flex;
  justify-content: right;
  ${mediaQuery.mobile} {
    justify-content: right;
  }
`;

export const ScheduleTable = styled.div`
  display: grid;
  height: 80vh;
  justify-content: center;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 0.2fr 1fr 1fr 1fr 1fr 1fr 1fr;
  ${mediaQuery.mobile} {
    margin: 0;
  }
`;

export const ScheduleColumnTable = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SelectBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  background-color: #797979;
  /* box-shadow: 0 0 1px #d4d4d4; */
  border: 1px solid #797979;
  border-radius: 3px;
  margin-left: 2px;
  cursor: pointer;
  &.list {
    /* margin-left: 1px; */
  }
`;

export const TableIcon = styled.img`
  width: 14px;

  &.list {
    height: 17px;
  }
`;

const ShareSchedulePage: FC = () => {
  const params = useParams();
  const { scheduleId } = useParams();
  const [result, setResult] = useState<any>(null);
  const [viewMode, setViewMode] = useState(true);

  const getShareSchedule = useCallback((): Promise<ReturnApi<any>> => {
    return apiClient().get<any, ReturnApi<any>>(
      `https://server.schedule24-7.link/schedule/share/${scheduleId}`
    );
  }, [scheduleId]);

  const calendarArr = useMemo<[]>(() => {
    if (result === null) return [];

    return Calendar(result.period) as [];
  }, [result]);

  const columnArr = useMemo(() => {
    if (result === null) return [];

    return calendarArr.filter((el: any) => {
      return el.split("-")[1] === result.period.split("-")[1].padStart(2, "0");
    });
  }, [calendarArr, result]);

  useEffect(() => {
    getShareSchedule().then((response) => {
      setResult(response.data.result);
    });
  }, [getShareSchedule]);

  if (result === null) return <></>;

  const {
    group: { groupName: tableName },
    scheduleName: tableTeam,
  } = result;

  const [year, month] = result.period.split("-");

  return (
    <ViewScheduleWrapper>
      <TableTopWrapper>
        <DateWrapper>
          <TableTitle>
            <Link to={`/schedule/info/${params.groupId}/${params.scheduleId}`}>
              {tableName}
            </Link>
          </TableTitle>
          <SubTextWrapper>
            <SubText>
              {year}년 {month}월
            </SubText>
            <SubText>{tableTeam}</SubText>
          </SubTextWrapper>
        </DateWrapper>
        <ViewSelect>
          <SelectBtn className="list" onClick={() => setViewMode(true)}>
            <TableIcon
              className="list"
              src="https://media.discordapp.net/attachments/907157959333785630/920132429044387890/listwhite.png"
            />
          </SelectBtn>
          <SelectBtn onClick={() => setViewMode(false)}>
            <TableIcon src="https://media.discordapp.net/attachments/907157959333785630/920129010980225034/gridwhite.png" />
          </SelectBtn>
        </ViewSelect>
      </TableTopWrapper>
      {viewMode ? (
        <ScheduleColumnTable>
          {columnArr.map((el, idx) => {
            return (
              <ScheduleItemColumn key={idx} DayNum={el} NewDummy={result} />
            );
          })}
        </ScheduleColumnTable>
      ) : (
        <ScheduleTable>
          {dayArr.map((el, idx) => {
            return <TableHeader key={idx} DayHeader={el} />;
          })}
          {calendarArr.map((el, idx) => {
            return <ScheduleItem key={idx} DayNum={el} NewDummy={result} />;
          })}
        </ScheduleTable>
      )}
    </ViewScheduleWrapper>
  );
};

export default ShareSchedulePage;
