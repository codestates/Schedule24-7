import styled from "styled-components";

export const DayName = styled.div`
  height: 1.5rem;
`;

export default function TableHeader({ DayHeader }: any) {
  return <DayName>{DayHeader}</DayName>;
}
