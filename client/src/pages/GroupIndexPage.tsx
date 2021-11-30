import { FC } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import { mediaQuery } from "../GlobalStyle";
import GroupListItem from "../components/groups/GroupListItem"
import InnerHeader from "../components/InnerHeader";
import AddListItem from "../components/AddListItem";

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

const arrs: Group.GroupListItemProps[] = [
  {
    emoji: "🍕",
    groupDesc: "당직1팀 명단(수정가능)",
    groupName: "당직1팀",
  },
  {
    emoji: "🍕",
    groupDesc: "당직2팀 명단(수정가능)",
    groupName: "당직2팀",
  },
  {
    emoji: "🍕",
    groupDesc: "당직3팀 명단(수정가능)",
    groupName: "당직3팀",
  },
  {
    emoji: "🍕",
    groupDesc: "당직4팀 명단(수정가능)",
    groupName: "당직4팀",
  },
];

const GroupIndexPage: FC = () => {
  
  return (

  <Layout title="그룹">
    <InnerHeader title="그룹관리" />    
      <BlockContainer>
        {[...arrs, ...arrs, ...arrs, ...arrs].map((item) => (
          <GroupListItem {...item} />
        ))}
        <AddListItem title={"신규그룹추가"}/>
      </BlockContainer>
  
  </Layout >
  )
};

export default GroupIndexPage;
