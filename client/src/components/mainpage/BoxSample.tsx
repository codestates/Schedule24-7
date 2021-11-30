import styled from "styled-components";

export const Box = styled.div`
  width: 7rem;
  height: 7rem;
  box-shadow: 0.1rem 0.1rem 0.1rem gray;
  border-radius: 0.7rem;
  background-color: white;
  margin: 0.5rem;
`;

export default function BoxSample() {
  return <Box></Box>;
}
