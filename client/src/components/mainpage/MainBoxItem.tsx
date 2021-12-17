import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  addCurrentData,
  setFirstView,
} from "../../redux/actions/scheduleActions";
import MainScheduleThreeDot from "./MainScheduleThreeDot";

export const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 8rem;
  height: 8rem;
  border: 1px solid #e4e4e4;
  box-shadow: 0px 0px 7px #7070706c;
  border-radius: 15px;
  background-color: white;
  margin: 0.5rem;
  padding: 7px 10px 7px 10px;

  a {
    text-decoration: none;
  }
  a:visited {
    text-decoration: none;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 auto;
  padding-bottom: 15px;
`;

export const Div1 = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

export const SubDiv1 = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const SubDiv2 = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const Div2 = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: black;
  word-break: break-all;
  cursor: pointer;
`;

export const Div3 = styled.div`
  font-size: 13px;
  font-weight: 300;
  margin-top: 2px;
  word-break: break-all;
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

export const BackGround = styled.div`
  background-color: rgba(0, 0, 0, 0);
  position: fixed;
  top: 0%;
  left: 0%;
  bottom: 0%;
  right: 0%;
`;

export default function MainBoxItem({ schedule }: any) {
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
            <MainScheduleThreeDot schedule={schedule} />
            <BackGround onClick={handleCloseThreeDot}></BackGround>
          </>
        ) : (
          ""
        )}
      </Div1>
      <TitleWrapper>
        <Div2
          onClick={() => {
            connectViewSchedule(schedule);
          }}
        >
          {schedule.scheduleName}
        </Div2>
        <Div3>{schedule.group ? schedule.group.groupName : ""}</Div3>
      </TitleWrapper>
    </MainDiv>
  );
}
