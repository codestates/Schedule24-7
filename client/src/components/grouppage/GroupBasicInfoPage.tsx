import { FC, useState, useCallback, useEffect } from "react";
import Layout from "../Layout";
import styled from "styled-components";
import SmallButton from "../groups/SmallButton";
import { useNavigate } from "react-router";
import { BoxHeader, BoxSection } from "../../style/theme";
import GroupSelectBar from "../groups/GroupSelectBar";
import { useParams } from "react-router";
import { deleteGroupApi } from "../../lib/api/group";
import { useDispatch, useSelector } from "react-redux";
import { getGroupsApi } from "../../lib/api/group";
import { getGroups } from "../../redux/actions/Group";
import { RootState } from "../../redux/reducers";

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
  min-width: 390px;
  height: 450px;
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
  > .bold {
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
  }
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
  width: 235px;
  height: 42px;
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
  width: 300px;
  height: 40px;
  color: white;
  box-shadow: 0.05rem 0.05rem 0.05rem #696969;
  border: 0px solid #a5a5a5;
  cursor: pointer;
  margin: 0.5rem;
  background-color: #5c5c5c;
`;

const DescBlock = styled.div`
  display: flex;
  margin-top: 20px;
  margin-left: 20px;

  &.button {
    margin-top: 30px;
    margin-right: 20px;
    justify-content: space-between;
  }
`;

const GroupBasicInfoPage: FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const handleButton = () => {
    setIsEdit(true);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const groups = useSelector((store: RootState) => store.group.groups);
  const selectgroup = groups.filter((item) => item._id === groupId)[0];

  const handleEditButton = useCallback(() => {
    navigate(`/group/${groupId}/infoedit`);
  }, [navigate]);

  const handleCancleEdit = useCallback(() => {
    navigate("/group/info");
  }, [navigate]);

  useEffect(() => {
    getGroupsApi().then((res) => {
      dispatch(getGroups(res.data));
    });
  }, [dispatch]);

  const deleteGroup = async () => {
    try {
      await deleteGroupApi(groupId as string);
      const response = await getGroupsApi();
      dispatch(getGroups(response.data));
      alert("그룹삭제 완료!");
      navigate("/group");
    } catch (err) {}
  };

  return (
    <Layout title="기본정보">
      <GroupSelectBar id={groupId ?? ""} />
      <BoxSection>
         <AddGroupWrapper>
          {/* <GroupSelectBar {id}/> */}
          <AddDiv>
            <DivWrapper>
              <div>{selectgroup.groupEmoji}</div>
              <div className="bold">{selectgroup.groupName}</div>
              <div>{selectgroup.groupDesc}</div>
            </DivWrapper>
            <DivWrapper>
              <div className="bold">하루 근무 교대 횟수</div>
              <div>하루 {selectgroup.works.length}회</div>
            </DivWrapper>
            <DivWrapper>
              <div className="bold">근무명 및 근무인원</div>
              {selectgroup.works.map((item) => (
                <div>
                  {item.workName}: {item.limit}
                </div>
              )) ?? null}
            </DivWrapper>
            <DescBlock className="button">
              <SmallButton
                title={"수정"}
                onClick={handleEditButton}
                color={"black"}
              />
              <SmallButton
                title={"그룹 삭제"}
                onClick={deleteGroup}
                color={"red"}
              />
            </DescBlock>
          </AddDiv>
        </AddGroupWrapper>
      </BoxSection>
    </Layout>
  );
};

export default GroupBasicInfoPage;
