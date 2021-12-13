import { FC, useState, ChangeEvent, useCallback, useEffect } from "react";
import styled from "styled-components";
import { DefaultLayout, hideMobileCss, mediaQuery } from "../../GlobalStyle";
import SmallButton from "./SmallButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getGroupsApi, createGroupConditionApi } from "../../lib/api/group";
import { useParams } from "react-router";
import { RootState } from "../../redux/reducers";
import { getGroups } from "../../redux/actions/Group";

const DescBlock = styled.div`
  display: flex;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  border-bottom: 1px solid rgba(170, 170, 170, 0.21);
  padding: 1px;

  > #conditiontitle {
  display: flex;
  font-size: 16px;
  line-height: 20px;
  justify-content: flex-end;
  align-items: flex-end;
  font-style: bold;
  width: 60px;
  }

  > #conditionvalue {
  margin-left: 40px;
  display: flex;
  font-size: 16px;
  justify-content: flex-start;
  align-items: flex-end;
  font-style: bold;
  width: 200px;
  }

  &.button {
  margin-top: 15px;
  margin-right: 20px;
  justify-content: space-between;
  border-style: none;
  }
`

const WorkSelect = styled.select`
  width: 208px;
  height: 24px;
  margin-left:40px;
  padding-left: 10px;
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;

  background-color: white;

    >.inputValue{
    width: 100%;
    height: 100%;
`;

const WorkInput = styled.div`
  width: 208px;
  height: 24px;
  margin-left:40px;

  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  background-color: white;
  
  >.inputValue{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: none;
`;

const EditBlock = styled.div`
  width: 370px;
  min-height: 250px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 3px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  border: 0.01rem solid rgba(0, 0, 0, 0.15);
  padding-top: 10px;
  padding-bottom: 10px;
`;

interface ConditionAddState {
  conditionName: string,
  conditionDesc: string,
  target: string,
  cycle: string,
  workId: number,
  operation: string,
  value: number
}

interface Props {
  groupId: string | undefined;
  handleAddCancle: () => void;
}

const AddConditionList: FC<Props> = ({groupId, handleAddCancle}) => {
  const groups = useSelector((store: RootState) => store.group.groups);
  const selectGroup = groups.find((item) => item._id === groupId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formState, setFromState] = useState<ConditionAddState>({
    conditionName: "조건명",
    conditionDesc: "조건설명을 적어주세요",
    target: "all",
    cycle: "monthly",
    workId: 1,
    operation: "<",
    value: 1    
  });
  const selectWork = selectGroup?.works.find((item) => item.workId === formState.workId)
  console.log(selectWork, 1)
  console.log(selectGroup, 2)
  
   const changeInputHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFromState((prev) => ({
      ...prev,
      [name]: value,
    }));
   }, []);
  
   const changeSelectHandler = useCallback((e: ChangeEvent<HTMLSelectElement >) => {
    const { name, value } = e.target;
    setFromState((prev) => ({
      ...prev,
      [name]: value,
    }));
   }, []);
      
  const [isEdit, setIsEdit] = useState(false)
  const handleButton = () => {
    setIsEdit(true)
  }
   const handleCancleButton = () => {
    setIsEdit(false)
   }
  
  const createCondition = async () => {
    setFromState((prev) => ({
      ...prev,
      conditionName: `모든인원 ${formState.cycle === "monthly" ? "월간" : "주간"} 연속 ${formState.value}회 ${formState.workId} 불가`
    }))
    const { conditionName, conditionDesc, target, cycle,  workId, operation, value , } = formState;
    try {
      await createGroupConditionApi({
        groupId,
        conditionName,
        conditionDesc,
        target,
        cycle,
        workId,
        operation,
        value,  
      });
      const response = await getGroupsApi();
      dispatch(getGroups(response.data));
      alert("조건생성 완료!");
      navigate(`/group/${groupId}/condition`);
      handleAddCancle()
    } catch (err) {
      alert("조건 생성 실패!")
    }
  };

 
  return (
    <>
      <EditBlock>
         <DescBlock>        
          <div id="conditiontitle">조건설명</div>
         <WorkInput>
            <input
              className="inputValue"
              placeholder="조건설명을 입력해 주세요"
              name="conditionDesc"
              onChange={changeInputHandler}
              value={formState.conditionDesc}
            />
          </WorkInput>
        </DescBlock>
        <DescBlock>        
          <div id="conditiontitle">대상</div>
          <WorkSelect
              name="target"
              onChange={changeSelectHandler}
              value={formState.target}          
          >
              <option value="all">모든인원</option>
           </WorkSelect>
        </DescBlock>
        <DescBlock>            
          <div id="conditiontitle">주기</div>
            <WorkSelect
              name="cycle"
              onChange={changeSelectHandler}
              value={formState.cycle}   
            >
              <option value="monthly">월간</option>
              <option value="weekly">주간</option>
           </WorkSelect>
        </DescBlock>
        <DescBlock>            
          <div id="conditiontitle">대상근무</div>
            <WorkSelect
              name="workId"
              onChange={changeSelectHandler}
              value={formState.workId}          
          >
            {typeof selectGroup === "undefined"
              ? null
              : selectGroup.works.map((item) => ( 
                <option value={item.workId}>{item.workName}</option>                
            ))}

           </WorkSelect>
        </DescBlock>
        <DescBlock>            
          <div id="conditiontitle">연산자</div>
            <WorkSelect
              name="operation"
              onChange={changeSelectHandler}
              value={formState.operation}   
          
            >
            <option> { String("<")}</option>
           </WorkSelect>
        </DescBlock>
        <DescBlock>            
          <div id="conditiontitle">값</div>
          <WorkInput>
            <input
              className="inputValue"
              placeholder="숫자를 입력해 주세요"
              name="value"
              onChange={changeInputHandler}
              value={Number(formState.value)}
            />
          </WorkInput>
        </DescBlock>
        <DescBlock className="button">        
          <SmallButton
          title={"생성"}
          onClick={createCondition }
          color={"black"}
          />
          <SmallButton
          title={"취소"}
          onClick={handleAddCancle}
          color={"grey"}
          />
        </DescBlock>          
      </EditBlock >
    </>
   

  );
};

export default AddConditionList;