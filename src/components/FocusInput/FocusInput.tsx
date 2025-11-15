import { useRef } from "react";

import Button from "../Button/Button";

const FocusInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };
  return (
    <>
      <label htmlFor="focus">Text input:</label>
      <input
        ref={inputRef}
        name="focus"
        id="focus"
        type="text"
      />
      <Button
        label="focus input"
        onClick={handleFocus}
      />
    </>
  );
};

export default FocusInput;
