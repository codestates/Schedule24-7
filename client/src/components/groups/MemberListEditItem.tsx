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
import swal from "sweetalert";

const DescBlock2 = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 20px;
`

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
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 20px;
  margin-bottom: 10px;

  > #membertitle {
    display: flex;
    font-size: 16px;
    margin-right: 0px;
    line-height: 20px;
    justify-content: flex-end;
    align-items: flex-end;
    font-style: bold;
    width: 100px;
  }
  > #membervalue {
    margin-left: 30px;
    display: flex;
    font-size: 20px;
    justify-content: flex-start;
    align-items: flex-end;
    font-style: bold;
    width: 165px;
  }

 > .membertitle {
    display: flex;
    font-size: 16px;
    margin-right: 0px;
    line-height: 20px;
    justify-content: flex-end;
    align-items: flex-end;
    font-style: bold;
    width: 70px;
  }

  > .membervalue {
    margin-left: 40px;
    display: flex;
    font-size: 16px;
    justify-content: flex-start;
    align-items: flex-end;
    font-style: bold;
    width: 160px;
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
      swal({
        title: "멤버수정 완료",
        icon: "success",
      });
      setIsEdit(false);
    } catch (err) {
      swal({
        title: "모든항목을 입력해주세요",
        icon: "error",
      });
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
      swal({
        title: "멤버삭제 완료",
        icon: "success",
      });
      navigate(`/group/${groupId}/member`);
    } catch (err) {
      swal({
        title: "멤버삭제 실패",
        icon: "error",
      });
    
    }
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
          <SmallButton title={"수정"} onClick={handleButton} color={"#5c5c5c"} />
          <SmallButton title={"삭제"} onClick={deleteMember} color={"#b60000"} />
        </DescBlock>
      </Block>
      <EditBlock className={isEdit ? "" : "edit"}>
        <DescBlock>
          <div className="membertitle">이름</div>
          <input
            className="inputbox"
            onChange={changeHandler}
            name="memberName"
            id="membervalue"
            placeholder="이름을 입력해주세요"
          />
        </DescBlock>
        <DescBlock>
          <div className="membertitle">직급</div>
          <input
            name="memberPosition"
            onChange={changeHandler}
            id="membervalue"
            placeholder="직급을 입력해주세요"
          />
        </DescBlock>
        <DescBlock2>
          <div className="membertitle">휴가예정일</div>
        </DescBlock2>       
          <DescBlock>
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
            color={"#5c5c5c"}
          />
          <SmallButton
            title={"수정 취소"}
            onClick={handleCancleButton}
            color={"#b60000"}
          />
        </DescBlock>
      </EditBlock>
    </>
  );
};

export default MemberListEditItem;
