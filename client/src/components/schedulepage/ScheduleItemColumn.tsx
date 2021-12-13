import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { mediaQuery } from "../../GlobalStyle";
import {
  addCurrentGroupId,
  addCurrentView,
} from "../../redux/actions/scheduleActions";

export const Box = styled.div`
  display: flex;
  min-width: 5rem;
  min-height: 40px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 3px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(0, 0, 0, 0.15);
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
  ${mediaQuery.mobile} {
    flex-direction: column;
    padding: 3px;
  }
`;

export const Day = styled.span`
  font-size: 14px;
  font-weight: bold;
  width: 30px;
  color: #494949;
  margin-left: 0.3rem;
  text-align: center;
  ${mediaQuery.mobile} {
    font-size: 11px;
    width: 12px;
  }
`;

export const WorkWrapper = styled.div`
  display: flex;
  margin: 0.5rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${mediaQuery.mobile} {
    margin: 2px;
  }
`;

export const Work = styled.div`
  color: #444444;
  font-size: 15px;
  margin-right: 0.3rem;
  margin-left: 0.3rem;
  ${mediaQuery.mobile} {
    font-size: 13px;
    /* margin: 0.1rem; */
  }
`;

export const Worker = styled.div`
  display: flex;
  border-radius: 5px;
  color: #ffffff;
  justify-content: center;
  align-items: center;
  padding: 0.2rem 0.5rem;
  font-size: 14px;

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
    font-size: 13px;
    max-width: 300px;
    border-radius: 5px;
    /* flex-direction: column; */
  }
`;

export const SingleWorker = styled.div`
  margin: 0.2rem;
`;

export default function ScheduleItemColumn({ DayNum, NewDummy }: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleOpenEdit = (data: any, id: string) => {
    dispatch(addCurrentView(data));
    dispatch(addCurrentGroupId(id));
    navigate(
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
                <WorkWrapper
                  onClick={() =>
                    handleOpenEdit(viewData, NewDummy.group.groupId)
                  }
                  key={idx}
                >
                  <Work>{el.work.workName}</Work>
                  <Worker className={className}>
                    {el.members.map((el: any) => {
                      return <SingleWorker>{el.memberName}</SingleWorker>;
                    })}
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
