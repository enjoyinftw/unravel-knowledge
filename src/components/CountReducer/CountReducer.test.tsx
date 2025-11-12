import { describe, it, expect, vi } from "vitest";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CountReducer from "./CountReducer";

const getCountReducerElements = () => {
  return {
    counterText: screen.getByText(/you have clicked/i),
    incrementButton: screen.getByRole("button", { name: /increment/i }),
    decrementButton: screen.getByRole("button", { name: /decrement/i }),
    resetButton: screen.getByRole("button", { name: /reset/i }),
  };
};

describe("CountReducer", () => {
  it("should contain a counter and three buttons", () => {
    render(<CountReducer />);

    const { counterText, incrementButton, decrementButton, resetButton } =
      getCountReducerElements();

    expect(counterText).toBeInTheDocument();
    expect(counterText).toHaveTextContent(/You have clicked 0 times./i);

    expect(incrementButton).toBeInTheDocument();
    expect(incrementButton).toBeEnabled();

    expect(decrementButton).toBeInTheDocument();
    expect(decrementButton).toBeEnabled();

    expect(resetButton).toBeInTheDocument();
    expect(resetButton).toBeEnabled();
  });

  it("should increase counter by one when increment button is clicked once", async () => {
    const user = userEvent.setup();
    render(<CountReducer />);

    const { counterText, incrementButton, decrementButton, resetButton } =
      getCountReducerElements();

    expect(counterText).toBeInTheDocument();
    expect(counterText).toHaveTextContent(/You have clicked 0 times./i);

    await user.click(incrementButton);

    expect(counterText).toHaveTextContent(/you have clicked 1 times./i);
  });

  it("should decrease counter by on when decrement button is clicked once", async () => {
    const user = userEvent.setup();
    render(<CountReducer />);

    const { counterText, incrementButton, decrementButton, resetButton } =
      getCountReducerElements();

    expect(counterText).toBeInTheDocument();
    expect(counterText).toHaveTextContent(/You have clicked 0 times./i);

    await user.click(incrementButton);

    expect(counterText).toHaveTextContent(/you have clicked 1 times./i);

    await user.click(decrementButton);

    expect(counterText).toHaveTextContent(/You have clicked 0 times./i);
  });

  it("should reset counter when reset button is clicked", async () => {
    const user = userEvent.setup();
    render(<CountReducer />);

    const { counterText, incrementButton, decrementButton, resetButton } =
      getCountReducerElements();

    expect(counterText).toBeInTheDocument();
    expect(counterText).toHaveTextContent(/You have clicked 0 times./i);

    await user.click(incrementButton);

    expect(counterText).toHaveTextContent(/you have clicked 1 times./i);

    await user.click(resetButton);

    expect(counterText).toHaveTextContent(/You have clicked 0 times./i);
  });

  it("should show correct counter when increment is clicked multiple times", async () => {
    const user = userEvent.setup();
    render(<CountReducer />);

    const { counterText, incrementButton, decrementButton, resetButton } =
      getCountReducerElements();

    expect(counterText).toBeInTheDocument();

    await user.click(incrementButton);
    await user.click(incrementButton);
    await user.click(incrementButton);

    expect(counterText).toHaveTextContent(/you have clicked 3 times./i);
  });
});
