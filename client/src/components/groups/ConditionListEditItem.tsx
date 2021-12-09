import { FC, useState, useCallback, ChangeEvent } from "react";
import styled from "styled-components";
import { DefaultLayout, hideMobileCss, mediaQuery } from "../../GlobalStyle";
import SmallButton from "./SmallButton";
import { getGroupsApi } from "../../lib/api/group";
import { getGroups } from "../../redux/actions/Group";
import { deleteGroupConditionApi } from "../../lib/api/group";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { updateGroupConditionApi } from "../../lib/api/group";

const Block = styled.div`
  position: absolute;
  width: 330px;
  height: 190px;
  margin-top: 70px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;

  &.edit {
    display: none; !important
  }
`;

const DescBlock = styled.div`
  display: flex;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  border-bottom: 1px solid rgba(170, 170, 170, 0.21);
  padding: 1px;

  > #conditiontitle {
  display: flex;
  font-size: 14px;
  line-height: 20px;
  justify-content: flex-end;
  align-items: flex-end;
  font-style: bold;
  width: 60px;
  }

  > #conditionvalue {
  margin-left: 40px;
  display: flex;
  font-size: 14px;
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
  position: absolute;
  width: 330px;
  height: 350px;
  margin-top: 70px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;

  &.edit {
  display: none; !important
  }
`;

interface Props {
  target: string,
  cycle: string,
  workId: number,
  operation: string,
  value: number
  conditionId: number
}

interface ConditionAddState {
  conditionName: string,
  conditionDesc: string,
  target: string,
  cycle: string,
  workId: number,
  operation: string,
  value: number
}

const MemberListEditItem: FC<Props> = ({ target, cycle, workId, operation, value, conditionId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { groupId } = useParams();
  const groups = useSelector((store: RootState) => store.group.groups);
  const selectGroup = (groups ? (groups.find((item) => item._id === groupId)) : (null))
    const [formState, setFromState] = useState<ConditionAddState>({
    conditionName: "조건명",
    conditionDesc: "조건설명을 적어주세요",
    target: "all",
    cycle: "monthly",
    workId: 1,
    operation: "<",
    value: 1    
    });
  const [isEdit, setIsEdit] = useState(false);
  const handleButton = () => {
    setIsEdit(true)
  }
   const handleCancleButton = () => {
    setIsEdit(false)
  }
   const deleteCondition= async () => {
    try {
      await deleteGroupConditionApi({
        groupId: groupId as string,
        conditionId,
      });
      const response = await getGroupsApi();
      dispatch(getGroups(response.data));
      alert("조건삭제 완료!");
      navigate(`/group/${groupId}/condition`);
    } catch (err) {
       alert("실패!")
    }
   };
  
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
  
    const updateCondition = async () => {
    const { conditionName, conditionDesc, target, cycle,  workId, operation, value , } = formState;
    try {
      await updateGroupConditionApi({
        groupId,
        conditionName,
        conditionDesc,
        target,
        cycle,
        workId,
        operation,
        value,
        conditionId,        
      });
      const response = await getGroupsApi();
      dispatch(getGroups(response.data));
      alert("조건수정 완료!");
      navigate(`/group/${groupId}/condition`);
    } catch (err) {
      alert("땡!")
    }
  };
  
  return (
    <>
      <Block className={isEdit ? "edit" : ""}>
        <DescBlock>        
          <div id="conditiontitle">대상</div>
          <div id="conditionvalue">{target} </div>
        </DescBlock>
        <DescBlock>            
          <div id="conditiontitle">주기</div>
          <div id="conditionvalue">{cycle}</div>
        </DescBlock>
        <DescBlock>            
          <div id="conditiontitle">대상근무</div>
          <div id="conditionvalue">{target}</div>
        </DescBlock>
        <DescBlock>            
          <div id="conditiontitle">연산자</div>
          <div id="conditionvalue">{operation}</div>
        </DescBlock>
        <DescBlock>            
          <div id="conditiontitle">값</div>
          <div id="conditionvalue">{value}</div>
        </DescBlock>
        <DescBlock className="button">        
          <SmallButton
          title={"수정"}
          onClick={handleButton}
          color={"black"}
          />
          <SmallButton
          title={"삭제"}
          onClick={deleteCondition}
          color={"red"}
          />
        </DescBlock>          
      </Block>
      <EditBlock className={isEdit ? "" : "edit" }>
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
            {selectGroup ?
              selectGroup.works.map((item) => (
                <option value={item.workId}>{item.workName}</option>                
            )) : null}

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
          title={"수정"}
          onClick={updateCondition }
          color={"black"}
          />
          <SmallButton
          title={"취소"}
          onClick={handleCancleButton}
          color={"grey"}
          />
        </DescBlock>           
      </EditBlock >
    </>
   

  );
};

export default MemberListEditItem;