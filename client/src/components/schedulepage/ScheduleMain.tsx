import styled from "styled-components";
import {
  AddBtn,
  BoxHeader,
  BoxSection,
  BoxWrapper,
  NoSchedule,
} from "../../style/theme";
import { Link } from "react-router-dom";
import BoxItem from "./BoxItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { useEffect } from "react";
import { saveSchedule } from "../../redux/actions/scheduleActions";
// import AddScheduleBoxItem from "./AddScheduleBoxItem";

export const MainWrapper = styled.div``;

export default function ScheduleMain() {
  const scheduleData = useSelector((state: RootState) => state.scheduleReducer);

  return (
    <BoxSection>
      <BoxHeader>
        <span>스케쥴</span>
        <Link to="/schedule/add">
          <AddBtn>새스케줄추가</AddBtn>
        </Link>
      </BoxHeader>
      <BoxWrapper>
        {scheduleData.data[0].id !== null ? (
          scheduleData.data.map((el, idx) => {
            return <BoxItem key={idx} schedule={el} />;
          })
        ) : (
          <NoSchedule>등록된 스케쥴이 없습니다</NoSchedule>
        )}
        {/* <AddScheduleBoxItem /> */}
      </BoxWrapper>
    </BoxSection>
  );
}
