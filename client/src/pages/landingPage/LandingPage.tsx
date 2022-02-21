import axios from "axios";
import { useEffect, useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { loginChange } from "../../redux/actions/loginActions";
import {
  AllLandingContainer,
  FirstLandingContainer,
  FirstText,
  GotoMainButton,
  FirstTextContainer,
  FirstImageContainer,
  ThirLandingContainer,
  ThirTextContainer,
  SevLandingContainer,
  ThirImageContainer,
  TitleContainer,
  AllContainer,
  BodyContainer,
  BodyOutContainer,
  ThirdBodyContainer,
  ThirdBodyOutContainer,
  GoTopContainer,
  LandingHeader,
  HeaderLeft,
  HeaderLogo,
  HeaderRight,
  HeaderItem,
  FooterDiv,
} from "./LandingPage.style";

function LandingPage() {
  const dispatch = useDispatch();
  //스크롤 포지션 상태
  const [scrollPosition, setScrollPosition] = useState(0);

  //스크롤 포지션 업데이트 함수
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  //스크롤 될 때 마다 실행
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  });

  const LandingPageTxt = [
    {
      title: [
        "쉽고 직관적인 UI로",
        "모바일환경에서도 활용 가능한",
        "손쉬운 그룹관리!",
      ],
      img: "https://cdn.discordapp.com/attachments/907157959333785630/922104091717562378/landing1-1.gif",
      img2: "https://cdn.discordapp.com/attachments/907157959333785630/922115153791688704/landing1-2.gif",
      descr: [],
      mobile: true,
    },
    {
      title: [
        "스케줄에 영향을 미치는",
        "다양한 조건들과 상황들을",
        "간편하게 관리!",
      ],
      img: "https://cdn.discordapp.com/attachments/907157959333785630/922102064270692362/Landing2.gif",
      img2: undefined,
      descr: [],
      mobile: false,
    },
    {
      title: ["알고리즘을 통해", "자동으로 간편하게", "스케줄표 생성!"],
      img: "https://cdn.discordapp.com/attachments/907157959333785630/922115951648997427/Landing3.gif",
      img2: undefined,
      descr: [],
      mobile: false,
    },
  ];

  // 마지막 버튼 밑으로 스크롤이 내려간 상태로 메인으로 연결되는 것을 방지해 주는 핸들러
  const scrollHandler = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  //테스트 계정 로그인
  const handleLoginTest = () => {
    axios.get("https://server.schedule24-7.link/users/guest").then((res) => {
      window.localStorage.setItem("token", res.data.accessToken);
      window.localStorage.setItem("test", res.data.test);
      dispatch(loginChange());

      swal({
        text: "체험계정은 기능 체험을 위한 최소한의 데이터가 설정되어 있습니다. 이를 통해서 빠르게 스케줄 생성 기능을 체험해보실 수 있어요. \n\n체험계정은 하루가 지나거나 로그아웃을 하게되면 계정이 사라지게 됩니다. 참고해서 사용해주세요!",
        icon: "info",
      });
    });
  };

  return (
    <AllLandingContainer>
      <GoTopContainer onClick={() => scrollHandler()}>
        <img
          src="https://media.discordapp.net/attachments/876977982760165416/920198933354008596/topButton.png"
          alt="gotop_icon"
        ></img>
      </GoTopContainer>
      <LandingHeader theme={scrollPosition}>
        <HeaderLeft>
          <Link to="/">
            <HeaderLogo src="https://media.discordapp.net/attachments/907157959333785630/916227740267581440/S247_Logoheadertitle.png" />
          </Link>
        </HeaderLeft>
        <HeaderRight>
          <Link to="/login">
            <HeaderItem>로그인</HeaderItem>
          </Link>
          <Link to="/signup">
            <HeaderItem>회원가입</HeaderItem>
          </Link>
        </HeaderRight>
      </LandingHeader>
      <BodyOutContainer>
        <BodyContainer>
          <FirstLandingContainer>
            <FirstTextContainer>
              <FirstText>
                <div>Schedule24/7</div>
                <div>그 동안 힘들었던 근무 스케줄 관리,</div>
                <div>스케줄표 짜기도 많이 힘드셨다면</div>
                <div>스케줄 24/7과 함께 쉽고 빠르게 관리하고</div>
                <div>자동으로 스케줄표도 만들어보세요!</div>
              </FirstText>
              <Link to="/">
                <GotoMainButton onClick={handleLoginTest}>
                  Schedule24/7 체험하기
                </GotoMainButton>
              </Link>
            </FirstTextContainer>
            <FirstImageContainer>
              <img
                src="https://cdn.discordapp.com/attachments/907157959333785630/922114466211045386/landing_main_1.gif"
                alt="landingpage_img1"
              ></img>
            </FirstImageContainer>
          </FirstLandingContainer>
        </BodyContainer>
      </BodyOutContainer>
      <ThirdBodyOutContainer>
        <ThirdBodyContainer>
          {LandingPageTxt.map((el, idx) => {
            return (
              <Fade direction={"up"} triggerOnce>
                <ThirLandingContainer idx={idx} key={el.title[0]}>
                  <AllContainer idx={idx}>
                    <ThirTextContainer idx={idx}>
                      <TitleContainer>
                        {el.title.map((el) => {
                          return <div key={el[0]}>{el}</div>;
                        })}
                      </TitleContainer>
                    </ThirTextContainer>
                    <ThirImageContainer idx={idx}>
                      <img
                        src={el.img}
                        alt={el.title[0]}
                        className={el.mobile === true ? "mobile" : ""}
                      />
                      {el.img2 !== undefined ? (
                        <img
                          src={el.img2}
                          alt={el.title[0]}
                          className={el.mobile === true ? "mobile" : ""}
                        />
                      ) : (
                        ""
                      )}
                    </ThirImageContainer>
                  </AllContainer>
                </ThirLandingContainer>
              </Fade>
            );
          })}
        </ThirdBodyContainer>
      </ThirdBodyOutContainer>
      <SevLandingContainer>
        <Link to="/">
          <GotoMainButton onClick={handleLoginTest}>
            Schedule24/7 체험하기
          </GotoMainButton>
        </Link>
      </SevLandingContainer>
      <FooterDiv>Copyright © Schedule24/7 All Rights Reserved.</FooterDiv>
    </AllLandingContainer>
  );
}

export default LandingPage;

export {};

// {LandingPageTxt.map((el, idx) => {
//   return (
//     <ThirLandingContainer idx={idx} key={el.title[0]}>
//       <AllContainer idx={idx}>
//         <ThirTextContainer idx={idx}>
//           <TitleContainer>
//             {el.title.map((el) => {
//               return <div key={el[0]}>{el}</div>;
//             })}
//           </TitleContainer>
//         </ThirTextContainer>
//         <ThirImageContainer idx={idx}>
//           <img src={el.img} alt={el.title[0]}></img>
//         </ThirImageContainer>
//       </AllContainer>
//     </ThirLandingContainer>
//   );
// })}
