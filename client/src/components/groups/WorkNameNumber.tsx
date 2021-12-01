import { FC, useState } from "react";
import styled from "styled-components";
import { DefaultLayout, hideMobileCss, mediaQuery } from "../../GlobalStyle";

const Block = styled.div`
  padding: 13px;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  position: relative;
`;

const WorkNameNumber: FC = () => {
 
  return (
    <>
      <h4>근무명 및 근무인원</h4>
      <Block>    
        1: <input placeholder="근무명을 입력해 주세요" />
         <input placeholder="근무할 인원을 입력해 주세요" />
      </Block>
    </>
   

  );
};

export default WorkNameNumber;