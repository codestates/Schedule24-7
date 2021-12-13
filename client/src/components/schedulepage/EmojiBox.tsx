import {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { RootState } from "../../redux/reducers";
import { ScheduleDummy, selectBoxOptions } from "./ScheduleDummy";

const Block = styled.div`
  border: 1px solid #a5a5a5;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 43px;
  background-color: white;
  position: relative;
`;
const VsibleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  div:nth-child(2) {
    margin-left: 5px;
    width: 10px;
    height: 10px;
    background-color: #323131;
    clip-path: polygon(0% 0%, 50% 100%, 100% 0%);
  }
`;
const HiddenWrapper = styled.div<{ width: number | null; count: number }>`
  position: absolute;
  top: calc(100% + 5px);
  z-index: 10;
  left: 0;
  width: ${(props) => (props.width === null ? "100%" : `${props.width}px`)};
  background-color: #fff;
  border: 1px solid #d1d1d1;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;

  > div {
    padding: 3px 0;
    cursor: pointer;
    text-align: center;
    width: ${(props) => 100 / props.count}%;
    border-radius: 4px;
    transition: 250ms background-color;
  }
  > div:hover {
    background-color: #d6d2d2;
  }
`;

interface Props {
  handleEmoji?: (data: string) => void;
  options: SelectOption[];
  value?: string;
  columnCount?: number;
  onChange?: (data: string) => void;
}

const EmojiBox: FC<Props> = ({ value, columnCount = 5, handleEmoji }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [widthSize, setWidthSize] = useState<number | null>(null);
  const [selectValue, setSelectValue] = useState<SelectOption | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const options = selectBoxOptions;
  const params = useParams();

  //스토리지에서 데이터 호출
  const groups = useSelector((store: RootState) => store.group.groups);

  //현재 그룹 필터링
  const currentGroup: any = groups.filter((el: any) => {
    return el._id === params.groupId;
  });

  //현재 스케쥴만 필터링
  let currentSchedule: any;
  if (currentGroup.length !== 0) {
    currentSchedule = currentGroup[0].schedules.filter((el: any) => {
      return el._id === params.scheduleId;
    });
  } else {
    currentSchedule = ScheduleDummy;
  }

  const defaultValue = currentSchedule[0].scheduleEmoji;
  const viewSelectValue =
    options.find((option) => option.value === value) ?? selectValue;

  const toggleIsVisible = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  useLayoutEffect(() => {
    if (ref.current === null) return;

    const resizeHandler = () => {
      if (ref.current === null) return;
      const parentElement = ref.current.parentElement;

      setWidthSize(parentElement?.clientWidth ?? null);
    };

    resizeHandler();
    const parentElement = ref.current.parentElement;
    if (parentElement === null) return;

    const resizeObserver = new ResizeObserver(resizeHandler);
    resizeObserver.observe(parentElement);

    return () => {
      resizeObserver.unobserve(parentElement);
    };
  }, []);

  const renderOption = useMemo(() => {
    return options.map((option, idx) => (
      <div
        key={idx}
        onClick={() => {
          setSelectValue(option);
          setIsVisible(false);
        }}
      >
        {option.text}
      </div>
    ));
  }, [options]);

  useEffect(() => {
    if (selectValue === null || typeof handleEmoji === "undefined") return;
    handleEmoji(selectValue.value);
  }, [selectValue, handleEmoji]);

  const myRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (myRef.current && !myRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    }
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [myRef]);

  return (
    <Block ref={ref}>
      <VsibleWrapper ref={myRef} onClick={toggleIsVisible}>
        <span>{viewSelectValue?.text ?? defaultValue}</span>
        <div />
      </VsibleWrapper>
      {isVisible ? (
        <HiddenWrapper count={columnCount} width={widthSize}>
          {renderOption}
        </HiddenWrapper>
      ) : null}
    </Block>
  );
};

export default EmojiBox;
