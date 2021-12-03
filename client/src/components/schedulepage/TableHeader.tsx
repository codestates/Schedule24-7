import styled from "styled-components";

export const DayName = styled.div`
  display: flex;
  height: 2.5rem;
  border-radius: 0.5rem;
  box-shadow: 0.05rem 0.05rem 0.1rem rgba(0, 0, 0, 0.25);
  border: 0.01rem solid rgba(0, 0, 0, 0.15);
  margin: 0.1rem;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  background-color: #4b4b4b;
`;

export default function TableHeader({ DayHeader }: any) {
  return <DayName>{DayHeader}</DayName>;
}
