import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 9rem;
  height: 9rem;
  border: 1px solid #cfcdcd;
  /* box-shadow: 1px 1px 1px #a7a7a75c; */
  border-radius: 0.4rem;
  background-color: white;
  margin: 0.5rem;
`;

export default function BoxSample() {
  return <Box></Box>;
}
