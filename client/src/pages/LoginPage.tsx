import Login from "../components/Login";
import Footer from "../components/Footer";
import styled from "styled-components";
import { MainLogo, MainWrapper } from "../style/theme";

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 90vh;
`;

function LoginPage() {
  return (
    <MainWrapper>
      <LoginBox>
        <MainLogo src="https://media.discordapp.net/attachments/907157959333785630/914705380070785064/s725_logopng.png" />
        <Login />
      </LoginBox>
      <Footer />
    </MainWrapper>
  );
}

export default LoginPage;
