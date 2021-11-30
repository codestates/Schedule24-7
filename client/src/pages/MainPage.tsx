import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/mainpage/Main";
import Sidebar from "../components/Sidebar";
import { mediaQuery } from "../GlobalStyle";

export const MainPageWrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 0.2fr 1fr 0.5fr 0.5fr;
  grid-template-rows: 0.2fr 8fr 0.5fr;
  grid-template-areas:
    "nav nav nav nav"
    "sidebar main main main"
    "sidebar footer footer footer";
  ${mediaQuery.mobile} {
    grid-template-columns: 0fr 1fr 0.5fr 0.5fr;
    grid-template-rows: 0.2fr 8fr 0.5fr;
  }
`;

const NavBar = styled.nav`
  grid-area: nav;
`;

const MainDiv = styled.main`
  grid-area: main;
  padding: 0.25rem;
`;

const Side = styled.div`
  /* background: #9aaab7; */
  grid-area: sidebar;
`;

const Foot = styled.footer`
  /* background: #ff9637; */
  grid-area: footer;
  padding: 0.25rem;
`;

function MainPage() {
  return (
    <MainPageWrapper>
      <NavBar>
        <Header />
      </NavBar>
      <Side>
        <Sidebar />
      </Side>
      <MainDiv>
        <Main />
      </MainDiv>
      <Foot>
        <Footer />
      </Foot>
    </MainPageWrapper>
  );
}

export default MainPage;
