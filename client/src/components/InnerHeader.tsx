import { FC } from "react";
import styled from "styled-components";

// const Block = styled.div`
//   h2 {
//     margin: 0;
//     font-weight: 700;
//     font-size: 25px;
//     color: #6a6a6a;
//     border-bottom: 0.5px solid #9c9a9a;
//     padding-bottom: 10px;
//   }
//   margin-bottom: 20px;
// `;

 const Block = styled.div`
  display: flex;
  justify-content: space-between;
  border-width: 0px 0px 1px 0px;
  border-style: solid;
  border-color: #696969;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
  padding-bottom: 0.1rem;
`;

interface Props {
  title: string;
}

const InnerHeader: FC<Props>= ({ title }) => {
  return (
    <Block>
      <div>{title}</div>
    </Block>
  );
};

export default InnerHeader;
