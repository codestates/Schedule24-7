import styled from "styled-components";

export const Box = styled.div`
  min-width: 5rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0.05rem 0.05rem 0.1rem rgba(0, 0, 0, 0.25);
  border: 0.01rem solid rgba(0, 0, 0, 0.15);
  margin: 0.1rem;
  align-items: center;
  justify-content: center;
`;

export const Worksdiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 77px;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.1rem;
`;

export const Day = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #444444;
  margin-left: 0.3rem;
`;

export const WorkWrapper = styled.div`
  display: flex;
  margin: 0.1rem;
  justify-content: center;
  align-items: center;
`;

export const Work = styled.div`
  color: #444444;
  width: 1rem;
  font-size: 15px;
  margin-right: 0.1rem;
  margin-left: 0.1rem;
`;

export const Worker = styled.div`
  display: flex;
  border-radius: 1rem;
  max-width: 10rem;
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
`;

export default function ScheduleItem({ DayNum, NewDummy }: any) {
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
