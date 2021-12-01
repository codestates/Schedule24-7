import { useState } from "react";
import styled from "styled-components";
import ScheduleBox from "./ScheduleBox";
import ViewSchedule from "./ViewScheduel";

export const MainWrapper = styled.div`
  padding: 1rem;
`;

export default function ScheduleMain() {
  const [currentPage, setCurrentPage] = useState(true);

  const handleCurrentPage = (): void => {
    setCurrentPage(false);
  };

  return (
    <MainWrapper>
      <ScheduleBox />
    </MainWrapper>
  );
}
