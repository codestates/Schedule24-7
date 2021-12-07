import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setFirstView } from "../../redux/actions/scheduleActions";
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
`;

export const SubDiv1 = styled.div`
  margin-left: 0.5rem;
`;
export const SubDiv2 = styled.div`
  margin-right: 0.55rem;
  margin-top: 0.35rem;
`;

export const Div2 = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-left: 0.7rem;
  margin-top: 1.8rem;
  color: black;
  cursor: pointer;
`;

export const Div3 = styled.div`
  font-size: 14px;
  font-weight: 300;
  margin-left: 0.7rem;
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
  const handleOpenThreeDot = () => {
    setOpenThreeDot(true);
  };
  const handleCloseThreeDot = () => {
    return openThreeDot ? setOpenThreeDot(false) : null;
  };

  const connectViewSchedule = (date: string): void => {
    console.log(date);
    dispatch(setFirstView(date));
    navigate("/schedule/view");
  };

  return (
    <MainDiv onClick={handleCloseThreeDot}>
      <Div1>
        <SubDiv1>{schedule.scheduleEmoji}</SubDiv1>
        <SubDiv2>
          <ToggleMenu onClick={handleOpenThreeDot}>
            <div />
            <div />
            <div />
          </ToggleMenu>
        </SubDiv2>
        {openThreeDot ? <ScheduleThreeDot /> : ""}
      </Div1>
      <Div2
        onClick={() => {
          connectViewSchedule(schedule.period);
        }}
      >
        {schedule.scheduleName}
      </Div2>
      <Div3>{schedule.group.groupName}</Div3>
    </MainDiv>
  );
}
