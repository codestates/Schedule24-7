import styled from "styled-components";
import { mediaQuery } from "../../GlobalStyle";

export const Box = styled.div`
  display: flex;
  min-width: 5rem;
  min-height: 40px;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 3px rgba(0, 0, 0, 0.25);
  border: 0.01rem solid rgba(0, 0, 0, 0.15);
  margin: 0.1rem;
  align-items: center;
`;

export const Worksdiv = styled.div`
  display: flex;
  width: 100%;
  min-height: 77px;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.1rem;
  flex: 1 1 auto;
`;

export const Day = styled.span`
  font-size: 14px;
  font-weight: bold;
  width: 30px;
  /* height: 20px;
  padding-top: 5px;
  border-radius: 50%; */
  color: #494949;
  margin-left: 0.3rem;
  /* background-color: #494949; */
  text-align: center;
  ${mediaQuery.mobile} {
    font-size: 11px;
    width: 12px;
  }
`;

export const WorkWrapper = styled.div`
  display: flex;
  /* width: 100%; */
  margin: 0.5rem;
  justify-content: center;
  align-items: center;
  ${mediaQuery.mobile} {
    margin: 0.2rem;
  }
`;

export const Work = styled.div`
  color: #444444;
  width: 1rem;
  font-size: 15px;
  margin-right: 0.1rem;
  margin-left: 0.1rem;
  ${mediaQuery.mobile} {
    font-size: 11px;
  }
`;

export const Worker = styled.div`
  display: flex;
  border-radius: 1rem;
  /* max-width: 10rem; */
  color: #ffffff;
  justify-content: center;
  align-items: center;
  padding: 0.2rem 0.5rem;
  font-size: 13px;

  &.a {
    background-color: #fdb137;
  }
  &.b {
    background-color: #f36648;
  }
  &.c {
    background-color: #4152a4;
  }

  ${mediaQuery.mobile} {
    font-size: 11px;
    max-width: 6rem;
  }
`;

export default function ScheduleItemColumn({ DayNum, NewDummy }: any) {
  // console.log(NewDummy[0]);
  let viewData: any;
  if (NewDummy !== undefined) {
    viewData = NewDummy[0].contents.filter((el: any) => {
      return el.date === DayNum;
    });
  }

  // console.log(viewData);

  return (
    <Box>
      <Day>{DayNum.split("-")[2]}</Day>
      {viewData !== undefined ? (
        viewData.length !== 0 ? (
          <Worksdiv>
            {viewData[0].team.map((el: any, idx: number) => {
              let classes: string[] = ["a", "b", "c"];
              let className = classes[idx];
              return (
                <WorkWrapper key={idx}>
                  <Work>{el.work.workName}</Work>
                  <Worker className={className}>
                    {el.members[0].memberName}
                  </Worker>
                </WorkWrapper>
              );
            })}
          </Worksdiv>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </Box>
  );
}
