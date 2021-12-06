import { FC } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Block = styled.div`
  text-align: center;
  padding: 0px;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  width: 370px;
  height: 70px;
  left: 10px;
  img {
    width: 70px;
    height: 70px;
  }
`;

interface Props {  
  onClick: () => void;
  iconSrc: string;
}

const AddListButton: FC<Props> = ({ onClick, iconSrc }) => {   
  return (
    <Block onClick={onClick}>
      <img alt="icon" src={iconSrc} />
    </Block>
  );
};

export default AddListButton;
