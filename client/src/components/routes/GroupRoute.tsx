import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import GroupIndexPage from "../../pages/GroupIndexPage";
import GroupAddPage from "../grouppage/GroupAddPage"
import GroupMemberPage from "../grouppage/GroupMemeberPage";
import GroupBasicInfoPage from "../grouppage/GroupBasicInfoPage";
import GroupWorkConditionPage from "../grouppage/GroupWorkConditionPage";
import GroupBasicInfoEditPage from "../grouppage/GroupBasicInfoEditPage";

const GroupRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<GroupIndexPage />} />
      <Route path="/add" element={<GroupAddPage />} />
      <Route path="/member" element={<GroupMemberPage />} />
      <Route path="/info" element={<GroupBasicInfoPage />} />
      <Route path="/condition" element={<GroupWorkConditionPage />} />
      <Route path="/infoedit" element={<GroupBasicInfoEditPage />} />
    </Routes>
  );
};

export default GroupRoutes;
