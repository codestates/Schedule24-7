import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 5rem;
  /* height: 9rem; */
  /* box-shadow: 0.1rem 0.1rem 0.1rem gray; */
  /* border-radius: 0.5rem; */
  background-color: white;
  border: 1px solid black;
`;

export const Worksdiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

// interface Iprops {
//   Schedule: object;
// }

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
      <div>{DayNum.split("-")[2]}</div>
      {viewData.length !== 0 ? (
        <Worksdiv>
          <div>
            <span>{viewData[0].team[0].work.workName}</span>
            <span>{viewData[0].team[0].members[0].memberName}</span>
          </div>
          <div>
            <span>{viewData[0].team[1].work.workName}</span>
            <span>{viewData[0].team[1].members[0].memberName}</span>
          </div>
          <div>
            <span>{viewData[0].team[2].work.workName}</span>
            <span>{viewData[0].team[2].members[0].memberName}</span>
          </div>
        </Worksdiv>
      ) : (
        ""
      )}
    </Box>
  );
}

// export default function ScheduleItem({ Schedule }: any) {
//   return (
//     <Box>
//       <div>{Schedule.contentId}</div>
//       <Worksdiv>
//         <div>
//           <span>{Schedule.team[0].work.workName}</span>
//           <span>{Schedule.team[0].members[0].memberName}</span>
//         </div>
//         <div>
//           <span>{Schedule.team[1].work.workName}</span>
//           <span>{Schedule.team[1].members[0].memberName}</span>
//         </div>
//         <div>
//           <span>{Schedule.team[2].work.workName}</span>
//           <span>{Schedule.team[2].members[0].memberName}</span>
//         </div>
//       </Worksdiv>
//     </Box>
//   );
// }
