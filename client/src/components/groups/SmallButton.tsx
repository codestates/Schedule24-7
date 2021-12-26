import { FC } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Block = styled.div`
  display: flex;
  width: 100px;
  height: 30px;
  background-color: ${(props) => props.color};
  color: white;
  box-shadow: 0.05rem 0.05rem 0.05rem #696969;
  border: 0px solid #a5a5a5;
  cursor: pointer;
  margin: 0.5rem;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

interface Props {
  title: string;
  onClick: () => void;
  color: string;
}

const SmallButton: FC<Props> = ({ title, onClick, color }) => {
  return (
    <Block color={color} onClick={onClick}>
      <div>{title}</div>
    </Block>
  );
};

export default SmallButton;
