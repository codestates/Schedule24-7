import { FC } from "react";
import styled from "styled-components";

const Block = styled.div`
  h2 {
    margin: 0;
    font-weight: 700;
    font-size: 25px;
    color: #6a6a6a;
    border-bottom: 0.5px solid #9c9a9a;
    padding-bottom: 10px;
  }
  margin-bottom: 20px;
`;

interface Props {
  title: string;
}

const InnerHeader: FC<Props>= ({ title }) => {
  return (
    <Block>
      <h2>{title}</h2>
    </Block>
  );
};

export default InnerHeader;
