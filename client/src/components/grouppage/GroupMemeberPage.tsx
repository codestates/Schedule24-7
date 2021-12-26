import { FC, useCallback, useEffect, useState } from "react";
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
import { Link } from "react-router-dom";

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items:flex-start;
  item-alins: center;
  border: 1px none; #d3d3d3;
  border-radius: 0.5rem;
  padding: 0.3rem;
  background-color: #f5f5f5;

  ${mediaQuery.mobile} {
    flex-direction: column;
    max-width: 320px;
    background-color: #f5f5f5;
    border: 0px;
  }
`;

const BoxHeader = styled.div`
  display: flex;
  align-items: center;
  border-width: 0px 0px 0px 0px;
  border-style: solid;
  border-color: #696969;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
  padding-left: 2px;
  padding-bottom: 0.1rem;
  &.group {
    margin-top: 3px;
  }
`;

const AddBtn = styled.button`
  width: 80px;
  height: 30px;
  background-color: white;
  border: 1px solid #d4d4d4;
  box-shadow: 0px 0px 4px #7070706c;
  border-radius: 3px;
  color: #1b1b1b;
  font-weight: 500;
  margin-bottom: 3px;
  margin-right: 3px;
  cursor: pointer;
  :hover {
    background-color: #e9e9e9;
    color: #161616;
  }
  :active {
    box-shadow: inset 1px 1px #7070706c;
  }
  /* 
  &.schedule {
    margin-bottom: 4px;
  } */
`;

const NoMemeber = styled.div`
  z-index: 3;
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
`

const GroupMemberPage: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getGroupsApi().then((res) => {
      dispatch(getGroups(res.data));
    });
  }, [dispatch]);
  const groups = useSelector((store: RootState) => store.group.groups);
  const { groupId } = useParams();
  const selectgroup = groups.find((item) => item._id === groupId);
  const navigate = useNavigate();

  const [isAdd, setIsAdd] = useState(false);
  const handler = useCallback(() => {
    setIsAdd(true);
  }, [setIsAdd]);


  const handleAddCancle = useCallback(() => {
    setIsAdd(false);
  }, []);
  return (
    <Layout title="그룹">
      <GroupSelectBar activeIdx={1} id={groupId ?? ""} />
        <BoxHeader>
          <span></span>
        <AddBtn
          className="schedule"
          onClick={handler}        
        >멤버 생성</AddBtn>
      </BoxHeader>
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
        {isAdd ? (
          <AddMemberList handleAddCancle={handleAddCancle} />
        ) : (
          <AddListButton
            onClick={handler}
            iconSrc={
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX////Qz84AAADU09Lc29qenp5ra2sYGBhkY2JoaGh5eHfW1dOEg4Oqqqq5ubmOjYwuLS3EwsG1s7Pg4OARERG7u7ujo6NKSkr19fVVVFRCQkIICAhwcHCamZkdHR1+fX2SNhhVAAACKElEQVR4nO3b23aCMBBAUQFBERUV75f6/39Z2r4aCEloxvHsD2DlrIl5aNLJBAAAAAAAAAAAAAAAfI7mlPbZH2Iv0se5t+/HOyfmVoWn2Mv0YFe4j71MD3aFs9jL9PAphZf17rX1UknhfJq9VuVqCpPXsof6QmYoH4UUysdJo3+GFMpHISeNfBRSKB8nDTOUjxnqL2SXyscM9c9QfyG7VD5mqH+GFMpHISeNfBRSKB8njf4ZUigfhZw08h2tZvgVe5m/jmUx3P1qNcPbffiny1XgwDL10Ffo5hI0sPEJ7N2ljrKQhWu/wmqMGaZB96lfYZ0ZCpOtjsKraZMmSfUUVvioHeTmwDZxVS8Hq7/GKrw1hjf33ToC25+ig2YzWmHXNP7RlEIKKYyOQgopjI9CCimMj0IKKYyPQgopjI9CCjsKm6wa7K3+Xpo+Fw7yrsTpyuGbz9lohW42pqunNnDh8V05hea7p8zru0ELD16F73B/ONYdsFdh0Dvgic/vZaRb7nnQwHafFuVwhd1bjNTh28UucKCjvvc0f4Uy3tO40f8mikJe7snHDPXPUH8hu1Q+Zqh/hvoL2aXyMUP9M6RQPgo5aeSjkEL5OGn0z5BC+SjkpJGPGeqfof5Cdql8zFD/DPUXskvlY4b6Z0ihfBRy0shHoZZdetma1EoK+1AomV3hPvYyPdgVXmMv08PZqlDIP4e4STb9gXnsRQIAAAAAAAAAAAAAAMDKN0cKZeaGiKpiAAAAAElFTkSuQmCC"
            }
          />
        )}
      {selectgroup?.members.length === 0 ? 
      <NoMemeber>등록된 멤버가 없습니다.</NoMemeber>
      :null}
      </Box>
    </Layout>
  );
};

export default GroupMemberPage;
