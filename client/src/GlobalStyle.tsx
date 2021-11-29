import styled, { createGlobalStyle, css } from "styled-components";

const LAYOUT_BREAK_POINT = {
  MOBILE: 768,
  MAC: 1440,
};

const createMediaQuery = (mediaPx: number): string => {
  return `@media(max-width: ${mediaPx}px)`;
};

export const mediaQuery = {
  mobile: createMediaQuery(LAYOUT_BREAK_POINT.MOBILE),
  mac: createMediaQuery(LAYOUT_BREAK_POINT.MAC),
};

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

export const hideMobileCss = (
  flag: boolean,
  defaultDisplay: string = "block"
) => {
  return css`
    display: ${flag ? defaultDisplay : "none"};

    ${mediaQuery.mobile} {
      display: ${flag ? "none" : defaultDisplay};
    }
  `;
};

export const DefaultLayout = styled.div`
  width: 1440px;
  margin: 0 auto;

  ${mediaQuery.mac} {
    width: 100%;
  }
`;
