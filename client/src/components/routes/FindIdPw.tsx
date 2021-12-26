import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import FindIdPwPage from "../../pages/FindIdPwPage";
import IdEmailSent from "../findidpw/IdEmailSent copy";
import PwEmailSent from "../findidpw/PwEmailSent";

const FindIdPw: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<FindIdPwPage />} />
      <Route path="/id" element={<IdEmailSent />} />
      <Route path="/pw" element={<PwEmailSent />} />
    </Routes>
  );
};

export default FindIdPw;
