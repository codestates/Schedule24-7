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
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";

export default function GroupShortcut() {
  const [showBoxes, setShowBoxes] = useState(false);
  const groups = useSelector((store: RootState) => store.group.groups);

  const handleShowBoxes = () => {
    if (showBoxes) {
      setShowBoxes(false);
    } else {
      setShowBoxes(true);
    }
  };

  return (
    <BoxSection>
      <BoxHeader className="group">
        <span>그룹</span>
        <AddBtn>새그룹추가</AddBtn>
      </BoxHeader>
      <ShortcutContainer>
        <ShortcutBoxWrapper className={showBoxes ? "showBoxes" : ""}>
          {groups
            ? groups.map((group) => (
                <GroupListItem
                  id={group._id}
                  desc={group.groupDesc}
                  emoji={group.groupEmoji}
                  name={group.groupName}
                  key={group._id}
                />
              ))
            : null}
        </ShortcutBoxWrapper>
        <SeeMoreWrapper>
          <SeeMore onClick={handleShowBoxes}>더보기</SeeMore>
        </SeeMoreWrapper>
      </ShortcutContainer>
    </BoxSection>
  );
}
