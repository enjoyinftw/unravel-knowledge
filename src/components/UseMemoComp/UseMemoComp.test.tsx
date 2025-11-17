import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import * as factorialService from "@/services/factorialService";

import UseMemoComp from "./UseMemoComp";
import { FactorialComp } from "./UseMemoComp";

const getCompElements = () => {
  return {
    labelElement: screen.getByText(/calculate the factorial for/i),
    inputElement: screen.getByPlaceholderText("Enter a number"),
    promptElement: screen.getByText(/please enter a valid integer!/i),
  };
};

describe("UseMemoComp", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render a label, an input field and a prompt", () => {
    render(<UseMemoComp />);

    const { labelElement, inputElement, promptElement } = getCompElements();

    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(promptElement).toBeInTheDocument();
  });
  it("should render the correct factorial when given a valid integer", async () => {
    const user = userEvent.setup();

    render(<UseMemoComp />);

    const { inputElement, promptElement } = getCompElements();

    await user.type(inputElement, "5");
    const factorialElement = screen.getByText(/the factorial of/i);

    expect(promptElement).not.toBeInTheDocument();
    expect(factorialElement).toBeInTheDocument();
    expect(factorialElement).toHaveTextContent(/120/i);
  });

  it("should not render a result when not given an integer", async () => {
    const user = userEvent.setup();
    render(<UseMemoComp />);

    const { inputElement, promptElement } = getCompElements();

    await user.type(inputElement, "abc");

    const factorialElement = screen.queryByText(/the factorial of/i);
    expect(promptElement).toBeInTheDocument();
    expect(factorialElement).not.toBeInTheDocument();
  });

  it("should show NaN when given a negative Value", async () => {
    const user = userEvent.setup();
    render(<UseMemoComp />);

    const { inputElement, promptElement } = getCompElements();

    await user.type(inputElement, "-1");

    const factorialElement = screen.getByText(/the factorial of/i);
    expect(promptElement).not.toBeInTheDocument();
    expect(factorialElement).toBeInTheDocument();
    expect(factorialElement).toHaveTextContent(/NaN/);
  });

  it("should show infinity when given a large integer", async () => {
    const user = userEvent.setup();
    render(<UseMemoComp />);

    const { inputElement, promptElement } = getCompElements();

    await user.type(inputElement, "1111");

    const factorialElement = screen.getByText(/the factorial of/i);
    expect(promptElement).not.toBeInTheDocument();
    expect(factorialElement).toBeInTheDocument();
    expect(factorialElement).toHaveTextContent(/infinity/i);
  });

  it("should call factorialService only once when given the same value again", async () => {
    //ToDo Would need to refactor the comp from remounting the FactorialComp and I just wanted
    //ToDo to see that it does proper memoization
    // const factorialSpy = vi.spyOn(factorialService, "calculateFactorial");
    // const user = userEvent.setup();
    // render(<UseMemoComp />);
    // const { inputElement, promptElement } = getCompElements();
    // await user.type(inputElement, "1");
    // expect(factorialSpy).toHaveBeenCalledOnce();
    // expect(factorialSpy).toHaveBeenCalledWith(1);
    // const resultElement = screen.getByText(/the factorial of/i);
    // expect(resultElement).toHaveTextContent(/the factorial of 1 is 1/i);
    // await user.type(inputElement, "1");
    // expect(factorialSpy).toHaveBeenCalledTimes(2);
    // expect(factorialSpy).toHaveBeenCalledWith(11);
    // expect(resultElement).toHaveTextContent(/the factorial of 11 is 39916800/i);
    // await user.type(inputElement, "{backspace}");
    // expect(factorialSpy).toHaveBeenCalledTimes(2);
    // expect(factorialSpy).toHaveBeenCalledWith(1);
    // expect(resultElement).toHaveTextContent(/the factorial of 1 is 1/i);
  });
});

describe("FactorialComp", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should memoize calculations correctly when called with same value twice", () => {
    const factorialSpy = vi.spyOn(factorialService, "calculateFactorial");
    const { rerender } = render(<FactorialComp n={5} />);
    expect(factorialSpy).toBeCalledWith(5);
    expect(factorialSpy).toHaveBeenCalledOnce();

    rerender(<FactorialComp n={5} />);
    expect(factorialSpy).toHaveBeenCalledOnce();
  });
});
