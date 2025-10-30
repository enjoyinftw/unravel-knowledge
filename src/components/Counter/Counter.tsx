import Button from "../Button/Button";
import { useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => {
    setCounter(counter + 1);
  };
  const handleDecrement = () => {
    setCounter(counter - 1);
  };
  const handleReset = () => {
    setCounter(0);
  };

  return (
    <div>
      <p data-testid="counterState">The counter is at {counter}.</p>
      <div>
        <Button
          label="+1"
          onClick={handleIncrement}
          ariaLabel="increment"
        />
        <Button
          label="-1"
          onClick={handleDecrement}
          ariaLabel="decrement"
          disabled={counter == 0}
        />
        <Button
          label="reset"
          onClick={handleReset}
          ariaLabel="reset"
        />
      </div>
    </div>
  );
};

export default Counter;
