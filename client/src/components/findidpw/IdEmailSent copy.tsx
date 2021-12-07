import { Link } from "react-router-dom";
import { MainWrapper, NormalBtn } from "../../style/theme";

export default function IdEmailSent() {
  return (
    <MainWrapper>
      <h2>아이디가 이메일로 전송되었습니다</h2>
      <Link to="/findidpw">
        <NormalBtn>확인</NormalBtn>
      </Link>
    </MainWrapper>
  );
}
