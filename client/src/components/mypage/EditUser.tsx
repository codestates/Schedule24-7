import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ConfirmModal from "./ConfirmModal";
// import { logoutChange } from "../actions/loginChange";

export const EditBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.3rem;
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
      <div>
        <input
          type="password"
          placeholder="변경할 Password"
          // onChange={handlePassword("newPassword")}
        ></input>
      </div>
      <div>
        <input
          type="password"
          placeholder="변경할 Password 확인"
          // onChange={handlePassword("newPasswordCheck")}
        ></input>
      </div>
      <EditBtnWrapper>
        <div>
          <button>비밀번호변경</button>
        </div>
        <div>
          <button onClick={handleOpenModal}>회원탈퇴</button>
        </div>
      </EditBtnWrapper>
      {openModal ? (
        <ConfirmModal
          handleCloseModal={handleCloseModal}
          deleteConfirm={deleteConfirm}
        />
      ) : (
        ""
      )}
    </form>
  );
}

// onClick={handleChangePassowrd}
// onClick={confirmDelete}
