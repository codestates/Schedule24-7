import styled from "styled-components";
import { mediaQuery } from "../../GlobalStyle";

export const DayName = styled.div`
  display: flex;
  height: 2.5rem;
  border-radius: 5px;
  box-shadow: 0.05rem 0.05rem 0.1rem rgba(0, 0, 0, 0.25);
  border: 0.01rem solid rgba(0, 0, 0, 0.15);
  margin: 0.1rem;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  background-color: #4b4b4b;

  ${mediaQuery.mobile} {
    font-size: 12px;
    font-weight: 400;
    min-width: 5px;
    max-width: 197px;
    margin: 0;
    box-shadow: none;
    border-radius: 3px;
  }
`;

export default function TableHeader({ DayHeader }: any) {
  return <DayName>{DayHeader}</DayName>;
}
