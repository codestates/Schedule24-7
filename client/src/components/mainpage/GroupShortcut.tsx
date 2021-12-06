import { useState } from "react";
import styled from "styled-components";
import {
  AddBtn,
  BoxHeader,
  BoxSection,
  SeeMore,
  SeeMoreWrapper,
  ShortcutBoxWrapper,
  ShortcutContainer,
} from "../../style/theme";
import GroupListItem from "../groups/GroupListItem";
import BoxSample from "./BoxSample";

export default function GroupShortcut() {
  const [showBoxes, setShowBoxes] = useState(false);

  const handleShowBoxes = () => {
    if (showBoxes) {
      setShowBoxes(false);
    } else {
      setShowBoxes(true);
    }
  };
  
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


  return (
    <BoxSection>
      <BoxHeader>
        <span>그룹</span>
        <AddBtn>새그룹추가</AddBtn>
      </BoxHeader>
      <ShortcutContainer>
        <ShortcutBoxWrapper className={showBoxes ? "showBoxes" : ""}>
        {[...arrs, ...arrs, ...arrs, ...arrs, ...arrs, ...arrs].map((item) => (
          <GroupListItem {...item} />
        ))}
        </ShortcutBoxWrapper>
        <SeeMoreWrapper>
          <SeeMore onClick={handleShowBoxes}>더보기</SeeMore>
        </SeeMoreWrapper>
      </ShortcutContainer>
    </BoxSection>
  );
}
