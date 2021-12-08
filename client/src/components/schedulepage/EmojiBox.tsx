import {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

const Block = styled.div`
  padding: 0px 6px;
  border: 1px solid #d1d1d1;
  border-radius: 10px;
  position: relative;
  display: inline-flex;
`;
const VsibleWrapper = styled.div`
  display: flex;
  align-items: center;
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

const EmojiBox: FC<Props> = ({
  options,
  value,
  columnCount = 5,
  handleEmoji,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [widthSize, setWidthSize] = useState<number | null>(null);
  const [selectValue, setSelectValue] = useState<SelectOption | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const defaultValue = options[0];
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
    return options.map((option) => (
      <div
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
        <span>{viewSelectValue?.text ?? defaultValue.text}</span>
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
