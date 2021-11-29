import styled from "styled-components";

export const MainWrapper = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MainLogo = styled.img`
  width: 300px;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    width: 200px;
  }
`;
