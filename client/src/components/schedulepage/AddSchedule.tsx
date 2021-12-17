import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { BoxHeader, BoxSection, ErrMsg } from "../../style/theme";
import DatePicker from "react-datepicker";
import "./react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { ScheduleDummy, selectBoxOptions } from "./ScheduleDummy";
import axios from "axios";
import EmojiBox from "./EmojiBox";
import { useEffect } from "react";
import { useCallback } from "react";
import { RootState } from "../../redux/reducers";
import { getGroupsApi } from "../../lib/api/group";
import { getGroups } from "../../redux/actions/Group";
import { useNavigate } from "react-router";
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
  /* align-items: center; */
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
  &.padding {
    padding-left: 20px;
  }

  ${mediaQuery.mobile} {
    &.date {
      padding-left: 20px;
    }
  }
`;

export const NameBox = styled.input`
  width: 230px;
  height: 40px;
  padding-left: 10px;
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  margin: 0.2rem;
  background-color: white;
  ${mediaQuery.mobile} {
    max-width: 190px;
  }
`;

export const TeamSelect = styled.select`
  width: 300px;
  height: 45px;
  padding-left: 10px;
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  margin: 0.2rem;
  background-color: white;
  ${mediaQuery.mobile} {
    max-width: 260px;
  }
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
  ${mediaQuery.mobile} {
    max-width: 260px;
  }
`;

export const Div1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Div2 = styled.div`
  width: 288px;
  height: 29px;
  padding-top: 13px;
  padding-left: 10px;
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  margin: 0.2rem;
  background-color: white;
  font-size: 13px;

  &.sub {
    width: 240px;
  }

  ${mediaQuery.mobile} {
    max-width: 260px;
  }
`;

export default function AddSchedule() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //데이트피커 날짜
  const [startDate, setStartDate] = useState<any>(new Date());

  //스케줄 입력 정보 상태
  const [scheduleInfo, setScheduleInfo] = useState({
    groupId: "",
    scheduleName: "",
    period: "",
  });

  //이모지 상태
  const [scheduleEmoji, setScheduleEmoji] = useState(
    ScheduleDummy[0].scheduleEmoji
  );

  //에러메시지 상태
  const [errMessage, setErrMessage] = useState<string>("");

  //그룹정보조회
  const groups = useSelector((store: RootState) => store.group.groups);

  //스케줄 생성 함수
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
        navigate(-1);
      })
      .catch((res) => {
        if (scheduleEmoji === "") {
          setErrMessage("이모지를 선택해주세요");
        } else if (scheduleInfo.scheduleName === "") {
          setErrMessage("스케줄 이름을 입력해주세요");
        } else if (scheduleInfo.groupId === "") {
          setErrMessage("그룹을 선택해주세요");
        } else if (res.message === "Request failed with status code 400") {
          swal({ title: "근무인원수가 부족합니다", icon: "error" });
        }
      });
  };

  //신규 스케줄 정보 저장 함수
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
      <BoxHeader>
        <span>신규 스케줄 생성</span>
      </BoxHeader>
      <AddScheduleWrapper>
        <AddDiv>
          <DivWrapper>
            <TitleHeader>신규 스케줄 생성 설정</TitleHeader>
          </DivWrapper>
          <DivWrapper>
            <Title>이름설정</Title>
            <Div1>
              <EmojiBox options={selectBoxOptions} handleEmoji={handleEmoji} />
              <NameBox
                type="text"
                onChange={handleTextInfo("scheduleName")}
                placeholder="스케줄 이름 입력"
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
            <Title className="date">날짜선택</Title>
            <Div1>
              <DatePicker
                locale={ko}
                selected={startDate}
                dateFormat="MM/yyyy"
                onChange={(date: any) => {
                  setStartDate(date);
                }}
                showMonthYearPicker
                showFullMonthYearPicker
              />
            </Div1>
          </DivWrapper>
          <AddBtn onClick={handleNewSchedule}>스케줄 생성</AddBtn>
          <ErrMsg className="centered">{errMessage}</ErrMsg>
        </AddDiv>
      </AddScheduleWrapper>
    </BoxSection>
  );
}
