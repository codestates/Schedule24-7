import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import ScheduleMain from "../components/schedulepage/ScheduleMain";
import { getGroupsApi } from "../lib/api/group";
import { getGroups } from "../redux/actions/Group";

function SchedulePage() {
  const dispatch = useDispatch();

  //페이지 첫 렌더링 또는 새로고침시 실행
  useEffect(() => {
    getGroupsApi().then((res) => {
      dispatch(getGroups(res.data));
    });
  }, [dispatch]);

  return (
    <Layout title="스케쥴">
      <ScheduleMain />
    </Layout>
  );
}

export default SchedulePage;
