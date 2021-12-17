import styled from "styled-components";
import { mediaQuery } from "../GlobalStyle";

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
`;

export const BoxSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const BoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-width: 0px 0px 1px 0px;
  border-style: solid;
  border-color: #acacac;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
  padding-bottom: 0.1rem;
  &.group {
    margin-top: 3px;
  }
  &.schedule {
    margin-top: 4px;
  }
`;

export const BoxWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(137px, auto));
  border: 1px dotted #696969;
  border-radius: 0.5rem;
  padding: 3px;
  background-color: #fafafa;
  grid-column-gap: 7px;
`;

export const ShortcutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #d3d3d3;
  border-radius: 0.5rem;
  padding: 3px;
  /* background-color: none; */
  background-color: #fafafa;

  ${mediaQuery.mobile} {
    background-color: #f5f5f5;
    border: 0px;
  }
`;

export const ShortcutBoxWrapper = styled.div`
  max-height: 20rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(135px, auto));
  margin-right: 0.5rem;
  overflow: hidden;
  grid-column-gap: 7px;
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
  width: 90px;
  height: 22px;
  border: 1px solid #cfcdcd;
  text-align: center;
  background-color: #ffffff;
  border-radius: 5px;
  cursor: grab;
  margin-bottom: 3px;
  font-size: 13px;
  :hover {
    background-color: #e2eeff;
  }
`;

export const AddBtn = styled.button`
  width: 80px;
  height: 30px;
  background-color: white;
  border: 1px solid #d4d4d4;
  box-shadow: 0px 0px 4px #7070706c;
  border-radius: 3px;
  color: #1b1b1b;
  font-weight: 500;
  margin-bottom: 3px;
  cursor: pointer;
  :hover {
    background-color: #e9e9e9;
    color: #161616;
  }
  :active {
    box-shadow: inset 1px 1px #7070706c;
  }
  /* 
  &.schedule {
    margin-bottom: 4px;
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
  ${mediaQuery.mobile} {
    max-width: 260px;
  }
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

  ${mediaQuery.mobile} {
    max-width: 273px;
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
  &.centered {
    color: #c40202;
    text-align: center;
  }
`;

export const NoSchedule = styled.div`
  display: flex;
  justify-content: center;
  /* border: 1px dotted #696969; */
  border-radius: 0.5rem;
  padding: 17px 0 0 0;
  background-color: none;
  font-size: 14px;
  z-index: 1;
  height: 35px;
  /* min-height: 100px; */
  /* position: absolute; */

  &.main {
    border: none;
    padding-top: 12px;
    height: 30px;
  }
`;

export const ScheduleHeaderText = styled.span`
  margin-bottom: 3px;
`;

export const BackGround = styled.div`
  background-color: rgba(0, 0, 0, 0);
  position: fixed;
  top: 0%;
  left: 0%;
  bottom: 0%;
  right: 0%;
`;
