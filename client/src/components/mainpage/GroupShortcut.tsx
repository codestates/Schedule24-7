import styled from "styled-components";
import BoxSample from "./BoxSample";

export const FavSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const FavText = styled.div`
  border-width: 0px 0px 1px 0px;
  border-style: solid;
  border-color: #696969;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
  padding-bottom: 0.1rem;
`;

export const FavWrapper = styled.div`
  display: grid;
  /* justify-content: start; */
  grid-template-columns: repeat(auto-fill, minmax(125px, auto));
  /* grid-auto-flow: dense; */
  /* grid-template-areas:
    "a b c d e f g h"
    "i j k l m n o p"; */
  border: 1px dotted #696969;
  border-radius: 0.5rem;
  padding: 0.3rem;
  background-color: #ececec;
`;

export default function GroupShortcut() {
  return (
    <FavSection>
      <FavText>그룹</FavText>
      <FavWrapper>
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
      </FavWrapper>
    </FavSection>
  );
}
