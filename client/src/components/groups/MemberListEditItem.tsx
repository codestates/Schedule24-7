import { FC, useState, useCallback, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { DefaultLayout, hideMobileCss, mediaQuery } from "../../GlobalStyle";
import SmallButton from "./SmallButton";
import { getGroupsApi } from "../../lib/api/group";
import { getGroups } from "../../redux/actions/Group";
import { deleteMemberApi } from "../../lib/api/group";
import { useParams, useNavigate } from "react-router";
import { RootState } from "../../redux/reducers";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import { updateGroupMemberApi } from "../../lib/api/group";
import Confirm from "../../lib/confirm";

const Block = styled.div`
  width: 310px;
  min-height: 190px;
  margin-left: 5px;
  display: flex;
  flex-direction: column;

  &.edit {
    display: none !important;
  }
`;

const DescBlock = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: center;
  margin-left: 10px;

  > #membertitle {
    font-size: 12px;
    font-style: bold;
    width: 60px;
  }
  > #membervalue {
    margin-left: 50px;
    display: flex;
    font-size: 22px;
    white-space: pre-wrap;
    justify-content: flex-start;
    align-items: flex-end;
    font-style: bold;
    width: 200px;
  }
  &.button {
    margin-top: 30px;
    margin-right: 20px;
    justify-content: space-between;
  }
`;

const EditBlock = styled.div`
  width: 300px;
  min-height: 190px;
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  margin-right: 10px;

  &.edit {
    display: none !important;
  }
`;

interface Props {
  name: string;
  position: string;
  vacation: string;
  memberId: number;
}

interface FormState {
  memberName: string;
  memberPosition: string;
  memberVacation: Date[];
  memberId: number;
}

const MemberListEditItem: FC<Props> = ({
  name,
  position,
  vacation,
  memberId,
}) => {
    const { groupId } = useParams();
  const [form, setForm] = useState<FormState>({
    memberName: "",
    memberPosition: "",
    memberVacation: [],
    memberId: 0,
  });
  
  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const changeSelectDay = useCallback((value: Date) => {
    const targetTime = value.getTime();
    setForm((prev) => {
      const findObj = prev.memberVacation.find(
        (date) => date.getTime() === targetTime
      );
      if (typeof findObj === "undefined") {
        return {
          ...prev,
          memberVacation: prev.memberVacation.concat(value),
        };
      }
      return {
        ...prev,
        memberVacation: prev.memberVacation.filter(
          (date) => date.getTime() !== targetTime
        ),
      };
    });
  }, []);

  const updateGroupMember = async () => {
    const { memberVacation, ...formState } = form;

    const stringMemberVations: string[] = memberVacation.map(
      (dateObj: Date): string => {
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const date = dateObj.getDate();

        return `${year}-${String(month).padStart(2, "0")}-${String(
          date
        ).padStart(2, "0")}`;
      }
    );

    try {
      await updateGroupMemberApi({
        ...formState,
        memberVacation: stringMemberVations,
        groupId: groupId as string,
        memberId
      });
      const response = await getGroupsApi();
      dispatch(getGroups(response.data));
      alert("멤버 수정 완료!")
      setIsEdit(false);
    } catch (err) {
      alert("멤버 수정 실패!")
    }
  };
  const dispatch = useDispatch();
   useEffect(() => {
    getGroupsApi().then((res) => {
      dispatch(getGroups(res.data));
    });
  }, [dispatch]);

  const [isEdit, setIsEdit] = useState(false);
  const handleButton = () => {
    setIsEdit(true);
  };
  const handleCancleButton = () => {
    setIsEdit(false);
  };

  const navigate = useNavigate();
  const groups = useSelector((store: RootState) => store.group.groups);
  const selectGroup = groups.filter((item) => item._id === groupId)[0];

  const deleteMember = async () => {
    try {
      await deleteMemberApi({
        groupId: groupId as string,
        memberId,
      });
      const response = await getGroupsApi();
      dispatch(getGroups(response.data));
      alert("멤버삭제 완료!");
      navigate(`/group/${groupId}/member`);
    } catch (err) {}
  };

  return (
    <>
      <Block className={isEdit ? "edit" : ""}>
        <DescBlock>
          <div id="membertitle">이름</div>
          <div id="membervalue">{name}</div>
        </DescBlock>
        <DescBlock>
          <div id="membertitle">직급</div>
          <div id="membervalue">{position}</div>
        </DescBlock>
        <DescBlock>
          <div id="membertitle">휴가예정일</div>
          <div id="membervalue">{vacation}</div>
          {/* {memberId} */}
        </DescBlock>
        <DescBlock className="button">
          <SmallButton title={"수정"} onClick={handleButton} color={"black"} />
          <SmallButton title={"삭제"} onClick={deleteMember} color={"red"} />
        </DescBlock>
      </Block>
      <EditBlock className={isEdit ? "" : "edit"}>
        <DescBlock>
          <div id="membertitle">이름</div>
          <input
            className="inputbox"
            onChange={changeHandler}
            name="memberName"
            id="membervalue"
            placeholder="이름을 입력해주세요"
          />
        </DescBlock>
        <DescBlock>
          <div id="membertitle">직급</div>
          <input
            name="memberPosition"
            onChange={changeHandler}
            id="membervalue"
            placeholder="직급을 입력해주세요"
          />
        </DescBlock>
        <DescBlock>
          <div id="membertitle">휴가예정일</div>
          <DayPicker
            onDayClick={changeSelectDay}
            selectedDays={form.memberVacation}
            className="picker"
          />
        </DescBlock>
        <DescBlock className="button">
          <SmallButton
            title={"수정 완료"}
            onClick={updateGroupMember}
            color={"black"}
          />
          <SmallButton
            title={"수정 취소"}
            onClick={handleCancleButton}
            color={"grey"}
          />
        </DescBlock>
      </EditBlock>
    </>
  );
};

export default MemberListEditItem;
