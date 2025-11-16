import { describe, it, expect } from "vitest";

import { screen, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import ThemeContextComp from "./ThemeContext";

describe("ThemeContextComp", () => {
  it("should render a button and a message", () => {
    render(<ThemeContextComp />);

    const textElement = screen.getByText(/current theme:/i);
    const buttonElement = screen.getByRole("button", { name: /toggle theme/i });

    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveTextContent(/current theme: light/i);

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeEnabled();
  });

  it("should swap from light to dark when button clicked", async () => {
    const user = userEvent.setup();
    render(<ThemeContextComp />);
    const textElement = screen.getByText(/current theme:/i);
    const buttonElement = screen.getByRole("button", { name: /toggle theme/i });

    await user.click(buttonElement);

    expect(textElement).toHaveTextContent(/current theme: dark/i);
  });

  it("should swap from light to dark to light when button clicked 2 times", async () => {
    const user = userEvent.setup();
    render(<ThemeContextComp />);
    const textElement = screen.getByText(/current theme:/i);
    const buttonElement = screen.getByRole("button", { name: /toggle theme/i });

    await user.click(buttonElement);

    expect(textElement).toHaveTextContent(/current theme: dark/i);

    await user.click(buttonElement);

    expect(textElement).toHaveTextContent(/current theme: light/i);
  });
});
