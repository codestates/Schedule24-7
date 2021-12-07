import { Link } from "react-router-dom";
import { NormalBtn } from "../../style/theme";
import Layout from "../Layout";
import { UserInfoDiv, UserInfoSection } from "./UserInfo";

function PwChangeConfirm() {
  return (
    <Layout title="내정보">
      <UserInfoSection>
        <UserInfoDiv>
          <h2>비밀번호가 성공적으로 변경되었습니다</h2>
          <Link to="/mypage">
            <NormalBtn>확인</NormalBtn>
          </Link>
        </UserInfoDiv>
      </UserInfoSection>
    </Layout>
  );
}

export default PwChangeConfirm;
