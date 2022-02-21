import styled from "styled-components";
import { FadeAction, mediaQuery } from "../../GlobalStyle";

interface Idx {
  idx: number;
}

export const AllLandingContainer = styled.div`
  /* background: linear-gradient(0deg, #fbfafc, #fbfafc); */
  /* background-color: #2f5fd7; */
  background-image: url("https://cdn.discordapp.com/attachments/907157959333785630/920665915333410836/LandingBackgroundedit.jpg");
  display: flex;
  flex-direction: column;
  width: 100%;
  /* height: 100%; */
  /* background-position: center; */
  background-repeat: no-repeat;
  background-size: cover;
  justify-content: center;
  align-items: center;
  font-family: "Gmarket Sans TTF";
  transition: 0.5s all;
  @media screen and (max-width: 1000px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    transition: 0.5s all;
  }
`;

export const LandingHeader = styled.div`
  display: flex;
  z-index: 50;
  width: 100%;
  height: 65px;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  /* padding: ${(props) => (props.theme > 100 ? "0px" : "10px")}; */
  background-color: ${(props) =>
    props.theme > 100 ? "rgba(255, 255, 255, 0.2)" : "none"};
  box-shadow: ${(props) =>
    props.theme > 100 ? "rgba(0, 0, 0, 0.1) 0px 3px 2px 0px" : "none"};

  a {
    text-decoration: none;
  }
  a:visited {
    text-decoration: none;
  }
`;

export const HeaderLeft = styled.div`
  flex: 1 0 auto;
  padding-left: 5%;
  @media screen and (max-width: 450px) {
    padding-left: 15px;
  }
`;

export const HeaderLogo = styled.img`
  width: 280px;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    width: 150px;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  justify-content: right;
  flex: 1 0 auto;
  padding-right: 5%;
  @media screen and (max-width: 600px) {
    padding-right: 10px;
  }
  @media screen and (max-width: 450px) {
    padding-right: 5px;
  }
`;

export const HeaderItem = styled.div`
  width: 100px;
  height: 20px;
  padding: 3px 0 2px 0;
  border: 1px solid #ffffff;
  text-align: center;
  border-radius: 5px;
  margin: 3px;
  color: white;
  background-color: #17224d80;
  font-size: 14px;
  :hover {
    background-color: #17224d;
    box-shadow: 0 0 5px #ffffff20;
  }
  @media screen and (max-width: 450px) {
    width: 55px;
    margin: 1px;
    padding: 5px 0 0px 0;
    font-size: 11px;
  }
`;

export const BodyContainer = styled.main`
  width: 100%;
  max-width: 78.75rem;
  padding: 0 30px 0 30px;
  /* background: linear-gradient(0deg, #fbfafc, #fbfafc); */
  @media screen and (max-width: 1150px) {
    padding: 0;
    height: 600px;
  }
`;

export const BodyOutContainer = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  /* background: linear-gradient(0deg, #fbfafc, #fbfafc); */
`;

export const FirstLandingContainer = styled.div`
  width: 100%;
  height: 52rem;
  display: flex;
  align-items: center;
  transition: 0.5s all;
  position: relative;
  animation: 0.7s ease-in-out ${FadeAction};

  @media screen and (max-width: 1150px) {
    margin: 10px 0 0 0;
    height: auto;
    position: static;
    display: flex;
    flex-direction: column-reverse;
    width: 100%;
    justify-content: center;
    /* margin-bottom: 20px; */
    transition: 0.5s all;
  }
  @media screen and (max-width: 450px) {
    /* flex-direction: column; */
    /* height: 300px; */
  }
`;
export const FirstImageContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  height: 100%;
  transition: 0.5s all;
  z-index: 1;
  right: 100;
  flex: 1 0 auto;
  img {
    width: 700px;
    box-shadow: 3px 3px 3px #1a1a1a70;
  }
  @media screen and (max-width: 1150px) {
    position: static;
    width: 100%;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    /* justify-content: flex-start; */
    /* margin-bottom: 0px; */
    img {
      width: 500px;
    }
  }
  /* @media screen and (max-width: 37.5rem) {
    margin-bottom: 0;
    img {
      width: 310px;
    }
  } */
  @media screen and (max-width: 450px) {
    img {
      width: 300px;
    }
  }
`;

export const FirstTextContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  transition: 0.5s all;
  z-index: 2;
  position: absolute;
  right: 0;
  flex: 1 0 auto;

  @media screen and (max-width: 1150px) {
    position: static;
    /* bottom: 100; */
    margin-top: 20px;
    transition: 0.5s all;
    /* justify-content: flex-end; */
    align-items: center;
    text-align: center;
    width: 100%;
    /* height: 313px; */
  }
  @media screen and (max-width: 450px) {
    margin-top: 20px;
    /* height: 250px; */
  }

  a {
    display: flex;
    justify-content: center;
    text-decoration: none;
  }
`;

export const FirstText = styled.div`
  font-size: 1.5rem;
  transition: 0.5s all;
  color: white;
  text-shadow: 1px 1px 1px black;

  span {
    margin-bottom: 0.813rem;
  }

  div {
    margin: 12px 0px 12px 0px;
  }

  div:nth-child(1) {
    font-size: 40px;
    font-weight: 900;
  }

  div:nth-child(n + 2) {
    font-size: 22px;
    font-weight: 600;
  }

  @media screen and (max-width: 1150px) {
    div {
      margin-bottom: 4px;
    }

    div:nth-child(3) {
    }
  }

  @media screen and (max-width: 450px) {
    transition: 0.5s all;
    div {
      margin: 5px 0px 5px 0px;
    }

    div:nth-child(1) {
      font-size: 20px;
      font-weight: bold;
    }

    div:nth-child(n + 2) {
      font-size: 12px;
    }
  }
`;

export const FirstSecondText = styled.div`
  font-weight: 300;
  font-size: 1.875rem;
  margin: 0.5rem 0 2.75rem 0;
  transition: 0.5s all;
  text-shadow: 2px 2px #fff, 2px -2px #fff, -2px 2px #fff, -2px -2px #fff;
  @media screen and (max-width: 1000px) {
    margin: 39px 0 45px 0;
  }
  @media screen and (max-width: 37.5rem) {
    font-size: 20px;
    transition: 0.5s all;
    margin: 39px 0 45px 0;
    text-shadow: none;
  }
  @media screen and (max-width: 450px) {
    font-size: 16px;
    margin: 20px 0 40px 0;
  }
`;

export const GotoMainButton = styled.button`
  font-weight: 600;
  width: 15rem;
  height: 3.3rem;
  background-color: #f0f4ff;
  color: #393939;
  border: 1px solid #e4e4e4;
  box-shadow: 0px 0px 7px #7070706c;
  border-radius: 4px;
  box-sizing: border-box;
  /* box-shadow: 2px 2px 2px #49494950; */
  cursor: pointer;
  font-size: 17px;
  /* border: none; */
  transition: 0.5s all;
  margin-top: 15px;
  /* margin-bottom: 15px; */

  :hover {
    background-color: #e1eaff;
  }
  :active {
    background-color: #e1eaff;
    box-shadow: inset 1px 1px 1px gray;
  }

  @media screen and (max-width: 450px) {
    width: 160px;
    height: 35px;
    font-size: 12px;
  }
  &.last {
    border: 0px;
    background-color: #2f5fd7;
    color: #ffffff;
  }
`;

export const AllContainer = styled.div<Idx>`
  display: flex;
  flex-direction: ${(props) => (props.idx % 2 === 0 ? "row" : "row-reverse")};
  align-items: center;
  transition: 0.5s all;
  @media screen and (max-width: 1150px) {
    /* flex-direction: ${(props) =>
      props.idx % 2 === 0 ? "row" : "row-reverse"}; */
    flex-direction: column-reverse;
  }

  @media screen and (max-width: 450px) {
    /* flex-direction: ${(props) =>
      props.idx % 2 === 0 ? "row" : "row-reverse"}; */
    flex-direction: column-reverse;
  }
`;

export const ThirLandingContainer = styled.div<Idx>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => (props.idx === 0 ? "110px" : "0")};
  transition: 0.5s all;
  width: 100%;
  height: 45rem;
  position: relative;
  @media screen and (max-width: 1150px) {
    flex-direction: column-reverse;
    height: 700px;
  }
  @media screen and (max-width: 450px) {
    flex-direction: column-reverse;
    margin-top: 0px;
    margin-bottom: 10px;
    height: 350px;
  }
`;

export const ThirTextContainer = styled.div<Idx>`
  position: absolute;
  display: flex;
  flex-direction: column;
  transition: 0.5s all;
  justify-content: center;
  align-items: center;
  z-index: 2;
  margin-left: ${(props) => (props.idx % 2 === 0 ? "140px" : "none")};
  margin-right: ${(props) => (props.idx % 2 === 0 ? "none" : "140px")};
  left: ${(props) => (props.idx % 2 === 0 ? "0" : "none")};
  right: ${(props) => (props.idx % 2 === 0 ? "none" : "0")};
  @media screen and (max-width: 1150px) {
    position: static;
    left: none;
    right: none;
    top: 0;
    margin: 30px 0 0 0;
  }
`;

export const TitleContainer = styled.div`
  font-size: 25px;
  font-weight: 700;
  z-index: 2;
  transition: 0.5s all;
  color: white;
  text-shadow: 1px 1px 1px black;

  div {
    margin-bottom: 13px;
    transition: 0.5s all;
  }
  @media screen and (max-width: 1150px) {
  }
  @media screen and (max-width: 37.5rem) {
    transition: 0.5s all;
    div {
      margin-bottom: 9px;
      transition: 0.5s all;
    }
  }
  @media screen and (max-width: 450px) {
    font-size: 12px;
  }
`;

export const DescrContainer = styled.div`
  font-size: 24px;
  font-weight: 100;
  transition: 0.5s all;
  div {
    margin-top: 10px;
    margin-bottom: 9px;
    transition: 0.5s all;
    background: rgba(255, 255, 255, 0.5);
  }
  @media screen and (max-width: 1150px) {
    div {
      background: none;
    }
  }
  @media screen and (max-width: 37.5rem) {
    font-size: 15px;
    font-weight: 100;
    transition: 0.5s all;
    div {
      margin-bottom: 5px;
      transition: 0.5s all;
    }
  }
  @media screen and (max-width: 450px) {
    font-size: 12px;
  }
`;

export const ThirImageContainer = styled.div<Idx>`
  /* margin: ${(props) =>
    props.idx % 2 === 0 ? "30px 100px 0 0" : "30px 0 0 30px"}; */
  display: flex;
  justify-content: center;
  transition: 0.5s all;
  position: absolute;
  z-index: 1;
  left: ${(props) => (props.idx % 2 === 0 ? "none" : "0")};
  right: ${(props) => (props.idx % 2 === 0 ? "0" : "none")};

  img {
    width: 700px;
    transition: 0.5s all;
    box-shadow: 3px 3px 3px #1a1a1a70;
    &.mobile {
      margin-right: 50px;
      width: 210px;
      height: 420px;
    }
  }
  @media screen and (max-width: 1150px) {
    left: none;
    right: none;
    margin: 30px 0 0 0;
    position: static;
    bottom: 0;
    transition: 0.5s all;
    img {
      width: 500px;
      &.mobile {
        margin-right: 10px;
        margin-left: 10px;
        /* width: 100px;
        height: 190px; */
      }
    }
  }
  @media screen and (max-width: 450px) {
    img {
      /* margin-left: ${(props) => (props.idx % 2 === 0 ? "30px" : "0px")};
      margin-right: ${(props) => (props.idx % 2 === 0 ? "0px" : "30px")}; */
      /* left: ${(props) => (props.idx % 2 === 0 ? "none" : "0px")};
      right: ${(props) => (props.idx % 2 === 0 ? "0px" : "none")}; */
      width: 300px;
      /* height: 238px; */
      transition: 0.5s all;
      &.mobile {
        margin-right: 10px;
        margin-left: 10px;
        width: 100px;
        height: 190px;
      }
    }
  }
`;

export const SevLandingContainer = styled.div`
  width: 100%;
  height: 223px;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s all;
  @media screen and (max-width: 1000px) {
  }
  @media screen and (max-width: 37.5rem) {
    width: 100%;
    height: 144px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s all;
  }
`;

export const ThirdBodyContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 78.75rem;
  padding: 0 27px 0 27px;
  /* background: linear-gradient(0deg, #fbfafc, #fbfafc); */
  @media screen and (max-width: 1150px) {
    padding: 0;
  }
`;

export const ThirdBodyOutContainer = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  /* background: linear-gradient(0deg, #fbfafc, #fbfafc); */
`;
export const GoTopContainer = styled.div`
  position: fixed;
  cursor: pointer;
  top: 92vh;
  left: 92vw;
  z-index: 99;
  img {
    opacity: 0.2;
    :hover {
      opacity: 1;
    }
  }
  @media screen and (max-width: 37.5rem) {
    top: 93%;
    left: 85%;
    img {
      width: 30px;
      height: 30px;
    }
  }
`;

export const FooterDiv = styled.div`
  align-items: center;
  text-align: center;
  padding: 0.7rem;
  font-size: 15px;
  color: white;
  height: 50px;
  ${mediaQuery.mobile} {
    font-size: 12px;
  }
`;

export const MobileImg = styled.img`
  height: 390px;
`;
