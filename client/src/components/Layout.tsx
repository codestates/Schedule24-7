import { FC } from "react";
import Header from "./Header";
import styled from "styled-components";
import SideBar from "./Sidebar";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`;

const UserContentWrapper = styled.div`
  padding: 30px;
  box-sizing: border-box;
`;

interface Props {
  title?: string;
}

const Layout: FC<Props> = ({ children, title }) => {
  return (
    <Container>
      <Header title={title} />
      <BodyWrapper>
        <SideBar />
        <UserContentWrapper>{children}</UserContentWrapper>
      </BodyWrapper>
    </Container>
  );
};

export default Layout;
