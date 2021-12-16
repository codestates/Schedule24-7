import styled from "styled-components";
import GroupShortcut from "./GroupShortcut";
import ScheduleShortcut from "./ScheduleShortcut";

export const MainWrapper = styled.div``;

export default function Main() {
  return (
    <MainWrapper>
      <GroupShortcut />
      <ScheduleShortcut />
    </MainWrapper>
  );
}
