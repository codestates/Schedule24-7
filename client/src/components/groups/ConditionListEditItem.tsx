import { FC, useState, useCallback, ChangeEvent, useEffect } from "react";
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
import swal from "sweetalert";

const Block = styled.div`
  width: 300px;
  min-height: 190px;
  margin-left: 5px;
  margin-bottom: 7px;
  display: flex;
  flex-direction: column;

  &.edit {
    display: none;
  }
`;

const DescBlock = styled.div`
  display: flex;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  border-bottom: 1px solid rgba(170, 170, 170, 0.21);
  padding: 1px;

  > .conditiontitle {
    display: flex;
    font-size: 14px;
    line-height: 20px;
    justify-content: flex-end;
    align-items: flex-end;
    font-style: bold;
    width: 65px;
  }

  > .conditionvalue {
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
`;
const WorkSelect = styled.select`
  width: 208px;
  min-height: 24px;
  margin-left: 40px;
  padding-left: 10px;
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;

  background-color: white;

  > .inputValue {
    width: 100%;
    height: 100%;
  }
`;

const WorkInput = styled.div`
  width: 208px;
  height: 24px;
  margin-left: 40px;

  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  background-color: white;

  > .inputValue {
    width: 90%;
    height: 90%;
    margin-left: 0px;
    padding-left: 15px;
    border: none;
  }
`;

const EditBlock = styled.div`
  width: 310px;
  min-height: 350px;
  margin-left: 5px;
  display: flex;
  flex-direction: column;

  &.edit {
    display: none !important;
  }
`;

interface Props {
  target: string;
  cycle: string;
  workId: number;
  operation: string;
  value: number;
  conditionId: number;
  workName: string;
}

interface ConditionAddState {
  conditionName: string;
  conditionDesc: string;
  target: string;
  cycle: string;
  workId: number;
  operation: string;
  value: number;
  workName: string;
}

const MemberListEditItem: FC<Props> = ({
  target,
  cycle,
  workId,
  operation,
  value,
  conditionId,
  workName,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [formState, setFromState] = useState<ConditionAddState>({
    conditionName: "?????????",
    conditionDesc: "??????????????? ???????????????",
    target: "all",
    cycle: "monthly",
    workId: 1,
    operation: "<",
    value: 1,
    workName: "",
  });
  const groups = useSelector((store: RootState) => store.group.groups);
  const selectGroup = groups.find((item) => item._id === groupId) ?? null;

  useEffect(() => {
    if (selectGroup === null) return;

    const selectCondition = selectGroup.conditions.find(
      (condition) => condition.conditionId === conditionId
    );

    if (selectCondition === undefined) return;

    setFromState({
      ...selectCondition,
    });
  }, [selectGroup, conditionId]);

  const [isEdit, setIsEdit] = useState(false);
  const handleButton = () => {
    setIsEdit(true);
  };
  const handleCancleButton = () => {
    setIsEdit(false);
  };
  const deleteCondition = async () => {
    try {
      await deleteGroupConditionApi({
        groupId: groupId as string,
        conditionId,
      });
      const response = await getGroupsApi();
      dispatch(getGroups(response.data));
      handleCancleButton();
      swal({
        title: "???????????? ??????",
        icon: "success",
      });
    } catch (err) {
      swal({
        title: " ???????????? ??????",
        icon: "error",
      });
    }
  };

  const changeNumInputHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      const numValue = parseInt(value);

      setFromState((prev) => ({
        ...prev,
        [name]: isNaN(numValue) ? value : numValue,
      }));
    },
    []
  );

  const changeInputHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      setFromState((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const updateCondition = async () => {
    const {
      conditionName,
      conditionDesc,
      target,
      cycle,
      workId,
      operation,
      value,
    } = formState;
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
      swal({
        title: "???????????? ??????",
        icon: "success",
      });
      navigate(`/group/${groupId}/condition`);
    } catch (err) {
      swal({
        title: "??????????????? ??????????????????",
        icon: "error",
      });
    }
  };

  return (
    <>
      <Block className={isEdit ? "edit" : ""}>
        <DescBlock>
          <div className="conditiontitle">??????</div>
          {target === "all" ? (
            <div className="conditionvalue">?????? ??????</div>
          ) : null}
        </DescBlock>
        <DescBlock>
          <div className="conditiontitle">??????</div>
          {cycle === "monthly" ? (
            <div className="conditionvalue">??????</div>
          ) : cycle === "weekly" ? (
            <div className="conditionvalue">??????</div>
          ) : null}
        </DescBlock>
        <DescBlock>
          <div className="conditiontitle">????????????</div>
          <div className="conditionvalue">{workName}</div>
        </DescBlock>
        <DescBlock>
          <div className="conditiontitle">?????? ???</div>
          <div className="conditionvalue">{value}</div>
        </DescBlock>
        <DescBlock>
          <div className="conditiontitle">??????</div>
          <div className="conditionvalue">??????</div>
        </DescBlock>
        <DescBlock className="button">
          <SmallButton
            title={"??????"}
            onClick={handleButton}
            color={"#5c5c5c"}
          />
          <SmallButton
            title={"??????"}
            onClick={deleteCondition}
            color={"#b60000"}
          />
        </DescBlock>
      </Block>
      <EditBlock className={isEdit ? "" : "edit"}>
        <DescBlock>
          <div className="conditiontitle">?????????</div>
          <WorkInput>
            <input
              className="inputValue"
              placeholder="???????????? ????????? ?????????"
              name="conditionName"
              onChange={changeInputHandler}
              value={formState.conditionName}
            />
          </WorkInput>
        </DescBlock>
        <DescBlock>
          <div className="conditiontitle">????????????</div>
          <WorkInput>
            <input
              className="inputValue"
              placeholder="??????????????? ????????? ?????????"
              name="conditionDesc"
              onChange={changeInputHandler}
              value={formState.conditionDesc}
            />
          </WorkInput>
        </DescBlock>
        <DescBlock>
          <div className="conditiontitle">??????</div>
          <WorkSelect
            name="target"
            onChange={changeInputHandler}
            value={formState.target}
          >
            <option value="all">????????????</option>
          </WorkSelect>
        </DescBlock>
        <DescBlock>
          <div className="conditiontitle">??????</div>
          <WorkSelect
            name="cycle"
            onChange={changeInputHandler}
            value={formState.cycle}
          >
            <option value="monthly">??????</option>
            <option value="weekly">??????</option>
          </WorkSelect>
        </DescBlock>
        <DescBlock>
          <div className="conditiontitle">????????????</div>
          <WorkSelect
            name="workId"
            onChange={changeNumInputHandler}
            value={formState.workId}
          >
            {selectGroup
              ? selectGroup.works.map((item) => (
                  <option value={item.workId}>{item.workName}</option>
                ))
              : null}
          </WorkSelect>
        </DescBlock>
        <DescBlock>
          <div className="conditiontitle">?????? ???</div>
          <WorkInput>
            <input
              className="inputValue"
              placeholder="????????? ????????? ?????????"
              name="value"
              onChange={changeNumInputHandler}
              value={Number(formState.value)}
            />
          </WorkInput>
        </DescBlock>
        <DescBlock>
          <div className="conditiontitle">??????</div>
          <WorkSelect
            name="operation"
            onChange={changeInputHandler}
            value={formState.operation}
          >
            <option> {String("??????")}</option>
          </WorkSelect>
        </DescBlock>
        <DescBlock className="button">
          <SmallButton
            title={"??????"}
            onClick={updateCondition}
            color={"#5c5c5c"}
          />
          <SmallButton
            title={"??????"}
            onClick={handleCancleButton}
            color={"#b60000"}
          />
        </DescBlock>
      </EditBlock>
    </>
  );
};

export default MemberListEditItem;
