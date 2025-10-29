import { describe, it, expect, vi } from "vitest";
import Button from "./Button";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

describe("Button test", () => {
  it("should render a button with a label and onClick handler when given", async () => {
    const callback = vi.fn();
    const label = "text label";
    render(
      <Button
        onClick={callback}
        label={label}
      />,
    );

    const buttonElement = screen.getByRole("button", { name: label });

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(label);
    await userEvent.click(buttonElement);
    expect(callback).toHaveBeenCalled();
  });

  it("should render a button without a label when only given a onClick handler", async () => {
    const callback = vi.fn();
    render(<Button onClick={callback} />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("");

    await userEvent.click(buttonElement);
    expect(callback).toHaveBeenCalled();
  });

  it("should not be clickable when disabled", async () => {
    const callback = vi.fn();
    const label = "text";
    render(
      <Button
        label={label}
        onClick={callback}
        disabled={true}
      />,
    );

    const buttonElement = screen.getByRole("button", { name: label });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(label);

    await userEvent.click(buttonElement);

    expect(callback).not.toHaveBeenCalled();
  });

  it("should handle rapid clicking when clicked multiple times", async () => {
    const callback = vi.fn();
    const label = "Rapid Clicking";
    render(
      <Button
        label={label}
        onClick={callback}
      />,
    );

    const buttonElement = screen.getByRole("button", { name: label });
    await userEvent.click(buttonElement);
    await userEvent.click(buttonElement);
    await userEvent.click(buttonElement);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it("should apply aria-label and be accessible when aria-label provided", () => {
    const callback = vi.fn();
    const label = "Button";
    const ariaLabel = "clickable";
    render(
      <Button
        label={label}
        ariaLabel={ariaLabel}
        onClick={callback}
      />,
    );

    const buttonElement = screen.getByRole("button", { name: ariaLabel });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute("aria-label", ariaLabel);
    expect(buttonElement).toHaveTextContent(label);
  });

  it("should not apply aria-label when not provided", () => {
    const callback = vi.fn();
    const label = "Button";
    render(
      <Button
        label={label}
        onClick={callback}
      />,
    );

    const buttonElement = screen.getByRole("button", { name: label });
    expect(buttonElement).not.toHaveAttribute("aria-label");
  });
});
