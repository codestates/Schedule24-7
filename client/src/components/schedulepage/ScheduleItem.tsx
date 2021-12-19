import styled from "styled-components";
import { mediaQuery } from "../../GlobalStyle";

export const Box = styled.div`
  min-width: 5rem;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0.05rem 0.05rem 0.1rem rgba(0, 0, 0, 0.151);
  border: 1px solid rgba(0, 0, 0, 0.199);
  margin: 0.1rem;
  align-items: center;
  justify-content: center;
  padding: 2px;
  /* padding: 0 200px 0 200px; */

  ${mediaQuery.mobile} {
    min-width: 5px;
    max-width: 200px;
    margin: 0;
    box-shadow: none;
    border-radius: 3px;
    padding: 0px;
  }
`;

export const Worksdiv = styled.div`
  width: inherit;
  display: flex;
  flex-direction: column;
  height: 77px;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.1rem;
  overflow: hidden;
`;

export const Day = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #444444;
  margin-left: 0.3rem;

  ${mediaQuery.mobile} {
    font-size: 12px;
  }
`;

export const WorkWrapper = styled.div`
  display: flex;
  margin: 0.1rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
`;

export const Work = styled.div`
  color: #444444;
  font-size: 14px;
  margin-right: 0.3rem;
  margin-left: 0.1rem;
  border-right: 1px solid #d3d3d3;
  padding-right: 0.3rem;

  ${mediaQuery.mobile} {
    margin-left: 1px;
    font-size: 8px;
    margin-right: 1px;
    padding-right: 1px;
  }
`;

export const Worker = styled.div`
  border-radius: 5px;
  max-width: 10rem;
  height: 14px;
  color: #ffffff;
  padding: 0.2rem 0.5rem;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  padding-bottom: 3px;

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
    height: 10px;
    font-size: 10px;
    border-radius: 3px;
    padding: 2px;
  }
`;

export const SingleWorker = styled.span`
  margin-right: 5px;
  text-overflow: ellipsis;

  ${mediaQuery.mobile} {
    width: 3px;
    margin-right: 1px;
  }
`;

export default function ScheduleItem({ DayNum, NewDummy }: any) {
  let viewData: any;
  if (NewDummy !== undefined) {
    viewData = NewDummy.contents.filter((el: any) => {
      let tmp1 = el.date.split(",");
      let tmp2 = tmp1[0].split("/");
      if (tmp2[0] < 10) {
        tmp2[0] = `0${tmp2[0]}`;
      }
      if (tmp2[1] < 10) {
        tmp2[1] = `0${tmp2[1]}`;
      }
      let result = `${tmp2[2]}-${tmp2[0]}-${tmp2[1]}`;
      return result === DayNum;
    });
  }

  const handleOpenEdit = () => {
    window.location.replace(
      `/schedule/editworker/${NewDummy.group.groupId}/${NewDummy._id}/${viewData[0].contentId}`
    );
  };

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
                <WorkWrapper onClick={() => handleOpenEdit()} key={idx}>
                  <Work>{el.work.workName}</Work>
                  {
                    <Worker className={className}>
                      {el.members.map((el: any) => {
                        return <SingleWorker>{el.memberName}</SingleWorker>;
                      })}
                    </Worker>
                  }
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
