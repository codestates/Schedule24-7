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
import swal from "sweetalert";

const DescBlock2 = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 20px;
`

const DescBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 20px;
  border-bottom: 1px solid rgba(170, 170, 170, 0.21);
  padding: 20px 1px;

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
  width: 310px;
  min-height: 250px;
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0px 0px 7px #7070706c;
  border-radius: 15px;
  border: 1px solid #e4e4e4;
  margin: 0.5rem;
  justify-content: center;
`;

interface FormState {
  memberName: string;
  memberPosition: string;
  memberVacation: Date[];
}

interface Props {
  handleAddCancle: () => void;
}
const AddMemberList: FC<Props> = ({handleAddCancle}) => {
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
      swal({
        title: "멤버 생성 완료",
        icon: "success",
      });      
      handleAddCancle()
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

  return (
    <>
      <EditBlock>
        <DescBlock>
          <div className="membertitle">이름</div>        
          <input
            onChange={changeHandler}
            name="memberName"
            className="membervalue"
            placeholder="이름을 입력해주세요"
          />
        </DescBlock>
        <DescBlock>
          <div className="membertitle">직급</div>
          <input
            name="memberPosition"
            onChange={changeHandler}
            className="membervalue"
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
            title={"저장"}
            onClick={createGroupMember}
            color={"#5c5c5c"}
          />
          <SmallButton title={"취소"} onClick={handleAddCancle} color={"#b60000"} />
        </DescBlock>
      </EditBlock>
    </>
  );
};

export default AddMemberList;
