import { FC,useState,useCallback } from "react";
import Layout from "../Layout";
import styled from "styled-components";
import InnerHeader from "../InnerHeader";
import GroupBasicInfo from "../groups/GroupBasicInfo";
import DailyWork from "../groups/DailyWork"
import WorkNameNumber from "../groups/WorkNameNumber";
import GroupSelectBar from "../groups/GroupSelectBar";
import SmallButton from "../groups/SmallButton";
import { useNavigate } from "react-router";

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

const GroupBasicInfoEditPage: FC = () => {
  const [isEdit, setIsEdit] = useState(false)
  const navigate = useNavigate();
  const handleButton = () => {
    setIsEdit(true)
  }
  const handleCancleEdit = useCallback(() => {
    navigate("/group/info");
  }, [navigate]);
  
  return (
    <Layout title="기본정보">
      <InnerHeader title={"기본정보"} />
      <GroupSelectBar />
      <GroupBasicInfo />
      <DailyWork />
      <WorkNameNumber />
     <DescBlock className="button">        
          <SmallButton
          title={"수정 완료"}
          onClick={handleButton}
          color={"black"}
          />
          <SmallButton
          title={"수정 취소"}
          onClick={handleCancleEdit}
          color={"gray"}
          />
        </DescBlock>         
    </Layout >
  )
};

export default GroupBasicInfoEditPage;
