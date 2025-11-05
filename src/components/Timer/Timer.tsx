import { useState, useEffect } from "react";
import Button from "../Button/Button";

const Timer = () => {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const interval = setInterval(() => setCount((value) => value + 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCount(0);
  };

  return (
    <div>
      <span>Counter is: {count}</span>
      <div>
        <Button
          label="start"
          onClick={handleStart}
          disabled={isRunning}
        />

        <Button
          label="pause"
          onClick={handlePause}
          disabled={!isRunning}
        />
        <Button
          label="reset"
          onClick={handleReset}
          disabled={count === 0}
        />
      </div>
    </div>
  );
};

export default Timer;
