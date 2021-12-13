import axios from "axios";
import { MouseEvent, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getGroupsApi } from "../../lib/api/group";
import { getGroups } from "../../redux/actions/Group";
import { addCurrentView } from "../../redux/actions/scheduleActions";
import { RootState } from "../../redux/reducers";
import { BoxHeader, BoxSection } from "../../style/theme";
import Layout from "../Layout";

export const EditScheduleWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;
`;

export const ListDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  width: 450px;
  height: 350px;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #cacacac0;
  box-shadow: 1px 1px 1px #cacaca57;
`;

export const TitleHeader = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin: 0.5rem;
`;

export const Wrapper = styled.div`
  display: flex;
`;

export const WorkNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const WorkName = styled.div`
  display: flex;
  width: 40px;
  height: 31px;
  padding-top: 13px;
  /* padding-left: 10px; */
  /* border: 1px solid #a5a5a5; */
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  margin: 0.2rem;
  background-color: #595959;
  color: white;
  justify-content: center;
`;

export const WorkerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 500px; */
`;

export const Worker = styled.div`
  display: flex;
  width: 400px;
  height: 42px;
  /* padding-top: 13px; */
  /* padding-left: 10px; */
  border: 1px solid #b4b4b4;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  margin: 0.2rem;
  background-color: white;
  justify-content: center;
  font-size: 14px;
`;

export const WorkerNameWrapper = styled.div`
  display: flex;
  :hover {
    background-color: #f0f0f0;
  }
`;

export const WorkerName = styled.div`
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 13px;
  margin-bottom: 13px;
`;

export const EditBtn = styled.button`
  width: 239px;
  height: 30px;
  color: white;
  box-shadow: 0.05rem 0.05rem 0.05rem #696969;
  border: 0px solid #a5a5a5;
  cursor: pointer;
  margin: 0.3rem;
  background-color: #808080;

  &.confirm {
    width: 45px;
    background-color: #5c5c5c;
  }
`;

export const DeleteBtn = styled.button`
  /* display: none; */
  border: none;
  background-color: white;
  margin-left: 0px;
  margin-right: 5px;
  margin-top: 13px;
  margin-bottom: 13px;
  color: white;
  cursor: pointer;
  :hover {
    background-color: #f0f0f0;
    color: black;
  }
`;

export const SelectBoxWrapper = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  padding-left: 4px;
  select {
    border: 1px solid #b4b4b4;
    margin: 2px;
    height: 30px;
  }
`;

export const EditList = styled.div`
  font-size: 14px;
  display: flex;
  > div {
    margin: 5px;
  }
`;

export const EditMemberList = styled.div`
  /* border: 1px solid black; */
  font-size: 14px;
`;

export default function WorkersInfo() {
  const dispatch = useDispatch();

  useEffect(() => {
    getGroupsApi().then((res) => {
      dispatch(getGroups(res.data));
      // dispatch(addCurrentView(scheduleData));
    });
  }, []);

  //스토어에서 데이터 불러오기
  const groups = useSelector((store: RootState) => store.group.groups);
  const scheduleData = useSelector((state: RootState) => state.scheduleReducer);

  //수정버튼 눌렀을 때 상태관리
  const [openEditBox, setOpenEditBox] = useState(false);

  //추가할 멤버 상태관리
  const [editWorker, setEditWorker] = useState<any[]>([]);
  const [editWorkerList, setEditWorkerList] = useState<any[]>([]);

  //최종적으로 추가할 멤버 리스트 정리된 것
  const [addWorkerlist, setAddWorkerList] = useState<any>(undefined);

  //멤버를 추가할 근무상태관리
  const [currentWork, setCurrentWork] = useState<any>(undefined);

  //원래 근무자들 명단
  const workers: any[] = scheduleData.currentView[0].team;

  //각종아이디 모음
  const groupId = scheduleData.groupId;
  const scheduleId = scheduleData.firstView.id;
  const contentId = scheduleData.currentView[0].contentId;

  //그룹에 존재하는 모든 멤버 불러오는 함수
  const members = groups.filter((el: any) => {
    return el._id === groupId;
  });

  //현재조회한 스케쥴 -> 수정할 맴버로 전송
  const [sendMember, setSendMember] = useState<any>(
    scheduleData.currentView[0]
  );

  //수정버튼 눌렀을 때 수정창 활성화 함수
  const handleWorkerEdit = () => {
    if (openEditBox) {
      setOpenEditBox(false);
    } else {
      setOpenEditBox(true);
    }
  };

  //추가할 명단 생성 함수
  const handleEditWorkerList = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let tmp = [...editWorker];
    // if (e.target.value !== undefined) {
    //   tmp.push(e.target.value);
    //   setEditWorker(tmp);
    // }

    tmp.push(e.target.value);
    setEditWorker(tmp);
    // console.log(tmp);
  };

  const handleWorkerSelect = () => {
    for (let i = 0; i < editWorker.length; i++) {
      let tmpIdx = members[0].members[editWorker[i]].memberId;
      let tmpMemberName = members[0].members[editWorker[i]].memberName;
      let tmpObj:any = { memberId: "", memberName: "" };
      tmpObj.memberId = tmpIdx;
      tmpObj.memberName = tmpMemberName;
      console.log(tmpObj);
      setEditWorkerList([...editWorkerList, tmpObj]);
    }
  };

  //근무자를 추가할 근무형태 선택함수
  const handleInputWork = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== undefined) {
      setCurrentWork(e.target.value);
    }
  };

  //멤버삭제함수
  const handleMemberDelete = (workidx: any, memberId: any) => {
    let tmp = workers[workidx];
    let deleteMember = tmp.members.filter((el: any) => {
      return el.memberId === memberId;
    });
    let result = tmp.members.filter((el: any) => {
      return el.memberId !== deleteMember[0].memberId;
    });

    let final = workers;
    final[workidx].members = result;

    setSendMember({ ...sendMember, team: final });

    axios
      .patch(
        `https://server.schedule24-7.link/schedule/${groupId}/${scheduleId}/${contentId}`,
        { team: sendMember.team },
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
        alert("수정완료");
      });
  };

  //멤버명단추가함수
  const handleScheduleEdit = (): void => {
    if (currentWork && editWorkerList.length !== 0) {
      let tmp = workers[currentWork].members;
      // console.log(tmp);
      editWorkerList.forEach((el: any) => {
        // let test = false;
        // for (let item of tmp) {
        //   if (item.workId === el.id) {
        //     test = true;
        //   }
        // }
        // if (!test) {
        //   tmp.push(el);
        //   test = false;
        // }
        tmp.push(el);
      });

      console.log(tmp);
      setAddWorkerList(tmp);
      setSendMember({ ...sendMember, members: addWorkerlist });

      axios
        .patch(
          `https://server.schedule24-7.link/schedule/${groupId}/${scheduleId}/${contentId}`,
          { team: sendMember.team },
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
          alert("수정완료");
          setEditWorkerList([]);
        });
    }
  };

  return (
    <Layout>
      <BoxSection>
        <BoxHeader>
          <span>스케쥴명단수정</span>
        </BoxHeader>
        {/* {console.log(groups)} */}
        {/* {console.log(scheduleData)} */}
        {/* {console.log(workers)} */}
        {/* {console.log(members)} */}
        {/* {console.log(groupId)} */}
        {/* {console.log(scheduleId)} */}
        {/* {console.log(contentId)} */}
        {console.log(editWorker)}
        {/* {console.log(result)} */}
        {/* {console.log(members[0].members)} */}
        {/* {console.log(editWorkerList)} */}
        {/* {console.log(result)} */}
        {/* {console.log(test)} */}
        {/* {console.log(currentWork)} */}
        {/* {console.log(list)} */}
        {/* {console.log(sendMember)} */}
        <EditScheduleWrapper>
          <ListDiv>
            <Wrapper>
              <TitleHeader>{sendMember.date.split(",")[0]}</TitleHeader>
              <TitleHeader>근무자명단</TitleHeader>
            </Wrapper>
            <Wrapper>
              <WorkNameWrapper>
                {workers.map((el: any) => {
                  return <WorkName>{el.work.workName}</WorkName>;
                })}
              </WorkNameWrapper>
              <WorkerWrapper>
                {workers.map((el: any, testIdx) => {
                  return (
                    <Worker>
                      {el.members.map((item: any) => {
                        return (
                          <WorkerNameWrapper>
                            <WorkerName>{item.memberName}</WorkerName>
                            <DeleteBtn
                              value={item.memberId}
                              onClick={() =>
                                handleMemberDelete(testIdx, item.memberId)
                              }
                            >
                              X
                            </DeleteBtn>
                          </WorkerNameWrapper>
                        );
                      })}
                    </Worker>
                  );
                })}
              </WorkerWrapper>
            </Wrapper>
            <EditBtn onClick={handleWorkerEdit}>수정</EditBtn>
            {openEditBox ? (
              <>
                <SelectBoxWrapper>
                  <select onChange={handleInputWork}>
                    <option value={undefined}>근무유형선택</option>
                    {workers.map((el: any, idx) => {
                      return (
                        <option key={idx} value={idx}>
                          {el.work.workName}
                        </option>
                      );
                    })}
                  </select>
                  <select onChange={handleEditWorkerList}>
                    <option value={undefined}>추가할근무자</option>
                    {members[0].members.map((el: any, idx) => {
                      return (
                        <option key={idx} value={el.memberId}>
                          {el.memberName}
                        </option>
                      );
                    })}
                  </select>
                  <EditBtn className="confirm" onClick={handleWorkerSelect}>
                    선택
                  </EditBtn>
                </SelectBoxWrapper>
                <EditList>
                  <div>추가할명단</div>
                  {/* {editWorker} */}
                  {editWorkerList.length !== 0
                    ? editWorkerList.map((el: any) => {
                        return <EditMemberList>{el.memberName}</EditMemberList>;
                      })
                    : ""}
                  <button onClick={handleScheduleEdit}>확인</button>
                </EditList>
              </>
            ) : (
              ""
            )}
          </ListDiv>
        </EditScheduleWrapper>
      </BoxSection>
    </Layout>
  );
}

// const currentSchedule = scheduleData.data.filter((el: any) => {
//   return (el.id = scheduleData.firstView.id);
// });
