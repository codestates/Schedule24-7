import { FC } from "react";
import styled from "styled-components";
import MultiColumnSelectBox from "../MultiColumnSelectBox";

const Block = styled.div`
  padding: 13px;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  position: relative;
`;

const selectBoxOptions: SelectOption[] = [
  {
    text: "😃",
    value: "😃",
  },
  {
    text: "😆",
    value: "😆",
  },
  {
    text: "🥰",
    value: "🥰",
  },
  {
    text: "😜",
    value: "😜",
  },
  {
    text: "😷",
    value: "😷",
  },
   {
    text: "💝",
    value: "💝",
  },
  {
    text: "🧡",
    value: "🧡",
  },
  {
    text: "💚",
    value: "💚",
  },
  {
    text: "💜",
    value: "💜",
  },
  {
    text: "🤍",
    value: "🤍",
  },
    {
    text: "💦",
    value: "💦",
  },
  {
    text: "💯",
    value: "💯",
  },
  {
    text: "💪",
    value: "💪",
  },
  {
    text: "💬",
    value: "💬",
  },
  {
    text: "👀",
    value: "👀",
  },
   {
    text: "🐭",
    value: "🐭",
  },
  {
    text: "🐁",
    value: "🐁",
  },
  {
    text: "🐹",
    value: "🐹",
  },
  {
    text: "🧚",
    value: "🧚",
  },
  {
    text: "🥐",
    value: "🥐",
  },
    {
    text: "🍭",
    value: "🍭",
  },
  {
    text: "🍡",
    value: "🍡",
  },
  {
    text: "🥑",
    value: "🥑",
  },
  {
    text: "🥨",
    value: "🥨",
  },
  {
    text: "🌭",
    value: "🌭",
  },
   {
    text: "💝",
    value: "💝",
  },
  {
    text: "🍟",
    value: "🍟",
  },
  {
    text: "🍔",
    value: "🍔",
  },
  {
    text: "🍕",
    value: "🍕",
  },
  {
    text: "🧃",
    value: "🧃",
  },
    {
    text: "🍰",
    value: "🍰",
  },
  {
    text: "🍤",
    value: "🍤",
  },
  {
    text: "🍫",
    value: "🍫",
  },
  {
    text: "🍁",
    value: "🍁",
  },
  {
    text: "🍀",
    value: "🍀",
  },
   {
    text: "🌸",
    value: "🌸",
  },
  {
    text: "🌈",
    value: "🌈",
  },
  {
    text: "🥇",
    value: "🥇",
  },
  {
    text: "🥈",
    value: "🥈",
  },
  {
    text: "🥉",
    value: "🥉",
  },
];

const GroupBasicInfo: FC = () => {
  return (
    <>
      <h4>그룹 기본정보</h4>
      <Block>
        <div>
          <MultiColumnSelectBox options={selectBoxOptions} />
          <input placeholder="그룹명" />
          <input placeholder="그룹설명" />
        </div>
      </Block>
    </>
  );
};

export default GroupBasicInfo;
