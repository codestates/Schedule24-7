import styled from "styled-components";
import { AddBtn, BoxHeader, BoxSection, BoxWrapper } from "../../style/theme";
import BoxSample from "./BoxSample";

export default function GroupShortcut() {
  return (
    <BoxSection>
      <BoxHeader>
        <span>그룹</span>
        <AddBtn>새그룹추가</AddBtn>
      </BoxHeader>
      <BoxWrapper>
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
        <BoxSample />
      </BoxWrapper>
    </BoxSection>
  );
}
