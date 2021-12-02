import { FC } from "react";
import { useNavigate } from "react-router";
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
