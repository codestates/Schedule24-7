import { FC,useState,useCallback } from "react";
import Layout from "../Layout";
import styled from "styled-components";
import SmallButton from "../groups/SmallButton";
import { useNavigate } from "react-router";
import { BoxHeader, BoxSection } from "../../style/theme";
import GroupSelectBar from "../groups/GroupSelectBar";

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
  >.bold {
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
  
  const handleCancleEdit = useCallback(() => {
    navigate("/group/info");
  }, [navigate]);
  
  return (
    <Layout title="기본정보">
       <BoxSection>
        <BoxHeader>
          <span>신규그룹생성</span>
        </BoxHeader>
        < AddGroupWrapper>
          <GroupSelectBar />
          <AddDiv>
            <DivWrapper>
              <div>💥</div>
              <div className="bold">당직 1팀</div>
              <div>당직1팀 명단</div>
            </DivWrapper>
             <DivWrapper>
              <div className="bold">근무 횟수</div>
              <div>하루 3회</div>
            </DivWrapper>
            <DivWrapper>
              <div className="bold">근무 설정</div>
              <div>1: D</div>
              <div>2: E</div>
              <div>3: N</div>
            </DivWrapper>         
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
          </AddDiv>
        </ AddGroupWrapper>
      </BoxSection>    
    </Layout >
  )
};

export default GroupBasicInfoPage;
