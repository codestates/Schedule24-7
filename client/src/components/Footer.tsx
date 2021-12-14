import styled from "styled-components";
import { mediaQuery } from "../GlobalStyle";

export const FooterDiv = styled.div`
  align-items: center;
  text-align: center;
  padding: 0.7rem;
  font-size: 15px;
  color: #3b3b3b;
  ${mediaQuery.mobile} {
    font-size: 12px;
  }
`;

export default function Footer() {
  return <FooterDiv>Copyright © Schedule24/7 All Rights Reserved.</FooterDiv>;
}
