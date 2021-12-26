import styled from "styled-components";
import { mediaQuery } from "../GlobalStyle";

export const FooterDiv = styled.div`
  /* size: border-box; */
  align-items: center;
  text-align: center;
  padding: 0.7rem;
  font-size: 15px;
  color: #3b3b3b;
  border: none;
  background-color: none;
  ${mediaQuery.mobile} {
    font-size: 12px;
  }
`;

export default function Footer() {
  return <FooterDiv>Copyright © Schedule24/7 All Rights Reserved.</FooterDiv>;
}
