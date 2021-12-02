import moment, { Moment as MomentTypes } from "moment";

function Calendar(option: any): any {
  let date = moment(option);

  // chalandar generate logic
  function generate() {
    // 님 날짜 뭐 눌렀어요? (초기값은 오늘)
    const today = date;
    // console.log(today);

    // startOf('month') : 이번 달의 첫번 째 날로 설정 set to the first of this month, 12:00 am
    // week() : Week of Year. 이번 년도의 몇번째 주인가? => 3월 8일이면 10이겠죠?
    const startWeek = today.clone().startOf("month").week();

    // endOf('month').week() : 이번 달의 마지막 날로 설정 한 후 그것이 이번 년도의 몇번째 주인지 체크
    // 만약 이번 해의 첫번째 주(1월 1일이 속한 주)라면 53으로 세팅, 아니라면 그대로 유지
    // 이런 작업의 이유는 마지막 주가 첫 주가 될 수 없기 때문에 당연한 것임
    const endWeek =
      today.clone().endOf("month").week() === 1
        ? 53
        : today.clone().endOf("month").week();

    let calendar: any[] = [];

    // 시작 주부터 마지막 주까지 +1 씩 증가시킴
    // 이제 주마다 일을 표기해야 하므로 len이 7인 arr를 생성 후 index를 기반으로 day를 표기하자
    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        Array(7)
          .fill(0)
          .map((n, i) => {
            // 오늘 => 주어진 주의 시작 => n + i일 만큼 더해서 각 주의 '일'을 표기한다.
            let current = today
              .clone()
              .week(week)
              .startOf("week")
              .add(n + i, "day");

            return current.format("YYYY-MM-DD");
          })
      );
    }

    return calendar;
  }

  let tmp = generate();
  let result = tmp.reduce((acc, cur) => {
    return acc.concat(cur);
  });

  return result;
}
export default Calendar;

// <>
//   {" "}
//   <button onClick={handleDayClick}>today</button> */}
//   <div>{date.format("YYYY-MM-DD")}</div>
//   <button onClick={() => jumpToMonth(0)}>-</button>
//   <button onClick={() => jumpToMonth(1)}>+</button>
//   {generate()}
// </>

// func : 날짜 이동과 관련된 함수
//   const handleDayClick = () => {
//     let current: any = moment.Moment
//     setdate(current)};
//   const returnToday = () => setdate(moment());
//   const jumpToMonth = (num: number) =>
//     num
//       ? setdate(date.clone().add(30, "day"))
//       : setdate(date.clone().subtract(30, "day"));
