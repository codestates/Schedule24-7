import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import Main from "../components/mainpage/Main";
import { getGroupsApi } from "../lib/api/group";
import { getGroups } from "../redux/actions/Group";
import { logoutChange } from "../redux/actions/loginActions";

function MainPage() {
  const dispatch = useDispatch();

  //페이지 첫 렌더링 또는 새로고침시 실행
  useEffect(() => {
    getGroupsApi()
      .then((res) => {
        dispatch(getGroups(res.data));
      })
      .catch(() => {
        dispatch(logoutChange());
      });
  }, [dispatch]);

  return (
    <Layout title="홈">
      {console.log(document.cookie)}
      {console.log("모지")}
      <Main />
    </Layout>
  );
}

export default MainPage;
