import { useReducer } from "react";
import Button from "@/components/Button/Button";

type countAction = {
  type: "increment" | "decrement" | "reset";
};

type countState = {
  count: number;
};

const countReducer = (state:countState, action:countAction) => {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        count: state.count + 1,
      };
    case "decrement":
      return {
        ...state,
        count: state.count - 1,
      };
    case "reset":
      return {
        ...state,
        count: 0,
      };
  }
};

const CountReducer = () => {
  const [countState, countDispatch] = useReducer(countReducer, { count: 0 });

  const handleIncrement = () => {
    countDispatch({ type: "increment" });
  };
  const handleDecrement = () => {
    countDispatch({ type: "decrement" });
  };

  const handleReset = () => {
    countDispatch({ type: "reset" });
  };
  return (
    <div>
      <span>You have clicked {countState.count} times.</span>
      <div>
        <Button
          label="increment"
          onClick={handleIncrement}
        />
        <Button
          label="decrement"
          onClick={handleDecrement}
        />
        <Button
          label="reset"
          onClick={handleReset}
        />
      </div>
    </div>
  );
};

export default CountReducer;
