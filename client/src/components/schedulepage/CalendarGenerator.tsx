import moment, { Moment as MomentTypes } from "moment";

function Calendar(option: any): any {
  let date = moment(option);

  // chalandar generate logic
  function generate() {
    const today = date;
    const startWeek = today.clone().startOf("month").week();
    const endWeek =
      today.clone().endOf("month").week() === 1
        ? 53
        : today.clone().endOf("month").week();

    let calendar: any[] = [];

    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        Array(7)
          .fill(0)
          .map((n, i) => {
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
