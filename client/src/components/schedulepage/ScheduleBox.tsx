import { Link } from "react-router-dom";
import styled from "styled-components";
import { AddBtn, BoxHeader, BoxSection, BoxWrapper } from "../../style/theme";
import BoxSample from "../mainpage/BoxSample";

// interface Iprops {
//   handleCurrentPage: () => void;
// }
// { handleCurrentPage }: Iprops
{
  /* <div onClick={handleCurrentPage}>         </div> */
}

export default function ScheduleBox() {
  return (
    <BoxSection>
      <BoxHeader>
        <span>스케쥴</span>
        <Link to="/schedule/add">
          <AddBtn>새스케줄추가</AddBtn>
        </Link>
      </BoxHeader>
      <BoxWrapper>
        <Link to="/schedule/view">
          <BoxSample />
        </Link>
      </BoxWrapper>
    </BoxSection>
  );
}
