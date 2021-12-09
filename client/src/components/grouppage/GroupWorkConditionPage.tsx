import { FC,useCallback } from "react";
import Layout from "../Layout";
import styled from "styled-components";
import { mediaQuery } from "../../GlobalStyle";
import { useNavigate } from "react-router";
import InnerHeader from "../InnerHeader";
import GroupSelectBar from "../groups/GroupSelectBar";
import CoiditionListItem from "../groups/CoiditionListItem";
import AddListButton from "../AddListButton"
import MemberListEditItem from "../groups/MemberListEditItem";
import AddConditionList from "../groups/AddConditionList";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";

const GroupWorkConditionPage: FC = () => {
  const navigate = useNavigate();
  const handler = useCallback(() => {
    navigate("/group");
  }, [navigate]);
  const { groupId } = useParams();
  const groups = useSelector((store: RootState) => store.group.groups);
  const selectGroup = groups.find((item) => item._id === groupId);
  console.log(selectGroup, 1)
  
  return (
    <Layout title="그룹">
      <GroupSelectBar id={groupId ?? ""} />
      
      {selectGroup ? selectGroup.conditions.map((item) => (
        <CoiditionListItem
          conditionName={item.conditionName}
          conditionDesc={item.conditionDesc}
          target={item.target}
          cycle={item.cycle}
          workId={item.workId}
          operation={item.operation}
          value={item.value}
          conditionId={item.conditionId}          
        />

      )): null}

      <AddListButton
        onClick={handler}
        iconSrc={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX////Qz84AAADU09Lc29qenp5ra2sYGBhkY2JoaGh5eHfW1dOEg4Oqqqq5ubmOjYwuLS3EwsG1s7Pg4OARERG7u7ujo6NKSkr19fVVVFRCQkIICAhwcHCamZkdHR1+fX2SNhhVAAACKElEQVR4nO3b23aCMBBAUQFBERUV75f6/39Z2r4aCEloxvHsD2DlrIl5aNLJBAAAAAAAAAAAAAAAfI7mlPbZH2Iv0se5t+/HOyfmVoWn2Mv0YFe4j71MD3aFs9jL9PAphZf17rX1UknhfJq9VuVqCpPXsof6QmYoH4UUysdJo3+GFMpHISeNfBRSKB8nDTOUjxnqL2SXyscM9c9QfyG7VD5mqH+GFMpHISeNfBRSKB8njf4ZUigfhZw08h2tZvgVe5m/jmUx3P1qNcPbffiny1XgwDL10Ffo5hI0sPEJ7N2ljrKQhWu/wmqMGaZB96lfYZ0ZCpOtjsKraZMmSfUUVvioHeTmwDZxVS8Hq7/GKrw1hjf33ToC25+ig2YzWmHXNP7RlEIKKYyOQgopjI9CCimMj0IKKYyPQgopjI9CCjsKm6wa7K3+Xpo+Fw7yrsTpyuGbz9lohW42pqunNnDh8V05hea7p8zru0ELD16F73B/ONYdsFdh0Dvgic/vZaRb7nnQwHafFuVwhd1bjNTh28UucKCjvvc0f4Uy3tO40f8mikJe7snHDPXPUH8hu1Q+Zqh/hvoL2aXyMUP9M6RQPgo5aeSjkEL5OGn0z5BC+SjkpJGPGeqfof5Cdql8zFD/DPUXskvlY4b6Z0ihfBRy0shHoZZdetma1EoK+1AomV3hPvYyPdgVXmMv08PZqlDIP4e4STb9gXnsRQIAAAAAAAAAAAAAAMDKN0cKZeaGiKpiAAAAAElFTkSuQmCC"}
        
      />
      <AddConditionList groupId={groupId}/>
  
  </Layout >
  )
};

export default GroupWorkConditionPage;
