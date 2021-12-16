import { FC, useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import { mediaQuery } from "../GlobalStyle";
import GroupListItem from "../components/groups/GroupListItem";
import { useNavigate } from "react-router";
import { BoxSection, BoxWrapper, NoSchedule } from "../style/theme";
import { AddBtn, BoxHeader } from "../style/theme";
import { getGroupsApi } from "../lib/api/group";
import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "../redux/actions/Group";
import { RootState } from "../redux/reducers";

export const HeaderText = styled.span`
  /* margin-bottom: 4px; */
`;

const GroupIndexPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const groups = useSelector((store: RootState) => store.group.groups);

  const handleClickLink = useCallback(() => {
    navigate("add");
  }, [navigate]);

  useEffect(() => {
    getGroupsApi().then((res) => {
      dispatch(getGroups(res.data));
    });
  }, [dispatch]);

  return (
    <Layout title="그룹">
      <BoxSection>
        <BoxHeader className="group">
          <HeaderText>그룹</HeaderText>
          <AddBtn onClick={handleClickLink}>새그룹추가</AddBtn>
        </BoxHeader>
        {groups.length !== 0 ? (
          <BoxWrapper>
            {groups.map((group) => (
              <GroupListItem
                id={group._id}
                desc={group.groupDesc}
                emoji={group.groupEmoji}
                name={group.groupName}
                key={group._id}
              />
            ))}
          </BoxWrapper>
        ) : (
          <NoSchedule>등록된 그룹이 없습니다</NoSchedule>
        )}
      </BoxSection>
    </Layout>
  );
};

export default GroupIndexPage;

{
  /* <AddButton
          onClick={handleClickLink}
          iconSrc={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX////Qz84AAADU09Lc29qenp5ra2sYGBhkY2JoaGh5eHfW1dOEg4Oqqqq5ubmOjYwuLS3EwsG1s7Pg4OARERG7u7ujo6NKSkr19fVVVFRCQkIICAhwcHCamZkdHR1+fX2SNhhVAAACKElEQVR4nO3b23aCMBBAUQFBERUV75f6/39Z2r4aCEloxvHsD2DlrIl5aNLJBAAAAAAAAAAAAAAAfI7mlPbZH2Iv0se5t+/HOyfmVoWn2Mv0YFe4j71MD3aFs9jL9PAphZf17rX1UknhfJq9VuVqCpPXsof6QmYoH4UUysdJo3+GFMpHISeNfBRSKB8nDTOUjxnqL2SXyscM9c9QfyG7VD5mqH+GFMpHISeNfBRSKB8njf4ZUigfhZw08h2tZvgVe5m/jmUx3P1qNcPbffiny1XgwDL10Ffo5hI0sPEJ7N2ljrKQhWu/wmqMGaZB96lfYZ0ZCpOtjsKraZMmSfUUVvioHeTmwDZxVS8Hq7/GKrw1hjf33ToC25+ig2YzWmHXNP7RlEIKKYyOQgopjI9CCimMj0IKKYyPQgopjI9CCjsKm6wa7K3+Xpo+Fw7yrsTpyuGbz9lohW42pqunNnDh8V05hea7p8zru0ELD16F73B/ONYdsFdh0Dvgic/vZaRb7nnQwHafFuVwhd1bjNTh28UucKCjvvc0f4Uy3tO40f8mikJe7snHDPXPUH8hu1Q+Zqh/hvoL2aXyMUP9M6RQPgo5aeSjkEL5OGn0z5BC+SjkpJGPGeqfof5Cdql8zFD/DPUXskvlY4b6Z0ihfBRy0shHoZZdetma1EoK+1AomV3hPvYyPdgVXmMv08PZqlDIP4e4STb9gXnsRQIAAAAAAAAAAAAAAMDKN0cKZeaGiKpiAAAAAElFTkSuQmCC"}         
          title={"신규그룹추가"} /> */
}
