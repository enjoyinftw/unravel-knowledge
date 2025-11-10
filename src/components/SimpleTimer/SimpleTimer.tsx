import { useEffect, useState } from "react";

const SimpleTimer = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const startTimer = setInterval(() => setCounter((state) => state + 1), 1000);

    return () => clearInterval(startTimer);
  });
  return (
    <div>
      <p>This component has been mounted for {counter} seconds.</p>
    </div>
  );
};

export default SimpleTimer;
