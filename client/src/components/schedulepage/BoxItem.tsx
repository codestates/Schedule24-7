import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  addCurrentData,
  setFirstView,
} from "../../redux/actions/scheduleActions";
import { BackGround } from "../../style/theme";
import ScheduleThreeDot from "./ScheduleThreeDot";

export const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 9rem;
  height: 9rem;
  border: 1px solid #cfcdcd;
  /* box-shadow: 1px 1px 1px #a7a7a75c; */
  border-radius: 0.4rem;
  background-color: white;
  margin: 0.5rem;

  a {
    text-decoration: none;
  }
  a:visited {
    text-decoration: none;
  }
`;

export const Div1 = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

export const SubDiv1 = styled.div`
  margin-left: 0.5rem;
  margin-top: 3px;
`;
export const SubDiv2 = styled.div`
  margin-right: 0.55rem;
  margin-top: 0.35rem;
`;

export const Div2 = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-left: 0.7rem;
  margin-top: 1.6rem;
  color: black;
`;

export const Div3 = styled.div`
  font-size: 13px;
  font-weight: 300;
  margin-left: 0.7rem;
  margin-right: 0.7rem;
  margin-top: 2px;
`;

const ToggleMenu = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  > div {
    border-radius: 50%;
    width: 4px;
    height: 4px;
    background-color: #000000;
  }
  > div + div {
    margin-top: 2px;
  }
`;

export default function BoxItem({ schedule }: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openThreeDot, setOpenThreeDot] = useState(false);

  //드롭다운 여는 함수
  const handleOpenThreeDot = () => {
    setOpenThreeDot(true);
  };

  //드롭다운 닫는 함수
  const handleCloseThreeDot = () => {
    return openThreeDot ? setOpenThreeDot(false) : null;
  };

  //스케쥴 조회 함수
  const connectViewSchedule = (data: any): void => {
    dispatch(setFirstView(data));
    dispatch(addCurrentData(data));
    navigate(`/schedule/view/${schedule.group.groupId}/${schedule._id}`);
  };

  return (
    <MainDiv>
      <Div1>
        <SubDiv1>{schedule.scheduleEmoji}</SubDiv1>
        <SubDiv2>
          <ToggleMenu onClick={handleOpenThreeDot}>
            <div />
            <div />
            <div />
          </ToggleMenu>
        </SubDiv2>
        {openThreeDot ? (
          <>
            <ScheduleThreeDot schedule={schedule} />
            <BackGround onClick={handleCloseThreeDot}></BackGround>
          </>
        ) : (
          ""
        )}
      </Div1>
      <Div2
        onClick={() => {
          connectViewSchedule(schedule);
        }}
      >
        {schedule.scheduleName}
      </Div2>
      <Div3>{schedule.group ? schedule.group.groupName : ""}</Div3>
    </MainDiv>
  );
}
