import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import GroupIndexPage from "../../pages/GroupIndexPage";
import GroupAddPage from "../../pages/GroupAddPage"
import GroupMemberPage from "../../pages/GroupMemeberPage";

const GroupRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<GroupIndexPage />} />
      <Route path="/add" element={<GroupAddPage />} />
      <Route path="/member" element={<GroupMemberPage />} />
    </Routes>
  );
};

export default GroupRoutes;
