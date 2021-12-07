import styled from "styled-components";

export const MainWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
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
  grid-template-columns: repeat(auto-fill, minmax(9rem, auto));
  border: 1px dotted #696969;
  border-radius: 0.5rem;
  padding: 0.3rem;
  background-color: #ececec;
  grid-column-gap: 10px;
`;

export const ShortcutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  border: 1px dotted #696969;
  border-radius: 0.5rem;
  padding: 0.3rem;
  background-color: #ececec;
`;

export const ShortcutBoxWrapper = styled.div`
  max-height: 20rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(135px, auto));
  /* grid-template-rows: repeat(auto-fill, minmax(125px, auto)); */
  margin-right: 0.5rem;
  overflow: hidden;
  grid-column-gap: 10px;
  &.showBoxes {
    max-height: 100rem;
  }
`;

export const SeeMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const SeeMore = styled.div`
  padding-top: 5px;
  width: 100px;
  height: 22px;
  border: 1px solid #cfcdcd;
  text-align: center;
  /* background-color: #fdfdfd; */
  border-radius: 5px;
  cursor: grab;
  margin-bottom: 3px;
`;

export const AddBtn = styled.button`
  width: 100px;
  height: 30px;
  /* background-color: white;
  border: 1px solid #a8a8a8;
  border-radius: 5px;
  color: #3d3d3d;
  margin-bottom: 3px;
  :hover {
    background-color: #e9e9e9;
    color: #161616;
  } */
`;

export const NormalBox = styled.input`
  width: 300px;
  height: 40px;
  padding-left: 10px;
  /* border-radius: 0.3rem; */
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  margin: 0.2rem;
  background-color: white;
`;

export const NormalBtn = styled.button`
  width: 313px;
  height: 35px;
  color: white;
  box-shadow: 0.05rem 0.05rem 0.05rem #696969;
  border: 0px solid #a5a5a5;
  cursor: pointer;
  margin: 0.2rem;
  background-color: #5c5c5c;

  &.a {
    background-color: #5c5c5c;
  }
  &.b {
    background-color: #7c7c7c;
  }
  &.out {
    background-color: #b90000;
  }
`;

export const ErrMsg = styled.div`
  margin-top: 3px;
  font-size: 13px;
  &.err {
    color: #c40202;
  }
  &.ok {
    color: #0e7a00;
  }
  &.loginErr {
    color: #c40202;
    margin-top: 0px;
    margin-bottom: 5px;
  }
`;
