import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import Main from "../components/mainpage/Main";
import { addNewSchedule, saveSchedule } from "../redux/actions/scheduleActions";
import { RootState } from "../redux/reducers";

function MainPage() {
  const dispatch = useDispatch();
  //스케쥴 업데이트
  const groups = useSelector((store: RootState) => store.group.groups);
  useEffect(() => {
    let schedules: any[] = [];
    groups.forEach((el: any) => {
      el.schedules.forEach((item: any) => schedules.push(item));
    });
    if (schedules.length !== 0 || schedules! === undefined) {
      dispatch(saveSchedule(schedules));
    }
  }, [dispatch]);

  return (
    <Layout title="홈">
      <Main />
    </Layout>
  );
}

export default MainPage;
