import styled from "styled-components";
import {
  AddBtn,
  BoxSection,
  BoxWrapper,
  NoSchedule,
} from "../../style/theme";
import { Link } from "react-router-dom";
import BoxItem from "../schedulepage/BoxItem";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {FC} from "react"
import Layout from "../Layout";
import GroupSelectBar from "../groups/GroupSelectBar";

export const MainWrapper = styled.div``;

const BoxHeader = styled.div`
  display: flex;
  align-items: center;
  border-width: 0px 0px 0px 0px;
  border-style: solid;
  border-color: #696969;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
  padding-bottom: 0.1rem;
  &.group {
    margin-top: 3px;
  }
`;

const GroupSchedulePage: FC =() => {
  const {groupId} = useParams()
  const groups = useSelector((store: RootState) => store.group.groups);
  const selectgroup = groups.filter((item) => item._id === groupId)[0] ?? null;

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
    <Layout title="스케줄">
      <GroupSelectBar activeIdx={0} id={groupId ?? ""} />
      <BoxSection className="schedule">
        <BoxHeader>
          <span></span>
        <Link to="/schedule/add">
          <AddBtn className="schedule">스케줄 생성</AddBtn>
        </Link>
      </BoxHeader>
      {scheduleExist ? (
        <BoxWrapper>
            {typeof selectgroup === "undefined"
              ? null
              :
              selectgroup.schedules.map((item) => (
                <BoxItem schedule={item} />
              ))}
        </BoxWrapper>
      ) : (
        <NoSchedule>등록된 스케쥴이 없습니다</NoSchedule>
      )}
      </BoxSection>
      </Layout>
  );
}

export default GroupSchedulePage

export {}