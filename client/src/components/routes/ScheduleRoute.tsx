import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import SchedulePage from "../../pages/SchedulePage";
import AddScheduleMain from "../schedulepage/AddScheduleMain";
import ScheduleInfoMain from "../schedulepage/ScheduleInfoMain";
import ShareSchedulePage from "../schedulepage/ShareSchedulePage";
import ViewScheduleMain from "../schedulepage/ViewScheduleMain";
import WorkersInfo from "../schedulepage/WorkersInfo";

const ScheduleRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SchedulePage />} />
      <Route path="/add" element={<AddScheduleMain />} />
      <Route path="/view/:groupId/:scheduleId" element={<ViewScheduleMain />} />
      <Route path="/info/:groupId/:scheduleId" element={<ScheduleInfoMain />} />
      <Route
        path="/editworker/:groupId/:scheduleId/:contentId"
        element={<WorkersInfo />}
      />
      <Route path="/view/share/:scheduleId" element={<ShareSchedulePage />} />
    </Routes>
  );
};

export default ScheduleRoutes;

// /:groupId/:scheduleId/view
