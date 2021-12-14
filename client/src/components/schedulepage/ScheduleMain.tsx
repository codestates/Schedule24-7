import styled from "styled-components";
import {
  AddBtn,
  BoxHeader,
  BoxSection,
  BoxWrapper,
  NoSchedule,
} from "../../style/theme";
import { Link } from "react-router-dom";
import BoxItem from "./BoxItem";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { useEffect, useState } from "react";

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
        <span>스케쥴</span>
        <Link to="/schedule/add">
          <AddBtn className="schedule">새스케줄추가</AddBtn>
        </Link>
      </BoxHeader>
      {scheduleExist ? (
        <BoxWrapper>
          {groups.map((el: any) => {
            return el.schedules.map((item: any, idx: any) => {
              return <BoxItem key={idx} schedule={item} />;
            });
          })}
        </BoxWrapper>
      ) : (
        <NoSchedule>등록된 스케쥴이 없습니다</NoSchedule>
      )}
    </BoxSection>
  );
}
