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
  cursor: pointer;
  img {
    width: 80px;
    height: 80px;
  }
`;

interface Props {
  title: string;
  onClick: () => void;
  iconSrc: string;
}

const AppButton: FC<Props> = ({ title, onClick, iconSrc }) => {
  return (
    <Block onClick={onClick}>
      <img alt="icon" src={iconSrc} />
      <div>{title}</div>
    </Block>
  );
};

export default AppButton;
