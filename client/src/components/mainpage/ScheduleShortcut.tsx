import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import {
  AddBtn,
  BoxHeader,
  BoxSection,
  NoSchedule,
  SeeMore,
  SeeMoreWrapper,
  ShortcutBoxWrapper,
  ShortcutContainer,
} from "../../style/theme";
// import AddScheduleBoxItem from "../schedulepage/AddScheduleBoxItem";
import BoxItem from "../schedulepage/BoxItem";
// import { ScheduleDummy } from "../schedulepage/ScheduleDummy";

export default function ScheduleShortcut() {
  const [showBoxes, setShowBoxes] = useState(false);
  const handleShowBoxes = () => {
    if (showBoxes) {
      setShowBoxes(false);
    } else {
      setShowBoxes(true);
    }
  };
  const scheduleData = useSelector((state: RootState) => state.scheduleReducer);

  return (
    <BoxSection>
      <BoxHeader>
        <span>스케쥴</span>
        <AddBtn>새스케줄추가</AddBtn>
      </BoxHeader>
      <ShortcutContainer>
        <ShortcutBoxWrapper className={showBoxes ? "showBoxes" : ""}>
          {scheduleData.data[0].id !== null ? (
            scheduleData.data.map((el, idx) => {
              return <BoxItem key={idx} schedule={el} />;
            })
          ) : (
            <NoSchedule>등록된 스케쥴이 없습니다</NoSchedule>
          )}
          {/* <AddScheduleBoxItem /> */}
        </ShortcutBoxWrapper>
        <SeeMoreWrapper>
          {scheduleData.data[0].id !== null ? (
            <SeeMore onClick={handleShowBoxes}>더보기</SeeMore>
          ) : (
            ""
          )}
        </SeeMoreWrapper>
      </ShortcutContainer>
    </BoxSection>
  );
}
