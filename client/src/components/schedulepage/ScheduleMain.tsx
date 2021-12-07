import styled from "styled-components";
import { AddBtn, BoxHeader, BoxSection, BoxWrapper } from "../../style/theme";
import { Link } from "react-router-dom";
import BoxItem from "./BoxItem";
import { ScheduleDummy } from "./ScheduleDummy";
import AddScheduleBoxItem from "./AddScheduleBoxItem";

export const MainWrapper = styled.div``;

export default function ScheduleMain() {
  return (
    <BoxSection>
      <BoxHeader>
        <span>스케쥴</span>
        <Link to="/schedule/add">
          <AddBtn>새스케줄추가</AddBtn>
        </Link>
      </BoxHeader>
      <BoxWrapper>
        {ScheduleDummy.map((el, idx) => {
          return <BoxItem key={idx} schedule={el} />;
        })}
        {/* <AddScheduleBoxItem /> */}
      </BoxWrapper>
    </BoxSection>
  );
}
