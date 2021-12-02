import styled from "styled-components";
import { AddBtn, BoxHeader, BoxSection, BoxWrapper } from "../../style/theme";
import { Link } from "react-router-dom";
import BoxSample from "../mainpage/BoxSample";

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
        <Link to="/schedule/view">
          <BoxSample />
        </Link>
      </BoxWrapper>
    </BoxSection>
  );
}
