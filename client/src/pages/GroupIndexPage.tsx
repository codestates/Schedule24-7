import { FC, useCallback, useEffect } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import GroupListItem from "../components/groups/GroupListItem";
import { useNavigate } from "react-router";
import {
  BoxSection,
  BoxWrapper,
  ShortcutBoxWrapper2,
  ShortcutContainer2,
} from "../style/theme";
import { AddBtn, BoxHeader, NoSchedule } from "../style/theme";
import { getGroupsApi } from "../lib/api/group";
import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "../redux/actions/Group";
import { RootState } from "../redux/reducers";

export const HeaderText = styled.span`
  margin-bottom: 2px;
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
          <AddBtn onClick={handleClickLink}>그룹 생성</AddBtn>
        </BoxHeader>
        <ShortcutContainer2>
          {groups.length !== 0 ? (
            <ShortcutBoxWrapper2>
              {groups.map((group) => (
                <GroupListItem
                  id={group._id}
                  desc={group.groupDesc}
                  emoji={group.groupEmoji}
                  name={group.groupName}
                  key={group._id}
                />
              ))}
            </ShortcutBoxWrapper2>
          ) : (
            <NoSchedule>등록된 그룹이 없습니다</NoSchedule>
          )}
        </ShortcutContainer2>
      </BoxSection>
    </Layout>
  );
};

export default GroupIndexPage;
