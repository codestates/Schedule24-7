import { FC, useState, useCallback, ChangeEvent, useEffect } from "react";
import styled from "styled-components";
import { DefaultLayout, hideMobileCss, mediaQuery } from "../../GlobalStyle";
import SmallButton from "./SmallButton";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import { useLocation } from "react-router";
import { useParams } from "react-router";
import { createGroupMemberApi } from "../../lib/api/group";
import { addListener } from "process";
import { getGroups } from "../../redux/actions/Group";
import { getGroupsApi } from "../../lib/api/group";
import { useDispatch } from "react-redux";

const DescBlock = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  border-bottom: 1px solid rgba(170, 170, 170, 0.21);
  padding: 20px 1px;

  > #conditiontitle {
    display: flex;
    font-size: 16px;
    line-height: 20px;
    justify-content: flex-end;
    align-items: flex-end;
    font-style: bold;
    width: 60px;
  }

  > #conditionvalue {
    margin-left: 40px;
    display: flex;
    font-size: 16px;
    justify-content: flex-start;
    align-items: flex-end;
    font-style: bold;
    width: 200px;
  }

  &.button {
    margin-top: 15px;
    margin-right: 20px;
    justify-content: space-between;
    border-style: none;
  }

  .picker {
    width: 235px;

    .DayPicker-Month {
      margin-top: 0;
    }

    .DayPicker-NavButton {
      top: 0;
      right: 0;
    }
  }
`;

const EditBlock = styled.div`
  position: absolute;
  width: 370px;
  min-height: 250px;
  margin-top: 70px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  justify-content: center;
`;

interface FormState {
  memberName: string;
  memberPosition: string;
  memberVacation: Date[];
}

const AddMemberList: FC = () => {
  const { groupId } = useParams();
  const [form, setForm] = useState<FormState>({
    memberName: "",
    memberPosition: "",
    memberVacation: [],
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

  const createGroupMember = async () => {
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
      await createGroupMemberApi({
        ...formState,
        memberVacation: stringMemberVations,
        groupId: groupId as string,
      });
      const response = await getGroupsApi();
      dispatch(getGroups(response.data));
      alert("멤버 생성 완료!")
      
    } catch (err) {
      alert("멤버 생성 실패!")
    }
  };
  const dispatch = useDispatch();
   useEffect(() => {
    getGroupsApi().then((res) => {
      dispatch(getGroups(res.data));
    });
  }, [dispatch]);

  return (
    <>
      <EditBlock>
        <DescBlock>
          <div id="membertitle">이름</div>
          <input
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
            title={"저장"}
            onClick={createGroupMember}
            color={"black"}
          />
          <SmallButton title={"취소"} onClick={() => {}} color={"grey"} />
        </DescBlock>
      </EditBlock>
    </>
  );
};

export default AddMemberList;
