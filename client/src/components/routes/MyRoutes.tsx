import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import MyPage from "../../pages/MyPage";
import PwChangeConfirm from "../mypage/PwChangeConfirm";

const MyRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MyPage />} />
      <Route path="/pwchange" element={<PwChangeConfirm />} />
    </Routes>
  );
};

export default MyRoutes;
