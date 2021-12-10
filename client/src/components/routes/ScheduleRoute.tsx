import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import SchedulePage from "../../pages/SchedulePage";
import AddScheduleMain from "../schedulepage/AddScheduleMain";
import ScheduleInfoMain from "../schedulepage/ScheduleInfoMain";
import ViewScheduleMain from "../schedulepage/ViewScheduleMain";
import WorkersInfo from "../schedulepage/WorkersInfo";

const ScheduleRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SchedulePage />} />
      <Route path="/add" element={<AddScheduleMain />} />
      <Route path="/view" element={<ViewScheduleMain />} />
      <Route path="/info" element={<ScheduleInfoMain />} />
      <Route path="/editworker" element={<WorkersInfo />} />
    </Routes>
  );
};

export default ScheduleRoutes;
