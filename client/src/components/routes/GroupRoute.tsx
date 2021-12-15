import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import GroupIndexPage from "../../pages/GroupIndexPage";
import GroupAddPage from "../grouppage/GroupAddPage";
import GroupMemberPage from "../grouppage/GroupMemeberPage";
import GroupBasicInfoPage from "../grouppage/GroupBasicInfoPage";
import GroupWorkConditionPage from "../grouppage/GroupWorkConditionPage";
import GroupBasicInfoEditPage from "../grouppage/GroupBasicInfoEditPage";
import LandingPage from "../landingPage/LandingPage";
import GroupSchedulePage from "../grouppage/GroupSchedulePage";

const GroupRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<GroupIndexPage />} />
      <Route path="/add" element={<GroupAddPage />} />
      <Route path="/:groupId/member" element={<GroupMemberPage />} />
      <Route path="/:groupId/condition" element={<GroupWorkConditionPage />} />
      <Route path="/:groupId/info" element={<GroupBasicInfoPage />} />
      <Route path="/:groupId/infoedit" element={<GroupBasicInfoEditPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/:groupId/schedule" element={<GroupSchedulePage />} />      
    </Routes>
  );
};

export default GroupRoutes;
