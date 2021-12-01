import styled from "styled-components";
import { AddBtn, BoxHeader, BoxSection, BoxWrapper } from "../../style/theme";
import BoxSample from "../mainpage/BoxSample";

interface Iprops {
  handleCurrentPage: () => void;
}

export default function ScheduleBox({ handleCurrentPage }: Iprops) {
  return (
    <BoxSection>
      <BoxHeader>
        <span>스케쥴</span>
        <AddBtn>새스케줄추가</AddBtn>
      </BoxHeader>
      <BoxWrapper>
        <div onClick={handleCurrentPage}>
          <BoxSample />
        </div>
      </BoxWrapper>
    </BoxSection>
  );
}
