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
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}
  body {
    box-sizing: border-box;
    margin: 0;
    font-family: 'Pretendard-Regular';
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
