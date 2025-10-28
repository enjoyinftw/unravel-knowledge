"use client";

import { useState, type FC } from "react";

const Button: FC = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return <button onClick={handleClick}>Clicked {count} times</button>;
};

export default Button;
