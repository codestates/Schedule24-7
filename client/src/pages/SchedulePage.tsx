import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Layout from "../components/Layout";
import ScheduleMain from "../components/schedulepage/ScheduleMain";
import { getGroupsApi } from "../lib/api/group";
import { getGroups } from "../redux/actions/Group";
import { logoutChange } from "../redux/actions/loginActions";

function SchedulePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //페이지 첫 렌더링 또는 새로고침시 실행
  useEffect(() => {
    getGroupsApi().then((res) => {
      dispatch(getGroups(res.data));
    });
  }, [dispatch]);

  useEffect(() => {
    axios
      .get("https://server.schedule24-7.link/users", {
        headers: {
          authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        return;
      })
      .catch(() => {
        dispatch(logoutChange());
        navigate("/");
      });
  }, [dispatch]);

  return (
    <Layout title="스케줄">
      <ScheduleMain />
    </Layout>
  );
}

export default SchedulePage;
