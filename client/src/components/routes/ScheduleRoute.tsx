import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import SchedulePage from "../../pages/SchedulePage";
import AddScheduleMain from "../schedulepage/AddScheduleMain";
import ViewScheduleMain from "../schedulepage/ViewScheduleMain";

const ScheduleRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SchedulePage />} />
      <Route path="/add" element={<AddScheduleMain />} />
      <Route path="/view" element={<ViewScheduleMain />} />
    </Routes>
  );
};

export default ScheduleRoutes;
