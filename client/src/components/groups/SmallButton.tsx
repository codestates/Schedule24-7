import { FC } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Block = styled.div`
  display: flex;
  width: 135px;
  height: 30px;
  background-color: ${(props) => props.color};
  border: 1px solid #000000;
  border-radius: 12px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  color: white;
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
