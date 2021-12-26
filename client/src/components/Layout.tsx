import { FC } from "react";
import Header from "./Header";
import styled from "styled-components";
import SideBar from "./Sidebar";
import { mediaQuery } from "../GlobalStyle";
import Footer from "./Footer";

const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 0.15fr 1fr 1fr;
  grid-template-rows: 0.15fr 8fr 0.5fr;
  grid-template-areas:
    "nav nav nav"
    "sidebar main main"
    "sidebar footer footer";
  ${mediaQuery.mobile} {
    grid-template-columns: 0fr 1fr 1fr;
    grid-template-rows: 0.2fr 8fr 0.5fr;
  }
`;

const NavBar = styled.nav`
  grid-area: nav;
`;

const MainDiv = styled.main`
  background-color: #f5f5f5;
  /* background-color: white; */
  grid-area: main;
  padding: 15px 45px 5px 45px;
  ${mediaQuery.mobile} {
    padding: 0;
  }
`;

const Side = styled.div`
  grid-area: sidebar;
`;

const Foot = styled.footer`
  grid-area: footer;
  /* padding: 0.25rem; */
  background-color: #f5f5f5;
`;

const UserContentWrapper = styled.div`
  box-sizing: border-box;
  margin: 1rem;
`;

interface Props {
  title?: string;
}

const Layout: FC<Props> = ({ children, title }) => {
  return (
    <Container>
      <NavBar>
        <Header title={title} />
      </NavBar>
      <Side>
        <SideBar />
      </Side>
      <MainDiv>
        <UserContentWrapper>{children}</UserContentWrapper>
      </MainDiv>
      <Foot>
        <Footer />
      </Foot>
    </Container>
  );
};

export default Layout;
