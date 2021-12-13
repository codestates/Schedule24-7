import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { mediaQuery } from "../../GlobalStyle";
import {
  addCurrentGroupId,
  addCurrentView,
} from "../../redux/actions/scheduleActions";

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
  cursor: pointer;
`;

export const Work = styled.div`
  color: #444444;
  /* width: 1rem; */
  font-size: 15px;
  margin-right: 0.3rem;
  margin-left: 0.1rem;
`;

export const Worker = styled.div`
  display: flex;
  border-radius: 1rem;
  max-width: 10rem;
  height: 13px;
  color: #ffffff;
  justify-content: left;
  /* align-items: center; */
  padding: 0.2rem 0.5rem;
  font-size: 13px;
  overflow: hidden;

  &.a {
    background-color: #fdb137;
  }
  &.b {
    background-color: #f36648;
  }
  &.c {
    background-color: #4152a4;
  }

  /* ${mediaQuery.mobile} {
    width: 45px;
  } */
`;

export const SingleWorker = styled.div`
  margin-right: 5px;
  /* ${mediaQuery.mobile} {
    width: 45px;
  } */
`;

export default function ScheduleItem({ DayNum, NewDummy }: any) {
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

{
  /* <Worker className={className}>
{el.members[0].memberName}
</Worker> */
}
