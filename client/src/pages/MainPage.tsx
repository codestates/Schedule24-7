import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import Main from "../components/mainpage/Main";
import { addNewSchedule } from "../redux/actions/scheduleActions";

function MainPage() {
  const dipactch = useDispatch();
  useEffect(() => {
    axios
      .get("https://server.schedule24-7.link/group", {
        headers: {
          authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.schedule);
        let result: any[] = [];
        if (res.data !== "") {
          res.data.forEach((el: any) => {
            el.schedule.forEach((item: any) => {
              result.push(item);
            });
          });
          dipactch(addNewSchedule(result));
        }
      });
  }, []);

  return (
    <Layout title="홈">
      <Main />
    </Layout>
  );
}

export default MainPage;
