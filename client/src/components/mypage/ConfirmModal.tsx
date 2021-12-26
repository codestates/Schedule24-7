import styled from "styled-components";

export const ModalBackdrop = styled.div`
  background-color: rgba(255, 255, 255, 0);
  position: fixed;
  top: 0%;
  left: 0%;
  bottom: 0%;
  right: 0%;
`;

export const ModalBtn = styled.button`
  background-color: #000000;
  width: 3.5rem;
  height: 2rem;
  text-decoration: none;
  border: none;
  color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  margin: 0.15rem;

  &.cancel {
    background-color: #c40000;
  }
`;

export const ModalBtnWrapper = styled.div`
  margin-top: 2.5rem;
`;

export const TextWrapper = styled.div`
  margin-top: 2.5rem;
  font-weight: bold;
`;

export const ModalView = styled.div`
  position: absolute;
  top: calc(50vh - 100px);
  left: calc(50vw - 131px);
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.1rem solid rgba(0, 20, 27, 0.3);
  border-radius: 10px;
  width: 400px;
  height: 200px;
  box-shadow: 0.3rem 0.3rem 0.3rem rgba(0, 20, 27, 0.3);
  z-index: 10;
`;

export default function ConfirmModal({ handleCloseModal, deleteConfirm }: any) {
  return (
    <>
      <ModalView>
        <TextWrapper>정말 삭제하시겠습니까?</TextWrapper>
        <ModalBtnWrapper>
          <ModalBtn onClick={deleteConfirm}>확인</ModalBtn>
          <ModalBtn className="cancel" onClick={handleCloseModal}>
            취소
          </ModalBtn>
        </ModalBtnWrapper>
      </ModalView>
      <ModalBackdrop onClick={handleCloseModal}></ModalBackdrop>
    </>
  );
}
