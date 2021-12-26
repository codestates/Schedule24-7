import Layout from "../Layout";
import {
  FC,
  useState,
  useCallback,
  ChangeEvent,
} from "react";
import styled from "styled-components";
import { BoxHeader, BoxSection } from "../../style/theme";
import MultiColumnSelectBox from "../MultiColumnSelectBox";
import { selectBoxOptions } from "../groups/GroupDummydata";
import { useNavigate } from "react-router";
import { createGroupApi, getGroupsApi } from "../../lib/api/group";
import { useDispatch } from "react-redux";
import { getGroups } from "../../redux/actions/Group";
import swal from "sweetalert";

export const AddGroupWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;
`;

export const AddDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  width: 450px;
  height: 700px;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #cacacac0;
  box-shadow: 1px 1px 1px #cacaca57;
`;

export const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
`;

export const TitleHeader = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

export const NameBox = styled.input`
  width: 230px;
  height: 40px;
  padding-left: 10px;
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  margin: 0.2rem;
  background-color: white;
`;

export const WorkBox = styled.input`
  width: 269px;
  height: 42px;
  padding-left: 10px;
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  margin: 0.2rem;
  background-color: white;
`;

export const DescBox = styled.input`
  width: 285px;
  height: 42px;
  padding-left: 10px;
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  margin: 0.2rem;
  background-color: white;
`;

export const TeamSelect = styled.select`
  width: 300px;
  height: 45px;
  padding-left: 10px;
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  margin: 0.2rem;
  background-color: white;
`;

export const WorkSelect = styled.select`
  width: 235px;
  height: 45px;
  padding-left: 10px;
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  margin: 0.2rem;
  background-color: white;
`;

export const AddBtn = styled.button`
  width: 142px;
  height: 40px;
  color: white;
  box-shadow: 0.05rem 0.05rem 0.05rem #696969;
  border: 0px solid #a5a5a5;
  cursor: pointer;
  margin: 0.5rem;
  background-color: #5c5c5c;
`;


const AddBtnWrapper = styled.div`
  display: flex;
  border: none;
  background-color: #f9f9f9;
`;

export const Div1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 3px;
`;

interface GroupAddState {
  groupName: string;
  groupDesc: string;
  groupEmoji: string;
  works: GroupWork[];
}

interface GroupWork {
  workId: number;
  workName: string;
  limit: number;
}

const GropAddPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formState, setFromState] = useState<GroupAddState>({
    groupEmoji: "😃",
    groupDesc: "",
    groupName: "",
    works: [
      {
        workId: 1,
        workName: "",
        limit: 1,
      },
    ],
  });

  const renderWorkingForm = () => {
    const changeHandler =
      (idx: number, handler: (data: GroupWork, value: string) => GroupWork) =>
      (e: ChangeEvent<any>) => {
        setFromState({
          ...formState,
          works: formState.works.map((work, workIdx) =>
            workIdx === idx ? handler(work, e.target.value) : work
          ),
        });
      };
    const workNameHandler = (work: GroupWork, value: string): GroupWork => ({
      ...work,
      workName: value,
    });
    const workLimitHandler = (work: GroupWork, value: string): GroupWork => ({
      ...work,
      limit: Number(value),
    });
    const workIdHandler = (work: GroupWork, value: string): GroupWork => ({
      ...work,
      workId: Number(value),
    });

    return formState.works.map((work, targetIdx: number) => (
      <div>
        <div>
          {targetIdx + 1} :
          <WorkBox
            value={work.workName}
            onChange={changeHandler(targetIdx, workNameHandler)}
            type="text"
            placeholder="2글자 이하로 근무명을 입력해주세요"
          />
        </div>
        <div>
          근무인원 :
          <WorkSelect
            value={work.limit}
            onChange={changeHandler(targetIdx, workLimitHandler)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </WorkSelect>
        </div>
      </div>
    ));
  };

  const changeInputHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFromState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);
  const emojiHandler = useCallback((emoji: string) => {
    setFromState((prev) => ({
      ...prev,
      groupEmoji: emoji,
    }));
  }, []);
  const changeWorkCount = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const newCount = Number(e.target.value);
    setFromState((prev) => {
      const newWorks = Array(newCount)
        .fill(1)
        .map(
          (_, idx) =>
            prev.works[idx] ?? { limit: 1, workName: "", workId: idx + 1 }
        );
      return {
        ...prev,
        works: newWorks,
      };
    });
  }, []);
  const handleClickLink = useCallback(() => {
    navigate("/group");
  }, [navigate]);
  const createGroup = async () => {
    const { groupDesc, groupEmoji, groupName, works } = formState;

    try {
      await createGroupApi({
        groupDesc,
        groupEmoji,
        groupName,
        works,
      });
      const response = await getGroupsApi();
      dispatch(getGroups(response.data));
      swal({
        title: "그룹생성 완료",
        icon: "success",
        });
      navigate("/group");
    } catch (err) {
      swal({
        title: "모든항목을 입력해주세요",
        icon: "error",
      });
    }
  };

  return (
    <Layout title="그룹생성">
      <BoxSection>
        <BoxHeader>
          <span>신규그룹생성</span>
        </BoxHeader>
        <AddGroupWrapper>
          <AddDiv>
            <DivWrapper>
              <TitleHeader>신규그룹 기본 설정</TitleHeader>
            </DivWrapper>
            <DivWrapper>
              <Title>그룹기본설정</Title>
              <Div1>
                <MultiColumnSelectBox
                  onChange={emojiHandler}
                  value={formState.groupEmoji}
                  options={selectBoxOptions}
                />
                <NameBox
                  onChange={changeInputHandler}
                  name="groupName"
                  type="text"
                  value={formState.groupName}
                  placeholder="그룹 이름 입력"
                />
              </Div1>
              <DescBox
                name="groupDesc"
                onChange={changeInputHandler}
                value={formState.groupDesc}
                type="text"
                placeholder="그룹 설명 입력"
              />
            </DivWrapper>
            <DivWrapper>
              <Title>하루 근무 교대 횟수</Title>
              <TeamSelect onChange={changeWorkCount}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </TeamSelect>
            </DivWrapper>
            <DivWrapper>
              <Title>근무명 및 근무인원</Title>
              {renderWorkingForm()}
            </DivWrapper>
            <AddBtnWrapper>
            <AddBtn onClick={createGroup}>그룹생성</AddBtn>
            <AddBtn onClick={handleClickLink}>그룹생성취소</AddBtn>
            </AddBtnWrapper>
          </AddDiv>
        </AddGroupWrapper>
      </BoxSection>
    </Layout>
  );
};

export default GropAddPage;
