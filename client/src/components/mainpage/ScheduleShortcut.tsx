import { useState } from "react";
import {
  AddBtn,
  BoxHeader,
  BoxSection,
  SeeMore,
  SeeMoreWrapper,
  ShortcutBoxWrapper,
  ShortcutContainer,
} from "../../style/theme";
import AddScheduleBoxItem from "../schedulepage/AddScheduleBoxItem";
import BoxItem from "../schedulepage/BoxItem";
import { ScheduleDummy } from "../schedulepage/ScheduleDummy";

export default function ScheduleShortcut() {
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
        <span>스케쥴</span>
        <AddBtn>새스케줄추가</AddBtn>
      </BoxHeader>
      <ShortcutContainer>
        <ShortcutBoxWrapper className={showBoxes ? "showBoxes" : ""}>
          {ScheduleDummy.map((el, idx) => {
            return <BoxItem key={idx} schedule={el} />;
          })}
          {/* <AddScheduleBoxItem /> */}
        </ShortcutBoxWrapper>
        <SeeMoreWrapper>
          <SeeMore onClick={handleShowBoxes}>더보기</SeeMore>
        </SeeMoreWrapper>
      </ShortcutContainer>
    </BoxSection>
  );
}
