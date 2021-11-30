import { FC } from "react";
import styled from "styled-components";

const Block = styled.div`
  text-align: center;
  padding: 13px;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  position: relative;
  img {
    width: 50px;
    height: 45px;
  }
`;

interface Props {
  title: string;
}

const AddListItem: FC<Props>= ({ title }) => {
  return (
    <Block>
      <img
        alt="plus"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX////Qz84AAADU09Lc29qenp5ra2sYGBhkY2JoaGh5eHfW1dOEg4Oqqqq5ubmOjYwuLS3EwsG1s7Pg4OARERG7u7ujo6NKSkr19fVVVFRCQkIICAhwcHCamZkdHR1+fX2SNhhVAAACKElEQVR4nO3b23aCMBBAUQFBERUV75f6/39Z2r4aCEloxvHsD2DlrIl5aNLJBAAAAAAAAAAAAAAAfI7mlPbZH2Iv0se5t+/HOyfmVoWn2Mv0YFe4j71MD3aFs9jL9PAphZf17rX1UknhfJq9VuVqCpPXsof6QmYoH4UUysdJo3+GFMpHISeNfBRSKB8nDTOUjxnqL2SXyscM9c9QfyG7VD5mqH+GFMpHISeNfBRSKB8njf4ZUigfhZw08h2tZvgVe5m/jmUx3P1qNcPbffiny1XgwDL10Ffo5hI0sPEJ7N2ljrKQhWu/wmqMGaZB96lfYZ0ZCpOtjsKraZMmSfUUVvioHeTmwDZxVS8Hq7/GKrw1hjf33ToC25+ig2YzWmHXNP7RlEIKKYyOQgopjI9CCimMj0IKKYyPQgopjI9CCjsKm6wa7K3+Xpo+Fw7yrsTpyuGbz9lohW42pqunNnDh8V05hea7p8zru0ELD16F73B/ONYdsFdh0Dvgic/vZaRb7nnQwHafFuVwhd1bjNTh28UucKCjvvc0f4Uy3tO40f8mikJe7snHDPXPUH8hu1Q+Zqh/hvoL2aXyMUP9M6RQPgo5aeSjkEL5OGn0z5BC+SjkpJGPGeqfof5Cdql8zFD/DPUXskvlY4b6Z0ihfBRy0shHoZZdetma1EoK+1AomV3hPvYyPdgVXmMv08PZqlDIP4e4STb9gXnsRQIAAAAAAAAAAAAAAMDKN0cKZeaGiKpiAAAAAElFTkSuQmCC"
      />
      <div>{title}</div>
    </Block>
  );
};

export default AddListItem;
