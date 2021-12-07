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

export default function GroupShortcut() {
  const [showBoxes, setShowBoxes] = useState(false);

  const handleShowBoxes = () => {
    if (showBoxes) {
      setShowBoxes(false);
    } else {
      setShowBoxes(true);
    }
  };

  return (
    <BoxSection>
      <BoxHeader>
        <span>그룹</span>
        <AddBtn>새그룹추가</AddBtn>
      </BoxHeader>
      <ShortcutContainer>
        <ShortcutBoxWrapper
          className={showBoxes ? "showBoxes" : ""}
        ></ShortcutBoxWrapper>
        <SeeMoreWrapper>
          <SeeMore onClick={handleShowBoxes}>더보기</SeeMore>
        </SeeMoreWrapper>
      </ShortcutContainer>
    </BoxSection>
  );
}
