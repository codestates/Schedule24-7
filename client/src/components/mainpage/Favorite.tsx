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
  border: 1px dotted #696969;
  border-radius: 0.5rem;
  padding: 0.7rem;
  background-color: #e9f8fa;
`;

export default function Favorite() {
  return (
    <FavSection>
      <FavText>즐겨찾기</FavText>
      <FavWrapper>
        <BoxSample />
      </FavWrapper>
    </FavSection>
  );
}
