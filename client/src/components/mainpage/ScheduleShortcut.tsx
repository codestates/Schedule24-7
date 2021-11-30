import styled from "styled-components";
import { AddBtn, BoxHeader, BoxSection, BoxWrapper } from "../../style/theme";
import BoxSample from "./BoxSample";

export default function ScheduleShortcut() {
  return (
    <BoxSection>
      <BoxHeader>
        <span>스케쥴</span>
        <AddBtn>새스케줄추가</AddBtn>
      </BoxHeader>
      <BoxWrapper>
        <BoxSample />
      </BoxWrapper>
    </BoxSection>
  );
}
