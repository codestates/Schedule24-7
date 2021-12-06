import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  /* > .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    z-index: 1;
    top: 10%;
    left: 10%;
  }
  &.Container:hover .main {
    opacity: 0.3;
  }

  &.Container:hover .overlay {
    opacity: 1;
  } */
  a {
    text-decoration: none;
  }
  a:visited {
    text-decoration: none;
  }
`;

export const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 9rem;
  height: 9rem;
  border: 1px solid #cfcdcd;
  /* box-shadow: 1px 1px 1px #a7a7a75c; */
  border-radius: 0.4rem;
  background-color: #f1f1f1;
  margin: 0.5rem;
  cursor: pointer;
`;

export const Div1 = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
  font-size: 3rem;
  font-weight: bold;
  color: black;
`;

export const Div2 = styled.div`
  font-size: 13px;
  text-align: center;
  color: black;
`;

export default function AddScheduleBoxItem({ schedule }: any) {
  return (
    <Container>
      <Link to="/schedule/add">
        <MainDiv className="main">
          <Div1>+</Div1>
          <Div2>새스케쥴추가</Div2>
        </MainDiv>
        {/* <div className="overlay"></div> */}
      </Link>
    </Container>
  );
}
