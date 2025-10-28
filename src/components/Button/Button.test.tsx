import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button component", () => {
  test("should display initial count of 0 when rendered", () => {
    render(<Button />);
    const buttonElement = screen.getByRole("button", { name: /clicked 0 times/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("should increment the count by 1 when clicked", async () => {
    render(<Button />);
    const buttonElement = screen.getByRole("button", { name: /clicked 0 times/i });

    // Simulate a user clicking the button
    await userEvent.click(buttonElement);

    // Verify the count is incremented
    expect(screen.getByRole("button", { name: /clicked 1 times/i })).toBeInTheDocument();
  });
});
