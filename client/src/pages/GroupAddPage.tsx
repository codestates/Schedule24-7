import { FC } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import InnerHeader from "../components/InnerHeader";
import GroupBasicInfo from "../components/groups/GroupBasicInfo";
import DailyWork from "../components/groups/DailyWork"
import WorkNameNumber from "../components/groups/WorkNameNumber";

const arrs: Group.GroupListItemProps[] = [
  {
    emoji: "🍕",
    groupDesc: "당직1팀 명단(수정가능)",
    groupName: "당직1팀",
  },
];

const GroupAddPage: FC = () => {
  
  return (
    <Layout title="그룹생성">
      <InnerHeader title={"그룹관리 > 그룹생성"} />
      <GroupBasicInfo />
      <DailyWork />
      <WorkNameNumber />      
    </Layout >
  )
};

export default GroupAddPage;
