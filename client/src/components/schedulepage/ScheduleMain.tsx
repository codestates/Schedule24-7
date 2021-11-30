import styled from "styled-components";
import ScheduleShortcut from "../mainpage/ScheduleShortcut";

export const MainWrapper = styled.div`
  padding: 1rem;
`;

export default function ScheduleMain() {
  return (
    <MainWrapper>
      <ScheduleShortcut />
    </MainWrapper>
  );
}
