import { FC } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import InnerHeader from "../components/InnerHeader";
import GroupBasicInfo from "../components/groups/GroupBasicInfo";
import DailyWork from "../components/groups/DailyWork"
import WorkNameNumber from "../components/groups/WorkNameNumber";
import GroupSelectBar from "../components/groups/GroupSelectBar";


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

const GroupBasicInfoPage: FC = () => {
  
  return (
    <Layout title="기본정보">
      <InnerHeader title={"기본정보"} />
      <GroupSelectBar />
      <GroupBasicInfo />
      <DailyWork />
      <WorkNameNumber />      
    </Layout >
  )
};

export default GroupBasicInfoPage;
