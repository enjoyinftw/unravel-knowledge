import { describe, it, expect } from "vitest";

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import FocusInput from "./FocusInput";

describe("FocusInput", () => {
  it("should render with a label, input and button", () => {
    render(<FocusInput />);

    const labelElement = screen.getByText(/text input/i);
    const inputElement = screen.getByLabelText(/text input/i);
    const buttonElement = screen.getByRole("button", { name: /focus input/i });

    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it("should focus the input when button is clicked", async () => {
    const user = userEvent.setup();
    render(<FocusInput />);
    const inputElement = screen.getByLabelText(/text input/i);
    const buttonElement = screen.getByRole("button", { name: /focus input/i });

    await user.click(buttonElement);

    expect(inputElement).toHaveFocus();
  });

  it("should show current text input when focused and typing", async () => {
    const user = userEvent.setup();
    render(<FocusInput />);
    const inputElement = screen.getByLabelText(/text input/i);
    const buttonElement = screen.getByRole("button", { name: /focus input/i });

    await user.click(buttonElement);
    await user.keyboard("Hello");

    expect(inputElement).toHaveValue("Hello");
  });
});
