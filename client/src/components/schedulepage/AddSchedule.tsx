import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { BoxHeader, BoxSection } from "../../style/theme";
import DatePicker from "react-datepicker";
import "./react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { selectBoxOptions } from "./ScheduleDummy";
import { addNewSchedule } from "../../redux/actions/scheduleActions";
import axios from "axios";
import EmojiBox from "./EmojiBox";
import { useEffect } from "react";
import { useCallback } from "react";

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

export default function AddSchedule() {
  const tmpData = {
    id: 'ObjectId("619f0e9722f97d6e8631291d")',
    scheduleName: "22년 2월",
    createdAt: "2021-12-01 01:01:01",
    scheduleEmoji: "💬",
    period: "2022-02-01",
    group: {
      groupId: 1,
      groupName: "당직 1팀",
    },
    contents: [
      {
        contentId: 1,
        date: "2022-02-04",
        team: [
          {
            work: {
              workId: 1,
              workName: "D",
            },
            members: [
              {
                memberId: 1,
                memberName: "김코딩 이코딩 박코딩",
              },
            ],
          },
          {
            work: {
              workId: 2,
              workName: "E",
            },
            members: [
              {
                memberId: 1,
                memberName: "김해커 이해커 박해커",
              },
            ],
          },
          {
            work: {
              workId: 3,
              workName: "N",
            },
            members: [
              {
                memberId: 1,
                memberName: "김자바 이자바 박자바",
              },
            ],
          },
        ],
      },
      {
        contentId: 2,
        date: "2022-02-05",
        team: [
          {
            work: {
              workId: 1,
              workName: "D",
            },
            members: [
              {
                memberId: 1,
                memberName: "김코딩 이코딩 박코딩",
              },
            ],
          },
          {
            work: {
              workId: 2,
              workName: "E",
            },
            members: [
              {
                memberId: 1,
                memberName: "김해커 이해커 박해커",
              },
            ],
          },
          {
            work: {
              workId: 3,
              workName: "N",
            },
            members: [
              {
                memberId: 1,
                memberName: "김자바 이자바 박자바",
              },
            ],
          },
        ],
      },
    ],
  };

  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState<any>(new Date());

  const [scheduleInfo, setScheduleInfo] = useState({
    groupId: "",
    scheduleName: "",
    scheduleEmoji: "",
    period: "",
  });

  //스케쥴 생성 함수(만들예정)
  const handleNewSchedule = (): void => {
    // console.log()
    axios
      .post(
        `https://server.schedule24-7.link/schedule/${scheduleInfo.groupId}`,
        {
          scheduleName: scheduleInfo.scheduleName,
          scheduleEmoji: scheduleInfo.scheduleEmoji,
          period: scheduleInfo.period,
        },
        {
          headers: {
            authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => alert("새스케쥴추가성공"));
    // dispatch(addNewSchedule(tmpData));
  };

  const handleSelectInfo =
    (key: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      setScheduleInfo({ ...scheduleInfo, [key]: e.target.value });
    };

  const handleTextInfo =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setScheduleInfo({ ...scheduleInfo, [key]: e.target.value });
    };

  const handleEmoji = useCallback((emoji: string): void => {
    setScheduleInfo({ ...scheduleInfo, scheduleEmoji: emoji });
  }, []);

  useEffect(() => {
    let newDate = new Date(startDate);
    let result = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-01`;
    setScheduleInfo({ ...scheduleInfo, period: result });
  }, [startDate]);

  return (
    <BoxSection>
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
            <div>
              <EmojiBox options={selectBoxOptions} handleEmoji={handleEmoji} />
              <NameBox
                type="text"
                onChange={handleTextInfo("scheduleName")}
                placeholder="스케쥴 이름 입력"
              />
            </div>
          </DivWrapper>
          <DivWrapper>
            <Title>그룹선택</Title>
            <TeamSelect onChange={handleSelectInfo("groupId")}>
              <option>팀선택</option>
              <option value={"당직1팀"}>당직1팀</option>
              <option value={"당직2팀"}>당직2팀</option>
              <option value={"당직3팀"}>당직3팀</option>
            </TeamSelect>
          </DivWrapper>
          <DivWrapper>
            <Title>날짜선택</Title>
            <DatePicker
              locale={ko}
              selected={startDate}
              dateFormat="MM/yyyy"
              onChange={(date: any) => {
                // console.log(result);
                setStartDate(date);
              }}
              showMonthYearPicker
              showFullMonthYearPicker
            />
          </DivWrapper>
          <AddBtn onClick={handleNewSchedule}>스케쥴생성</AddBtn>
        </AddDiv>
      </AddScheduleWrapper>
    </BoxSection>
  );
}
