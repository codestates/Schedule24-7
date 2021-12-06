import { FC,useCallback } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import { mediaQuery } from "../GlobalStyle";
import GroupListItem from "../components/groups/GroupListItem"
import InnerHeader from "../components/InnerHeader";
import AddButton from "../components/AddButton";
import { useNavigate } from "react-router";

const BlockContainer = styled.div`
  background-color: #f1f1f1;
  border: 0.5px dashed #4a4a4a;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 18px;
  display: flex;
  flex-wrap: wrap;
  
  > div {
    width: 170px;
    height: 170px;
    padding: 10px;
    margin: 5px;
  }
`;

const arrs: Group.GroupListItemProps[] = [
  {
    emoji: "🍕",
    groupDesc: "당직1팀 명단(수정가능)",
    groupName: "당직1팀",
  },
  {
    emoji: "🍕",
    groupDesc: "당직2팀 명단(수정가능)",
    groupName: "당직2팀",
  },
  {
    emoji: "🍕",
    groupDesc: "당직3팀 명단(수정가능)",
    groupName: "당직3팀",
  },
  {
    emoji: "🍕",
    groupDesc: "당직4팀 명단(수정가능)",
    groupName: "당직4팀",
  },
];

const GroupIndexPage: FC = () => {
  const navigate = useNavigate()
  const handleClickLink = useCallback(() => {
    navigate("group/add");
  }, [navigate]);
  
  
  
  return (

  <Layout title="그룹">
    <InnerHeader title="그룹관리" />    
      <BlockContainer>
        {[...arrs, ...arrs, ...arrs, ...arrs].map((item) => (
          <GroupListItem {...item} />
        ))}
        <AddButton
          onClick={handleClickLink}
          iconSrc={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX////Qz84AAADU09Lc29qenp5ra2sYGBhkY2JoaGh5eHfW1dOEg4Oqqqq5ubmOjYwuLS3EwsG1s7Pg4OARERG7u7ujo6NKSkr19fVVVFRCQkIICAhwcHCamZkdHR1+fX2SNhhVAAACKElEQVR4nO3b23aCMBBAUQFBERUV75f6/39Z2r4aCEloxvHsD2DlrIl5aNLJBAAAAAAAAAAAAAAAfI7mlPbZH2Iv0se5t+/HOyfmVoWn2Mv0YFe4j71MD3aFs9jL9PAphZf17rX1UknhfJq9VuVqCpPXsof6QmYoH4UUysdJo3+GFMpHISeNfBRSKB8nDTOUjxnqL2SXyscM9c9QfyG7VD5mqH+GFMpHISeNfBRSKB8njf4ZUigfhZw08h2tZvgVe5m/jmUx3P1qNcPbffiny1XgwDL10Ffo5hI0sPEJ7N2ljrKQhWu/wmqMGaZB96lfYZ0ZCpOtjsKraZMmSfUUVvioHeTmwDZxVS8Hq7/GKrw1hjf33ToC25+ig2YzWmHXNP7RlEIKKYyOQgopjI9CCimMj0IKKYyPQgopjI9CCjsKm6wa7K3+Xpo+Fw7yrsTpyuGbz9lohW42pqunNnDh8V05hea7p8zru0ELD16F73B/ONYdsFdh0Dvgic/vZaRb7nnQwHafFuVwhd1bjNTh28UucKCjvvc0f4Uy3tO40f8mikJe7snHDPXPUH8hu1Q+Zqh/hvoL2aXyMUP9M6RQPgo5aeSjkEL5OGn0z5BC+SjkpJGPGeqfof5Cdql8zFD/DPUXskvlY4b6Z0ihfBRy0shHoZZdetma1EoK+1AomV3hPvYyPdgVXmMv08PZqlDIP4e4STb9gXnsRQIAAAAAAAAAAAAAAMDKN0cKZeaGiKpiAAAAAElFTkSuQmCC"}         
          title={"신규그룹추가"} />
      </BlockContainer>
  
  </Layout >
  )
};

export default GroupIndexPage;
