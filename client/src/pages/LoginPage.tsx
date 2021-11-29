import React from "react";
import Login from "../components/Login";
// import Footer from "../components/Footer";
import styled from "styled-components";
import { MainLogo, MainWrapper } from "../style/theme";

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
