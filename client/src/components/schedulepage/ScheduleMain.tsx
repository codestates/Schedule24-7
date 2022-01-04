import styled from "styled-components";
import {
  AddBtn,
  BoxHeader,
  BoxSection,
  NoSchedule,
  ShortcutBoxWrapper2,
  ShortcutContainer2,
} from "../../style/theme";
import { Link } from "react-router-dom";
import BoxItem from "./BoxItem";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { useEffect, useState } from "react";
import { HeaderText } from "../../pages/GroupIndexPage";

export const MainWrapper = styled.div``;

export default function ScheduleMain() {
  const groups = useSelector((store: RootState) => store.group.groups);

  //스케쥴 존재여부 상태
  const [scheduleExist, setScheduleExist] = useState<boolean>(false);

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
    <BoxSection className="schedule">
      <BoxHeader>
        <HeaderText>스케줄</HeaderText>
        <Link to="/schedule/add">
          <AddBtn className="schedule">스케줄 생성</AddBtn>
        </Link>
      </BoxHeader>
      <ShortcutContainer2>
        {scheduleExist ? (
          <ShortcutBoxWrapper2>
            {groups.map((el: any) => {
              return el.schedules.map((item: any, idx: any) => {
                return <BoxItem key={idx} schedule={item} />;
              });
            })}
          </ShortcutBoxWrapper2>
        ) : (
          <NoSchedule>등록된 스케줄이 없습니다</NoSchedule>
        )}
      </ShortcutContainer2>
    </BoxSection>
  );
}
