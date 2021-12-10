import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import ScheduleMain from "../components/schedulepage/ScheduleMain";
import { saveSchedule } from "../redux/actions/scheduleActions";
import { RootState } from "../redux/reducers";

function SchedulePage() {
  const dispatch = useDispatch();
  const groups = useSelector((store: RootState) => store.group.groups);
  useEffect(() => {
    let schedules: any[] = [];
    groups.forEach((el: any) => {
      el.schedules.forEach((item: any) => schedules.push(item));
    });
    if (schedules.length !== 0 || schedules! === undefined) {
      dispatch(saveSchedule(schedules));
    }
  }, [groups]);

  return (
    <Layout title="스케쥴">
      <ScheduleMain />
    </Layout>
  );
}

export default SchedulePage;
