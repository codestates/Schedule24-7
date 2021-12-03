import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ConfirmModal from "./ConfirmModal";
import { NormalBox, NormalBtn } from "../../style/theme";
// import { logoutChange } from "../actions/loginChange";

export const EditWrapper = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

axios.defaults.withCredentials = true;

// { handlePassword, handleChangePassowrd }

export default function EditUser() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = (): void => {
    setOpenModal(true);
  };

  const handleCloseModal = (): void => {
    setOpenModal(false);
  };

  // const dispatch = useDispatch();

  // const useConfirm = (message = null, onConfirm, onCancel) => {
  //   if (!onConfirm || typeof onConfirm !== "function") {
  //     return;
  //   }
  //   if (onCancel && typeof onCancel !== "function") {
  //     return;
  //   }
  //   const confirmAction = () => {
  //     if (window.confirm(message)) {
  //       onConfirm();
  //     } else {
  //       onCancel();
  //     }
  //   };
  //   return confirmAction;
  // };

  const deleteConfirm = (): void => {
    // console.log("삭제했습니다.");
    // axios
    //   .delete("https://server.webmarker.link/users", {
    //     headers: {
    //       Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    //     },
    //   })
    //   .then(() => {
    //     dispatch(logoutChange());
    //     alert("계정삭제가 정상적으로 처리되었습니다");
    //   });
    return;
  };

  const cancelConfirm = () => console.log("취소했습니다.");
  // const confirmDelete = useConfirm(
  //   "정말 탈퇴하시겠습니까?",
  //   deleteConfirm,
  //   cancelConfirm
  // );

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <EditWrapper>
        <NormalBox
          type="password"
          placeholder="변경할 비밀번호"
          // onChange={handlePassword("newPassword")}
        />
        <NormalBox
          type="password"
          placeholder="변경할 비밀번호 확인"
          // onChange={handlePassword("newPasswordCheck")}
        />
        <NormalBtn>비밀번호변경</NormalBtn>
        <NormalBtn className="out" onClick={handleOpenModal}>
          회원탈퇴
        </NormalBtn>
        {openModal ? (
          <ConfirmModal
            handleCloseModal={handleCloseModal}
            deleteConfirm={deleteConfirm}
          />
        ) : (
          ""
        )}
      </EditWrapper>
    </form>
  );
}

// onClick={handleChangePassowrd}
// onClick={confirmDelete}
