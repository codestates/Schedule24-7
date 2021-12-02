import styled from "styled-components";

export const MainWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MainLogo = styled.img`
  width: 300px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    width: 200px;
  }
`;

export const BoxSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const BoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-width: 0px 0px 1px 0px;
  border-style: solid;
  border-color: #696969;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
  padding-bottom: 0.1rem;
`;

export const BoxWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(125px, auto));
  border: 1px dotted #696969;
  border-radius: 0.5rem;
  padding: 0.3rem;
  background-color: #ececec;
`;

export const AddBtn = styled.button`
  width: 100px;
`;
