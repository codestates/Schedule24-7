import { FC } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Block = styled.div`
  display: none;
  text-align: center;
  width: 310px;
  left: 10px;
  top: 160px;
  background-color: #ffffff;
  box-shadow: 3px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  border: 0.01rem solid rgba(0, 0, 0, 0.15);
  margin: 5px;
  padding: 5px 0;
  img {
    width: 45px;
    height: 45px;
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
