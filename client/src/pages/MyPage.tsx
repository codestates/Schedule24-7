import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import UserInfo from "../components/mypage/UserInfo";
import { logoutChange } from "../redux/actions/loginActions";

function MyPage() {
  const dispatch = useDispatch();

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
    <Layout title="내정보">
      <UserInfo />
    </Layout>
  );
}

export default MyPage;
