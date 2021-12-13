import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import Main from "../components/mainpage/Main";
import { getGroupsApi } from "../lib/api/group";
import { getGroups } from "../redux/actions/Group";
import { RootState } from "../redux/reducers";

function MainPage() {
  const dispatch = useDispatch();

  // 스토리지에서 데이터 호출
  const groups = useSelector((store: RootState) => store.group.groups);

  //페이지 첫 렌더링 또는 새로고침시 실행
  useEffect(() => {
    getGroupsApi().then((res) => {
      dispatch(getGroups(res.data));
    });
  }, [groups]);

  return (
    <Layout title="홈">
      <Main />
    </Layout>
  );
}

export default MainPage;
