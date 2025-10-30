import { describe, it, expect } from "vitest";
import Counter from "./Counter";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

describe("Counter test", () => {
  it("should show counter at 0 and contain all elements when rendered", () => {
    render(<Counter />);

    const incrementButton = screen.getByRole("button", { name: /increment/i });
    const decrementButton = screen.getByRole("button", { name: /decrement/i });
    const resetButton = screen.getByRole("button", { name: /reset/i });
    const counterElement = screen.getByTestId("counterState");

    expect(incrementButton).toBeInTheDocument();
    expect(decrementButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
    expect(counterElement).toBeInTheDocument();
    expect(counterElement).toHaveTextContent("0");
  });

  it("should increment the counter to 1 when clicking increment Button once", async () => {
    render(<Counter />);
    const incrementButton = screen.getByRole("button", { name: /increment/i });
    const counterElement = screen.getByTestId("counterState");

    expect(counterElement).toHaveTextContent("0");
    await userEvent.click(incrementButton);
    expect(counterElement).toHaveTextContent("1");
  });

  it("should show correct counter when clicking increment Button multiple times", async () => {
    render(<Counter />);
    const incrementButton = screen.getByRole("button", { name: /increment/i });
    const counterElement = screen.getByTestId("counterState");

    expect(counterElement).toHaveTextContent("0");

    await userEvent.click(incrementButton);
    await userEvent.click(incrementButton);
    await userEvent.click(incrementButton);
    expect(counterElement).toHaveTextContent("3");
  });

  it("should decrement the counter by 1 when clicking the decrement button once", async () => {
    render(<Counter />);
    const incrementButton = screen.getByRole("button", { name: /increment/i });
    const decrementButton = screen.getByRole("button", { name: /decrement/i });
    const counterElement = screen.getByTestId("counterState");

    expect(counterElement).toHaveTextContent("0");
    await userEvent.click(incrementButton);
    expect(counterElement).toHaveTextContent("1");
    await userEvent.click(decrementButton);
    expect(counterElement).toHaveTextContent("0");
  });

  it("should have decrement Button disabled and should not go below 0 when counter is 0", async () => {
    render(<Counter />);
    const decrementButton = screen.getByRole("button", { name: /decrement/i });
    const counterElement = screen.getByTestId("counterState");

    expect(decrementButton).toBeDisabled();
    await userEvent.click(decrementButton);
    expect(counterElement).toHaveTextContent("0");
  });

  it("should reset the counter to 0 when reset button is clicked", async () => {
    render(<Counter />);
    const incrementButton = screen.getByRole("button", { name: /increment/i });
    const resetButton = screen.getByRole("button", { name: /reset/i });
    const counterElement = screen.getByTestId("counterState");

    expect(counterElement).toHaveTextContent("0");

    await userEvent.click(incrementButton);
    await userEvent.click(incrementButton);
    await userEvent.click(incrementButton);
    expect(counterElement).toHaveTextContent("3");
    await userEvent.click(resetButton);
    expect(counterElement).toHaveTextContent("0");
  });
});
