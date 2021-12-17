import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import Main from "../components/mainpage/Main";
import { getGroupsApi } from "../lib/api/group";
import { getGroups } from "../redux/actions/Group";
import { logoutChange } from "../redux/actions/loginActions";
import { RootState } from "../redux/reducers";

function MainPage() {
  const dispatch = useDispatch();
  const groups = useSelector((store: RootState) => store.group);

  //페이지 첫 렌더링 또는 새로고침시 실행
  useEffect(() => {
    getGroupsApi().then((res) => {
      dispatch(getGroups(res.data));
    });
  }, [dispatch]);

  //토큰저장
  // useEffect(() => {
  //   console.log("실행되니");
  //   if (document.cookie && !window.localStorage.getItem("token")) {
  //     console.log(document.cookie);

  //     let newCookie2 = document.cookie;
  //     let finalCookie2 = newCookie2.split("%22")[3];

  //     console.log(finalCookie2);

  //     if (finalCookie2 !== undefined) {
  //       window.localStorage.setItem("token", finalCookie2);
  //     }
  //   }
  // }, []);

  //토큰 없을 시 로그아웃
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
      });
  }, []);

  return (
    <Layout title="홈">
      {console.log(document.cookie)}
      {console.log("모지")}
      {console.log(groups)}
      <Main />
    </Layout>
  );
}

export default MainPage;
