import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
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
import MainBoxItem from "./MainBoxItem";

export default function ScheduleShortcut() {
  const navigate = useNavigate();
  const groups = useSelector((store: RootState) => store.group.groups);

  //스케쥴 존재여부 상태
  const [scheduleExist, setScheduleExist] = useState<boolean>(false);

  //더보기 상태
  const [showBoxes, setShowBoxes] = useState(false);

  //더보기 함수
  const handleShowBoxes = () => {
    if (showBoxes) {
      setShowBoxes(false);
    } else {
      setShowBoxes(true);
    }
  };

  //페이지 렌더링시 스케쥴 존재여부 업데이트
  useEffect(() => {
    checkSchedule();
  }, [groups]);

  //스케쥴 상태 업데이트 함수
  const checkSchedule = () => {
    let tmpBoolean: boolean = false;
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].schedules.length !== 0) {
        tmpBoolean = true;
      }
    }
    setScheduleExist(tmpBoolean);
  };

  return (
    <BoxSection>
      <BoxHeader>
        <span>스케쥴</span>
        <AddBtn
          onClick={() => {
            navigate("/schedule/add");
          }}
        >
          새스케줄추가
        </AddBtn>
      </BoxHeader>
      <ShortcutContainer>
        {scheduleExist ? (
          <ShortcutBoxWrapper className={showBoxes ? "showBoxes" : ""}>
            {groups.map((el: any) => {
              return el.schedules.map((item: any, idx: any) => {
                return <MainBoxItem key={idx} schedule={item} />;
              });
            })}
          </ShortcutBoxWrapper>
        ) : (
          <NoSchedule className="main">등록된 스케쥴이 없습니다</NoSchedule>
        )}
        {/* <AddScheduleBoxItem /> */}
        <SeeMoreWrapper>
          {scheduleExist ? (
            <SeeMore onClick={handleShowBoxes}>더보기</SeeMore>
          ) : (
            ""
          )}
        </SeeMoreWrapper>
      </ShortcutContainer>
    </BoxSection>
  );
}
