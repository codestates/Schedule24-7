import { FC, useCallback, useEffect,useState } from "react";
import Layout from "../Layout";
import styled from "styled-components";
import { mediaQuery } from "../../GlobalStyle";
import { useNavigate } from "react-router";
import GroupSelectBar from "../groups/GroupSelectBar";
import MemberListItem from "../groups/MemberListItem";
import AddListButton from "../AddListButton";
import MemberListEditItem from "../groups/MemberListEditItem";
import { RootState } from "../../redux/reducers";
import { group } from "yargs";
import AddMemberList from "../groups/AddMemberList";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getGroupsApi } from "../../lib/api/group";
import { getGroups } from "../../redux/actions/Group";
import { setSyntheticLeadingComments } from "typescript";

const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(19rem, auto));
  border: 1px dotted #696969;
  border-radius: 0.5rem;
  padding: 0.3rem;
  background-color: #ececec;
  grid-column-gap: 10px;

${mediaQuery.mobile}{
  flex-direction: column;
  background-color: white;
  border: none;
}
`
const BoxWrapper = styled.div`

`;

const GroupMemberPage: FC = () => {
  const dispatch = useDispatch();
  const groups = useSelector((store: RootState) => store.group.groups);
  const { groupId } = useParams();
  const selectgroup = groups.find((item) => item._id === groupId);
  const navigate = useNavigate();
  
  const [isAdd, setIsAdd] = useState(false);
  const handler = useCallback(() => {
    setIsAdd(true)
  }, [setIsAdd]);

  useEffect(() => {
    getGroupsApi().then((res) => {
      dispatch(getGroups(res.data));
    });
  }, [dispatch]);

  const handleAddCancle = useCallback(() => {
    setIsAdd(false)
  }, [])
  return (
    <Layout title="그룹">
      <GroupSelectBar id={groupId ?? ""} />
      
      <Box>
      {typeof selectgroup === "undefined"
        ? null
        : selectgroup.members.map((item) => (
            <MemberListItem
              name={item.memberName}
              position={item.memberPosition}
              vacation={item.memberVacation}
              memberId={item.memberId}
            />
        ))}
      {isAdd ? 
        <AddMemberList handleAddCancle={handleAddCancle}/>
        :<AddListButton       
        onClick={handler}
        iconSrc={
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX////Qz84AAADU09Lc29qenp5ra2sYGBhkY2JoaGh5eHfW1dOEg4Oqqqq5ubmOjYwuLS3EwsG1s7Pg4OARERG7u7ujo6NKSkr19fVVVFRCQkIICAhwcHCamZkdHR1+fX2SNhhVAAACKElEQVR4nO3b23aCMBBAUQFBERUV75f6/39Z2r4aCEloxvHsD2DlrIl5aNLJBAAAAAAAAAAAAAAAfI7mlPbZH2Iv0se5t+/HOyfmVoWn2Mv0YFe4j71MD3aFs9jL9PAphZf17rX1UknhfJq9VuVqCpPXsof6QmYoH4UUysdJo3+GFMpHISeNfBRSKB8nDTOUjxnqL2SXyscM9c9QfyG7VD5mqH+GFMpHISeNfBRSKB8njf4ZUigfhZw08h2tZvgVe5m/jmUx3P1qNcPbffiny1XgwDL10Ffo5hI0sPEJ7N2ljrKQhWu/wmqMGaZB96lfYZ0ZCpOtjsKraZMmSfUUVvioHeTmwDZxVS8Hq7/GKrw1hjf33ToC25+ig2YzWmHXNP7RlEIKKYyOQgopjI9CCimMj0IKKYyPQgopjI9CCjsKm6wa7K3+Xpo+Fw7yrsTpyuGbz9lohW42pqunNnDh8V05hea7p8zru0ELD16F73B/ONYdsFdh0Dvgic/vZaRb7nnQwHafFuVwhd1bjNTh28UucKCjvvc0f4Uy3tO40f8mikJe7snHDPXPUH8hu1Q+Zqh/hvoL2aXyMUP9M6RQPgo5aeSjkEL5OGn0z5BC+SjkpJGPGeqfof5Cdql8zFD/DPUXskvlY4b6Z0ihfBRy0shHoZZdetma1EoK+1AomV3hPvYyPdgVXmMv08PZqlDIP4e4STb9gXnsRQIAAAAAAAAAAAAAAMDKN0cKZeaGiKpiAAAAAElFTkSuQmCC"
        }
        />
        }
      </Box>
    </Layout>
  );
};

export default GroupMemberPage;
