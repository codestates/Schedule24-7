import { FC,useState,useCallback } from "react";
import Layout from "../Layout";
import styled from "styled-components";
import InnerHeader from "../InnerHeader";
import SmallButton from "../groups/SmallButton";
import { useNavigate } from "react-router";
import GroupSelectBar from "../groups/GroupSelectBar";

const DescBlock = styled.div`
  display: flex;
  margin-top: 20px;
  margin-left: 20px;

  &.button {
  margin-top: 30px;
  margin-right: 20px;
  justify-content: space-between
  }
`

const GroupBasicInfoPage: FC = () => {
  const [isEdit, setIsEdit] = useState(false)
  const handleButton = () => {
    setIsEdit(true)
  }
  const navigate = useNavigate();
  const handleEditButton = useCallback(() => {
    navigate("/group/infoedit");
  }, [navigate]);
  
  return (
    <Layout title="기본정보">
      <InnerHeader title={"기본정보"} />
      <GroupSelectBar />
      <div>💥</div>
      <div>당직 1팀</div>
      <div>당직1팀 명단</div>
      <div>근무 횟수</div>
      <div>하루 3회</div>
      <div>근무 설정</div>
      <div>1: D</div>
      <div>2: E</div>
      <div>3: N</div>
      <DescBlock className="button">        
        <SmallButton
        title={"수정"}
        onClick={handleEditButton}
        color={"black"}
        />
        <SmallButton
        title={"그룹 삭제"}
        onClick={handleButton}
        color={"red"}
        />
      </DescBlock>         
    </Layout >
  )
};

export default GroupBasicInfoPage;
