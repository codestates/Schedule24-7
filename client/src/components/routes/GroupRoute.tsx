import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import GroupIndexPage from "../../pages/GroupIndexPage";
import GroupAddPage from "../../pages/GroupAddPage"
import GroupMemberPage from "../../pages/GroupMemeberPage";
import GroupBasicInfoPage from "../../pages/GroupBasicInfoPage";

const GroupRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<GroupIndexPage />} />
      <Route path="/add" element={<GroupAddPage />} />
      <Route path="/member" element={<GroupMemberPage />} />
      <Route path="/info" element={<GroupBasicInfoPage />} />
    </Routes>
  );
};

export default GroupRoutes;
