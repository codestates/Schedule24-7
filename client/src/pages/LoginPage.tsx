import React from "react";
import Login from "../components/Login";
// import Footer from "../components/Footer";
import styled from "styled-components";

export const MainWrapper = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MainLogo = styled.img`
  width: 300px;
  @media screen and (max-width: 600px) {
    width: 200px;
  }
`;

function LoginPage() {
  return (
    <MainWrapper>
      <div>
        <MainLogo src="https://media.discordapp.net/attachments/907157959333785630/914705380070785064/s725_logopng.png" />
      </div>
      <div>
        <Login />
      </div>
      {/* <div>
        <Footer />
      </div> */}
    </MainWrapper>
  );
}

export default LoginPage;
