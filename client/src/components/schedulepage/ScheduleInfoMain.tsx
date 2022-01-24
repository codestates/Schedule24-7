import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  BoxHeader,
  BoxSection,
  ErrMsg,
  ScheduleHeaderText,
} from "../../style/theme";
import "./react-datepicker.css";
import { ScheduleDummy } from "./ScheduleDummy";
import axios from "axios";
import { useEffect } from "react";
import { useCallback } from "react";
import { RootState } from "../../redux/reducers";
import { getGroupsApi } from "../../lib/api/group";
import { getGroups } from "../../redux/actions/Group";
import { useNavigate } from "react-router";
import Layout from "../Layout";
import ScheduleInfoView from "./ScheduleInfoView";
import ScheduleInfoEdit from "./ScheduleInfoEdit";
import { useParams } from "react-router";
import { mediaQuery } from "../../GlobalStyle";
import swal from "sweetalert";

export const AddScheduleWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;
`;

export const AddDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  width: 450px;
  height: 450px;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #cacacac0;
  box-shadow: 1px 1px 1px #cacaca57;
  ${mediaQuery.mobile} {
    max-width: 290px;
    padding: 15px;
    border-radius: 5px;
  }
`;

export const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
`;

export const TitleHeader = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  &.sub {
    padding-left: 3px;
  }
`;

export const NameBox = styled.input`
  width: 235px;
  height: 42px;
  padding-left: 10px;
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  margin: 0.2rem;
  background-color: white;
`;

export const TeamSelect = styled.select`
  width: 300px;
  height: 45px;
  padding-left: 10px;
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  margin: 0.2rem;
  background-color: white;
`;

export const AddBtnWrapper = styled.div`
  display: flex;
  border: none;
  background-color: #f9f9f9;
`;

export const AddBtn = styled.button`
  width: 142px;
  height: 40px;
  color: white;
  box-shadow: 0.05rem 0.05rem 0.05rem #696969;
  border: 0px solid #a5a5a5;
  cursor: pointer;
  margin: 0.5rem;
  background-color: #5c5c5c;

  &.delete {
    background-color: #b60000;
  }
  &.edit {
    width: 300px;
  }
  ${mediaQuery.mobile} {
    max-width: 127px;
  }
`;

export const Div2 = styled.div`
  width: 288px;
  height: 42px;
  /* padding-top: 13px; */
  padding-left: 10px;
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  margin: 0.2rem;
  background-color: white;
  display: flex;
  align-items: center;

  &.sub {
    width: 240px;
  }

  &.noneedit {
    background-color: #e2e2e2;
  }

  ${mediaQuery.mobile} {
    max-width: 260px;
  }
`;

export default function ScheduleInfoMain() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getGroupsApi().then((res) => {
      dispatch(getGroups(res.data));
    });
  }, [dispatch]);

  //스토리지에서 데이터 호출
  const groups = useSelector((store: RootState) => store.group.groups);

  //현재 그룹 필터링
  const currentGroup: any = groups.filter((el: any) => {
    return el._id === params.groupId;
  });

  //현재 스케줄만 필터링
  let currentSchedule: any;
  if (currentGroup.length !== 0) {
    currentSchedule = currentGroup[0].schedules.filter((el: any) => {
      return el._id === params.scheduleId;
    });
  } else {
    currentSchedule = ScheduleDummy;
  }

  //스케줄 정보상태
  const [scheduleInfo, setScheduleInfo] = useState({
    scheduleName: "",
    period: "",
  });

  //이모지 상태
  const [scheduleEmoji, setScheduleEmoji] = useState<string>(
    currentSchedule[0].scheduleEmoji
  );

  //수정모드상태
  const [isEditMode, setIsEditMode] = useState(false);

  //에러메시지 상태
  const [errMessage, setErrMessage] = useState<string>("");

  //스케줄 이름 변겸 함수
  const handleTextInfo =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setScheduleInfo({ ...scheduleInfo, [key]: e.target.value });
    };

  //이모지 선택 함수
  const handleEmoji = useCallback(
    (emoji: string): void => {
      setScheduleEmoji(emoji);
    },
    [scheduleEmoji]
  );

  //수정모드 변경함수
  const handleEditMode = (): void => {
    if (isEditMode) {
      setIsEditMode(false);
    } else {
      setIsEditMode(true);
    }
  };

  //수정요청함수
  const handleScheduleEdit = () => {
    if (scheduleInfo.scheduleName !== "") {
      axios
        .patch(
          `https://server.schedule24-7.link/schedule/${currentSchedule[0].group.groupId}/${currentSchedule[0]._id}`,
          {
            scheduleName: scheduleInfo.scheduleName,
            scheduleEmoji: scheduleEmoji,
          },
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
          swal({
            title: "수정완료",
            icon: "success",
          });
          navigate("/schedule");
          setIsEditMode(false);
        });
    } else {
      swal({
        title: "스케줄 이름을 입력해주세요",
        icon: "error",
      });
    }
  };

  //스케줄 삭제 함수
  const handleDeleteSchedule = () => {
    axios
      .delete(
        `https://server.schedule24-7.link/schedule/${currentSchedule[0].group.groupId}/${currentSchedule[0]._id}`,
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
        navigate("/schedule");
      });
  };

  return (
    <Layout title="스케줄">
      <BoxSection>
        <BoxHeader className="schedule">
          <ScheduleHeaderText>스케줄 정보</ScheduleHeaderText>
        </BoxHeader>
        <AddScheduleWrapper>
          <AddDiv>
            {isEditMode ? (
              <ScheduleInfoEdit
                handleTextInfo={handleTextInfo}
                handleEmoji={handleEmoji}
                scheduleInfo={scheduleInfo}
                // scheduleEmoji={scheduleEmoji}
                setScheduleInfo={setScheduleInfo}
              />
            ) : (
              <ScheduleInfoView currentSchedule={currentSchedule} />
            )}
            <DivWrapper>
              <Title className="sub">그룹</Title>
              <Div2 className="noneedit">
                <span>{currentSchedule[0].group.groupName}</span>
              </Div2>
            </DivWrapper>
            <DivWrapper>
              <Title className="sub">날짜</Title>
              <Div2 className="noneedit">
                <span>{currentSchedule[0].period}</span>
              </Div2>
            </DivWrapper>
            {isEditMode ? (
              <AddBtnWrapper>
                <AddBtn onClick={handleScheduleEdit}>수정완료</AddBtn>
                <AddBtn className="delete" onClick={handleEditMode}>
                  취소
                </AddBtn>
              </AddBtnWrapper>
            ) : (
              <AddBtnWrapper>
                <AddBtn onClick={handleEditMode}>스케줄 수정</AddBtn>
                <AddBtn onClick={handleDeleteSchedule} className="delete">
                  스케줄 삭제
                </AddBtn>
              </AddBtnWrapper>
            )}
            <ErrMsg>* 스케쥴 이름과 이모지만 수정 가능</ErrMsg>
            <ErrMsg className="centered">{errMessage}</ErrMsg>
          </AddDiv>
        </AddScheduleWrapper>
      </BoxSection>
    </Layout>
  );
}
