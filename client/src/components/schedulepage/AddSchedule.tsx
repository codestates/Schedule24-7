import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { BoxHeader, BoxSection, ErrMsg } from "../../style/theme";
import DatePicker from "react-datepicker";
import "./react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { selectBoxOptions } from "./ScheduleDummy";
import {
  addNewSchedule,
  saveSchedule,
} from "../../redux/actions/scheduleActions";
import axios from "axios";
import EmojiBox from "./EmojiBox";
import { useEffect } from "react";
import { useCallback } from "react";
import { RootState } from "../../redux/reducers";
import { getGroupsApi } from "../../lib/api/group";
import { getGroups } from "../../redux/actions/Group";
import { useNavigate } from "react-router";

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
  width: 230px;
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

export const AddBtn = styled.button`
  width: 300px;
  height: 40px;
  color: white;
  box-shadow: 0.05rem 0.05rem 0.05rem #696969;
  border: 0px solid #a5a5a5;
  cursor: pointer;
  margin: 0.5rem;
  background-color: #5c5c5c;
`;

export const Div1 = styled.div`
  display: flex;
  align-items: center;
`;

export default function AddSchedule() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //데이트피커 날짜
  const [startDate, setStartDate] = useState<any>(new Date());

  //스케쥴 입력 정보 상태
  const [scheduleInfo, setScheduleInfo] = useState({
    groupId: "",
    scheduleName: "",
    period: "",
  });

  //이모지 상태
  const [scheduleEmoji, setScheduleEmoji] = useState("");

  //에러메시지 상태
  const [errMessage, setErrMessage] = useState<string>("");

  //그룹정보조회
  const groups = useSelector((store: RootState) => store.group.groups);

  //스케쥴 생성 함수
  const handleNewSchedule = (): void => {
    axios
      .post(
        `https://server.schedule24-7.link/schedule/${scheduleInfo.groupId}`,
        {
          scheduleName: scheduleInfo.scheduleName,
          scheduleEmoji: scheduleEmoji,
          period: scheduleInfo.period,
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
        alert("새스케쥴추가성공");
        navigate(-1);
      })
      .catch((err) => {
        setErrMessage(err.message);
      });
  };

  const handleSelectInfo =
    (key: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      setScheduleInfo({ ...scheduleInfo, [key]: e.target.value });
    };

  const handleTextInfo =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setScheduleInfo({ ...scheduleInfo, [key]: e.target.value });
    };

  const handleEmoji = useCallback(
    (emoji: string): void => {
      setScheduleEmoji(emoji);
    },
    [scheduleEmoji]
  );

  useEffect(() => {
    let newDate = new Date(startDate);
    let result = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-01`;
    setScheduleInfo({ ...scheduleInfo, period: result });
  }, [startDate]);

  return (
    <BoxSection>
      {/* {console.log(scheduleInfo)}
      {console.log(scheduleEmoji)} */}
      <BoxHeader>
        <span>신규스케쥴생성</span>
      </BoxHeader>
      <AddScheduleWrapper>
        <AddDiv>
          <DivWrapper>
            <TitleHeader>신규스케쥴 생성 설정</TitleHeader>
          </DivWrapper>
          <DivWrapper>
            <Title>이름설정</Title>
            <Div1>
              <EmojiBox options={selectBoxOptions} handleEmoji={handleEmoji} />
              <NameBox
                type="text"
                onChange={handleTextInfo("scheduleName")}
                placeholder="스케쥴 이름 입력"
              />
            </Div1>
          </DivWrapper>
          <DivWrapper>
            <Title className="sub">그룹선택</Title>
            <TeamSelect onChange={handleSelectInfo("groupId")}>
              <option>팀선택</option>
              {groups.map((el, idx) => {
                return (
                  <option key={idx} value={el._id}>
                    {el.groupName}
                  </option>
                );
              })}
            </TeamSelect>
          </DivWrapper>
          <DivWrapper>
            <Title>날짜선택</Title>
            <DatePicker
              locale={ko}
              // placeholder="날짜를 선택해주세요"
              selected={startDate}
              dateFormat="MM/yyyy"
              onChange={(date: any) => {
                setStartDate(date);
              }}
              showMonthYearPicker
              showFullMonthYearPicker
            />
          </DivWrapper>
          <AddBtn onClick={handleNewSchedule}>스케쥴생성</AddBtn>
          <ErrMsg className="centered">{errMessage}</ErrMsg>
        </AddDiv>
      </AddScheduleWrapper>
    </BoxSection>
  );
}
