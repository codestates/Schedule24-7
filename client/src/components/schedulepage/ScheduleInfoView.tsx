import styled from "styled-components";
import { mediaQuery } from "../../GlobalStyle";

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

export const Div1 = styled.div`
  display: flex;
  align-items: center;
`;

export const Div2 = styled.div`
  width: 288px;
  height: 42px;
  /* padding-top: 13px; */
  padding-left: 10px;
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  margin-left: 2px;
  background-color: white;
  display: flex;
  align-items: center;

  &.sub {
    width: 233px;
  }

  ${mediaQuery.mobile} {
    max-width: 203px;
  }
`;

export const EmojiDiv = styled.div`
  width: 50px;
  height: 35px;
  padding-top: 7px;
  text-align: center;
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  background-color: white;
`;

export default function ScheduleInfoView({ currentSchedule }: any) {
  return (
    <>
      <DivWrapper>
        <TitleHeader>스케줄 정보</TitleHeader>
      </DivWrapper>
      <DivWrapper>
        <Title>스케줄 이름</Title>
        <Div1>
          <EmojiDiv>{currentSchedule[0].scheduleEmoji}</EmojiDiv>
          <Div2 className="sub">
            <span>{currentSchedule[0].scheduleName}</span>
          </Div2>
        </Div1>
      </DivWrapper>
    </>
  );
}
