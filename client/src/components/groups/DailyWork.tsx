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

const DailyWork: FC = () => {
    const options = [
    {
      name: "1",
    },
    {
      name: "2",
    },
    {
      name: "3",
    },
  ];
  
 
  return (
    <>
      <h4>일일 근무 횟수</h4>
        <select>
          {options.map((option, idx) => (
        <option>{option.name}</option>
      ))}
      </select>
    </>
   

  );
};

export default DailyWork;