import { FC,useState,useCallback } from "react";
import Layout from "../Layout";
import styled from "styled-components";
import SmallButton from "../groups/SmallButton";
import { useNavigate } from "react-router";
import { BoxHeader, BoxSection } from "../../style/theme";
import MultiColumnSelectBox from "../MultiColumnSelectBox";
import { selectBoxOptions } from "../groups/GroupDummydata";
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
       <BoxSection>
        <BoxHeader>
          <span>신규그룹생성</span>
        </BoxHeader>
        < AddGroupWrapper>
          <GroupSelectBar />
          <AddDiv>
            <DivWrapper>
              <TitleHeader>신규그룹 기본 설정</TitleHeader>
            </DivWrapper>
            <DivWrapper>
              <Title>그룹기본설정</Title>
              <div>
                <MultiColumnSelectBox options={selectBoxOptions} />
                <NameBox type="text" placeholder="그룹 이름 입력" />
              </div>
                <DescBox type="text" placeholder="그룹 설명 입력" />                
              </DivWrapper>

            <DivWrapper>
              <Title>일일근무일수</Title>
              <TeamSelect>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </TeamSelect>
            </DivWrapper>
            <DivWrapper>
              <Title>근무명 및 근무인원</Title>
              <div>
                1  :
                <WorkBox type="text" placeholder="근무명을 입력해주세요" />
                </div>
                <div>
                  근무인원 :
                  <WorkSelect>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </WorkSelect>
              </div>
              <div>
                2  :
                <WorkBox type="text" placeholder="근무명을 입력해주세요" />
                </div>
                <div>
                  근무인원 :
                  <WorkSelect>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </WorkSelect>
               </div>
               <div>
                3  :
                <WorkBox type="text" placeholder="근무명을 입력해주세요" />
                </div>
                <div>
                  근무인원 :
                  <WorkSelect>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </WorkSelect>
                </div>                
            </DivWrapper>           
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
          </AddDiv>
        </ AddGroupWrapper>
      </BoxSection>
    </Layout >
  )
};

export default GroupBasicInfoEditPage;
