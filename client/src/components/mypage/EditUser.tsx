import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import ConfirmModal from "./ConfirmModal";
import { ErrMsg, NormalBox, NormalBtn } from "../../style/theme";
import { logoutChange } from "../../redux/actions/loginActions";
import { useNavigate } from "react-router";

axios.defaults.withCredentials = true;

export const EditWrapper = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function EditUser({
  handlePassword,
  handleChangePassowrd,
  newPassword,
}: any) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  //모달창 여는 함수
  const handleOpenModal = (): void => {
    setOpenModal(true);
  };

  //모달창 닫는 함수
  const handleCloseModal = (): void => {
    setOpenModal(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //회원탈퇴 함수
  const deleteConfirm = (): void => {
    axios
      .delete("https://server.schedule24-7.link/users", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        dispatch(logoutChange());
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("userId");
        window.localStorage.removeItem("password");
        alert("계정삭제가 정상적으로 처리되었습니다");
        navigate("/");
      });
  };

  //비밀번호 유효성 검사 함수
  const strongPassword = (str: string): boolean => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      str
    );
  };

  //유효성체크해서 에러여부 리턴하는 함수
  const validationConfirm = (): boolean => {
    if (strongPassword(newPassword.newPassword)) {
      return true;
    } else {
      return false;
    }
  };

  //비밀번호 유효성 검사 결과 렌더링하는 함수
  const renderValidationCheckMessage = () => {
    if (newPassword.newPassword !== "" && !validationConfirm()) {
      return <ErrMsg className="err">유효하지 않은 비밀번호입니다</ErrMsg>;
    }
  };

  //비밀번호 일치여부 판단하는 함수
  const passwordMatchConfirm = () => {
    if (newPassword.newPassword === newPassword.newPasswordCheck) {
      return true;
    } else {
      return false;
    }
  };

  //비밀번호 불일치 오류메세지를 렌더하는 함수
  const renderFeedbackMessage = () => {
    if (!passwordMatchConfirm()) {
      return <ErrMsg className="err">패스워드가 일치하지 않습니다</ErrMsg>;
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <EditWrapper>
        <NormalBox
          type="password"
          placeholder="8자 이상, 영어, 숫자, 특수문자를 포함한 비밀번호"
          onChange={handlePassword("newPassword")}
        />
        {renderValidationCheckMessage()}
        <NormalBox
          type="password"
          placeholder="변경할 비밀번호 확인"
          onChange={handlePassword("newPasswordCheck")}
        />
        {renderFeedbackMessage()}
        <NormalBtn onClick={handleChangePassowrd}>비밀번호변경</NormalBtn>
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
