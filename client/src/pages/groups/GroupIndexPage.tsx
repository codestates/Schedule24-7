import { FC } from "react";
import Layout from "../../components/Layout";
import styled from "styled-components";
import { mediaQuery } from "../../GlobalStyle";

const TitleContaioner = styled.div`
  background-color: green;
  

  ${mediaQuery.mobile} {
    background-color: blue;
  }
`

const BlockContainer = styled.div`
  background-color: red;
  

  ${mediaQuery.mobile} {
    
  }


`

const GroupIndexPage: FC = () => {
  return (
  <Layout title="그룹">
    <TitleContaioner>
    그룹관리
    </TitleContaioner>
  
  </Layout >
  )
};

export default GroupIndexPage;
