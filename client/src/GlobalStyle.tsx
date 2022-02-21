import styled, { createGlobalStyle, css } from "styled-components";
import { keyframes } from "styled-components";

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
@font-face {
    font-family: 'Noto Sans KR', sans-serif;
    src: url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&display=swap') format('woff');
    font-weight: 400;
    font-style: normal;
}
  body {
    box-sizing: border-box;
    margin: 0;
    font-family: 'Noto Sans KR', sans-serif;
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

export const FadeAction = keyframes`
  0% {
    opacity: 0;
    transform: translateY(25px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;
