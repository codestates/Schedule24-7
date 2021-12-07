import styled from "styled-components";
import { AddBtn, BoxHeader, BoxSection, BoxWrapper } from "../../style/theme";
import { Link } from "react-router-dom";
import BoxItem from "./BoxItem";
import { ScheduleDummy } from "./ScheduleDummy";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
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
        {scheduleData.data.map((el, idx) => {
          return <BoxItem key={idx} schedule={el} />;
        })}
        {/* <AddScheduleBoxItem /> */}
      </BoxWrapper>
    </BoxSection>
  );
}
