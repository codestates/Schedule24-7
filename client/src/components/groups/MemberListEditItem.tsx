import { FC, useState, useCallback } from "react";
import styled from "styled-components";
import { DefaultLayout, hideMobileCss, mediaQuery } from "../../GlobalStyle";

const Block = styled.div`
  position: absolute;
  width: 330px;
  height: 190px;
  margin-top: 80px;
  margin-left: 20px;

`;

const MemberListEditItem: FC = () => {
 
  return (
    <>
      <Block>    
        <div>이름</div>
        <div>김코딩 </div>
        <div>직급</div>
        <div>1팀장</div>
        <div>휴가예정일</div>
        <div>11.23, 11.24</div>
        
      </Block>
    </>
   

  );
};

export default MemberListEditItem;