import axios from "axios";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { getGroupsApi } from "../../lib/api/group";
import { getGroups } from "../../redux/actions/Group";
import { setFirstView } from "../../redux/actions/scheduleActions";

const Block = styled.nav`
  width: 100px;
  position: absolute;
  left: 35px;
  top: 25px;
  background-color: #f9f9f9;
  box-shadow: 0px 0px 1px rgba(58, 58, 58, 0.25);
  border-radius: 3px;
  z-index: 10;
  border: 1px solid rgba(88, 88, 88, 0.103);

  > a {
    display: block;
    font-size: 14px;
    color: #303030;
    padding: 5px;
    text-decoration: none;
    text-align: center;
    border-top: 1px solid rgba(136, 136, 136, 0.103);
  }

  > a:hover {
    background-color: #e0e0e0;
  }

  > div {
    display: block;
    font-size: 14px;
    color: #303030;
    padding: 5px;
    text-align: center;
    border-top: 1px solid rgba(136, 136, 136, 0.103);
    cursor: pointer;
  }

  > div:hover {
    background-color: #e0e0e0;
  }
`;

interface Props {
  schedule: any;
}

const MainScheduleThreeDot: FC<Props> = ({ schedule }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //스케쥴 삭제 함수
  const handleDeleteSchedule = () => {
    axios
      .delete(
        `https://server.schedule24-7.link/schedule/${schedule.group.groupId}/${schedule._id}`,
        {
          headers: {
            authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        getGroupsApi().then((res) => {
          dispatch(getGroups(res.data));
        });
        navigate("/");
        alert("스케쥴이 삭제되었습니다");
      });
  };

  //스케쥴 조회 함수
  const connectViewSchedule = (data: any): void => {
    dispatch(setFirstView(data));
    navigate(`/schedule/view/${schedule.group.groupId}/${schedule._id}`);
  };

  //정보조회 아이디설정
  const handleSetViewId = (data: any): void => {
    dispatch(setFirstView(data));
    navigate(`/schedule/info/${schedule.group.groupId}/${schedule._id}`);
  };

  return (
    <Block id="ThreeDot">
      <div onClick={() => handleSetViewId(schedule)}>스케줄정보</div>
      <div
        onClick={() => {
          connectViewSchedule(schedule);
        }}
      >
        스케쥴보기
      </div>
      <div onClick={handleDeleteSchedule}>스케쥴삭제</div>
    </Block>
  );
};

export default MainScheduleThreeDot;
