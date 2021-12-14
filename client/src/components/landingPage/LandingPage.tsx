import { Link } from "react-router-dom";
import {
  AllLandingContainer,
  FirstLandingContainer,
  FirstText,
  GotoMainButton,
  FirstSecondText,
  FirstTextContainer,
  FirstImageContainer,
  ThirLandingContainer,
  ThirTextContainer,
  SevLandingContainer,
  ThirImageContainer,
  TitleContainer,
  DescrContainer,
  AllContainer,
  BodyContainer,
  BodyOutContainer,
  ThirdBodyContainer,
  ThirdBodyOutContainer,
  GoTopContainer,
} from "./LandingPage.style";

function LandingPage() {
  const LandingPageTxt = [
    {
      title: ["쉽고", "직관적인 UI로", "손쉬운 그룹관리!"],
      img: "https://cdn.discordapp.com/attachments/876977982760165416/920190535275274280/ea0a821c56146d0f.gif",
      descr: [],
    },
    {
      title: [
        "스케줄에",
        "영향을 미치는 상황들을",
        "간편하게 관리!",
      ],
      img: "https://cdn.discordapp.com/attachments/876977982760165416/920190535275274280/ea0a821c56146d0f.gif",
      descr: [],
    },
    {
      title: ["알고리즘을 통해", "자동적으로", "스케줄표 생성!"],
      img: "https://cdn.discordapp.com/attachments/876977982760165416/920190535275274280/ea0a821c56146d0f.gif",
      descr: [],
    },
  ];

  // 마지막 버튼 밑으로 스크롤이 내려간 상태로 메인으로 연결되는 것을 방지해 주는 핸들러
  const scrollHandler = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <AllLandingContainer>
      <GoTopContainer onClick={() => scrollHandler()}>
        <img src="https://media.discordapp.net/attachments/876977982760165416/920198933354008596/topButton.png" alt="gotop_icon"></img>
      </GoTopContainer>
      <BodyOutContainer>
        <BodyContainer>
          <FirstLandingContainer>
            <FirstTextContainer>
              <FirstText>
                <div>Schedule24/7</div>
                <div>그 동안 힘들었던 근무 스케줄 관리</div>
                <div>이제는 스케줄 24/7과 함께 쉽고 빠르게 관리하고</div>
                <div>스케줄표를 자동으로 만들어보세요!</div>
              </FirstText>
              <FirstSecondText>    
              </FirstSecondText>
              <Link to="/main">
                <GotoMainButton>Schedule24/7 체험하기</GotoMainButton>
              </Link>
            </FirstTextContainer>
            <FirstImageContainer>
              <img src="https://cdn.discordapp.com/attachments/876977982760165416/920190535275274280/ea0a821c56146d0f.gif" alt="landingpage_img1"></img>
            </FirstImageContainer>
          </FirstLandingContainer>
        </BodyContainer>
      </BodyOutContainer>
      <ThirdBodyOutContainer>
        <ThirdBodyContainer>
          {LandingPageTxt.map((el, idx) => {
            return (
              <ThirLandingContainer idx={idx} key={el.title[0]}>
                <AllContainer idx={idx}>
                  <ThirTextContainer idx={idx}>                   
                    <TitleContainer>
                      {el.title.map((el) => {
                        return <div key={el[0]}>{el}</div>;
                      })}
                    </TitleContainer>
                    <DescrContainer>
                      {el.descr.map((el) => {
                        return <div key={el[0]}>{el}</div>;
                      })}
                    </DescrContainer>
                  </ThirTextContainer>
                  <ThirImageContainer idx={idx}>
                    {" "}
                    <img src={el.img} alt={el.title[0]}></img>
                  </ThirImageContainer>
                </AllContainer>
              </ThirLandingContainer>
            );
          })}
        </ThirdBodyContainer>
      </ThirdBodyOutContainer>
      <SevLandingContainer>
        {" "}
        <Link to="/main">
          <GotoMainButton onClick={() => scrollHandler()}>
            Schedule24/7 체험하기
          </GotoMainButton>
        </Link>
      </SevLandingContainer>
    </AllLandingContainer>
  );
}

export default LandingPage;

export {}