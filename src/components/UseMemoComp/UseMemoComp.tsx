import { useMemo, useState } from "react";

import { calculateFactorial } from "@/services/factorialService";

const UseMemoComp = () => {
  const [value, setValue] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");

  const isStringInteger = (value: string): boolean => {
    const num = parseInt(value, 10);
    return !isNaN(num) && num.toString() === value && value.trim() !== "";
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value;
    setInputValue(userInput);
    if (isStringInteger(userInput)) {
      setValue(parseInt(userInput));
    } else {
      setValue(null);
    }
  };

  return (
    <div>
      <label htmlFor="factorial">Calculate the factorial for: </label>
      <input
        type="text"
        value={inputValue}
        name="factorial"
        id="factorial"
        onChange={(e) => handleInput(e)}
        placeholder="Enter a number"
      />
      <br />
      {value !== null ? <FactorialComp n={value} /> : <p>Please enter a valid integer!</p>}
    </div>
  );
};

export const FactorialComp = ({ n }: { n: number }) => {
  const factorial = useMemo(() => calculateFactorial(n), [n]);
  return (
    <p>
      The Factorial of {n} is {factorial}
    </p>
  );
};
export default UseMemoComp;
