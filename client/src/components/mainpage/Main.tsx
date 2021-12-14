import styled from "styled-components";
// import Favorite from "./Favorite";
import GroupShortcut from "./GroupShortcut";
import ScheduleShortcut from "./ScheduleShortcut";

export const MainWrapper = styled.div``;

export default function Main() {
  return (
    <MainWrapper>
      {/* <Favorite /> */}
      <GroupShortcut />
      <ScheduleShortcut />
    </MainWrapper>
  );
}
