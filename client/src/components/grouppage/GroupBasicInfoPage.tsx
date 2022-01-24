import { FC, useState, useCallback, useEffect } from "react";
import Layout from "../Layout";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { BoxSection } from "../../style/theme";
import GroupSelectBar from "../groups/GroupSelectBar";
import { useParams } from "react-router";
import { deleteGroupApi } from "../../lib/api/group";
import { useDispatch, useSelector } from "react-redux";
import { getGroupsApi } from "../../lib/api/group";
import { getGroups } from "../../redux/actions/Group";
import { RootState } from "../../redux/reducers";
import { mediaQuery } from "../../GlobalStyle";
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
  min-height: 550px;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #cacacac0;
  box-shadow: 1px 1px 1px #cacaca57;
  ${mediaQuery.mobile} {
    max-width: 290px;
    padding: 15px;
    border-radius: 5px;
  }
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
  width: 142px;
  height: 40px;
  color: white;
  box-shadow: 0.05rem 0.05rem 0.05rem #696969;
  border: 0px solid #a5a5a5;
  cursor: pointer;
  margin: 0.5rem;
  background-color: #5c5c5c;
  &.delete {
    background-color: #b60000;
  }
`;

const AddBtnWrapper = styled.div`
  display: flex;
  border: none;
  background-color: #f9f9f9;
`;

const EmojiDiv = styled.div`
  width: 43px;
  height: 35px;
  padding-top: 7px;
  margin-left: 3px;
  text-align: center;
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  background-color: white;
  ${mediaQuery.mobile} {
    width: 42px;
  }
`;

export const Div1 = styled.div`
  display: flex;
  align-items: center;
`;

const Div2 = styled.div`
  width: 240px;
  height: 42px;
  /* padding-top: 13px; */
  padding-left: 10px;
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  margin: 0.2rem;
  background-color: white;
  display: flex;
  align-items: center;

  ${mediaQuery.mobile} {
    max-width: 220px;
  }
`;

const Div3 = styled.div`
  width: 288px !important;
  height: 42px;
  /* padding-top: 13px; */
  padding-left: 10px;
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  margin: 0.2rem;
  background-color: white;
  display: flex;
  align-items: center;

  ${mediaQuery.mobile} {
    max-width: 268px;
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
  const selectgroup = groups.filter((item) => item._id === groupId)[0] ?? null;

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
      swal({
        title: "그룹삭제 완료",
        icon: "success",
      });
      navigate("/group");
      const response = await getGroupsApi();
      dispatch(getGroups(response.data));
    } catch (err) {}
  };

  return (
    <Layout title="기본정보">
      <GroupSelectBar id={groupId ?? ""} activeIdx={2} />
      <BoxSection>
        <AddGroupWrapper>
          <AddDiv>
            <DivWrapper>
              <TitleHeader>기본정보</TitleHeader>
            </DivWrapper>
            <DivWrapper>
              <Title>그룹이름</Title>
              <Div1>
                <EmojiDiv>{selectgroup.groupEmoji}</EmojiDiv>
                <Div2>{selectgroup.groupName}</Div2>
              </Div1>
              <Div3>{selectgroup.groupDesc}</Div3>
            </DivWrapper>
            <DivWrapper>
              <Title className="sub">하루 근무 교대 횟수</Title>
              <Div3>하루 {selectgroup.works.length}회</Div3>
            </DivWrapper>
            <DivWrapper>
              <Title className="bold">근무명 및 근무인원</Title>
              {selectgroup.works.map((item) => (
                <Div3>
                  {item.workName}: {item.limit}
                </Div3>
              )) ?? null}
            </DivWrapper>
            <AddBtnWrapper>
              <AddBtn onClick={handleEditButton}>수정</AddBtn>
              <AddBtn onClick={deleteGroup} className="delete">
                그룹삭제
              </AddBtn>
            </AddBtnWrapper>
          </AddDiv>
        </AddGroupWrapper>
      </BoxSection>
    </Layout>
  );
};

export default GroupBasicInfoPage;
