import { FC } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import { mediaQuery } from "../GlobalStyle";
import InnerHeader from "../components/InnerHeader";


const BlockContainer = styled.div`
  background-color: #f1f1f1;
  border: 0.5px dashed #4a4a4a;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 18px;
  display: flex;
  flex-wrap: wrap;
  
  > div {
    width: 170px;
    height: 170px;
    padding: 10px;
    margin: 5px;
  }
`;

const GroupMemberPage: FC = () => {
  
  return (

  <Layout title="그룹">

  
  </Layout >
  )
};

export default GroupMemberPage;
