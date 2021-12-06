import React, { useState } from "react";
import moment from "moment";

const Timer: React.FC = () => {
  const [time, setTime] = useState(moment.duration(0));
  const [timeTick, setTimeTick] = useState<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    const tick = () =>
      setTime((prevTime) => prevTime.clone().subtract(1, "seconds"));
    const timeTick = setInterval(() => {
      tick();
    }, 1000);
    setTimeTick(timeTick);
  };

  return (
    <div>
      <button type="button" onClick={() => startTimer()}>
        시작
      </button>
      <p>{moment(time.asSeconds(), "s").format("HH:mm:ss")}</p>
    </div>
  );
};

export default Timer;
