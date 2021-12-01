import styled from "styled-components";
import { mediaQuery } from "../../GlobalStyle";
import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "../Sidebar";
import ViewSchedule from "./ViewScheduel";

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
  padding: 1.25rem;
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

function ViewScheduleMain() {
  return (
    <MainPageWrapper>
      <NavBar>
        <Header />
      </NavBar>
      <Side>
        <Sidebar />
      </Side>
      <MainDiv>
        <ViewSchedule />
      </MainDiv>
      <Foot>
        <Footer />
      </Foot>
    </MainPageWrapper>
  );
}

export default ViewScheduleMain;
