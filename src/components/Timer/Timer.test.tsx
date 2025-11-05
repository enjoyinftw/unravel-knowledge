import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import Timer from "./Timer";
import { fireEvent } from "@testing-library/react";

const getTimerElements = () => {
  return {
    counterElement: screen.getByText(/counter is:/i),
    startButton: screen.getByRole("button", { name: /start/i }),
    pauseButton: screen.getByRole("button", { name: /pause/i }),
    resetButton: screen.getByRole("button", { name: /reset/i }),
  };
};

describe("Timer tests", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("should render the counter and button when mounted", () => {
    render(<Timer />);
    const { counterElement, startButton, pauseButton, resetButton } = getTimerElements();

    expect(counterElement).toBeInTheDocument();
    expect(startButton).toBeInTheDocument();
    expect(pauseButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });

  it("should start with count at 0 when mounted", () => {
    render(<Timer />);

    const counterElement = screen.getByText(/Counter is:/i);

    expect(counterElement).toBeInTheDocument();
    expect(counterElement).toHaveTextContent(/counter is: 0/i);
  });

  it("should show count at 1 when running for 1 second", () => {
    const setSpy = vi.spyOn(global, "setInterval");
    render(<Timer />);

    const counterElement = screen.getByText(/Counter is:/i);
    expect(counterElement).toHaveTextContent(/counter is: 0/i);
    expect(setSpy).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersToNextTimer();
    });

    expect(counterElement).toHaveTextContent(/counter is: 1/i);
  });

  it("should call cleanup function when unmounted", () => {
    const clearSpy = vi.spyOn(global, "clearInterval");
    const { unmount } = render(<Timer />);

    unmount();

    expect(clearSpy).toHaveBeenCalledTimes(1);
  });

  it("should stop incrementing the counter and call clean up function when pause is clicked", async () => {
    const clearSpy = vi.spyOn(global, "clearInterval");
    render(<Timer />);

    const { counterElement, pauseButton } = getTimerElements();
    expect(counterElement).toHaveTextContent(/counter is: 0/i);
    act(() => {
      vi.advanceTimersToNextTimer();
    });
    expect(counterElement).toHaveTextContent(/counter is: 1/i);

    fireEvent.click(pauseButton);

    expect(clearSpy).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(counterElement).toHaveTextContent(/counter is: 1/i);
  });

  it("should restart the timer when start is clicked", () => {
    const setSpy = vi.spyOn(global, "setInterval");
    const clearSpy = vi.spyOn(global, "clearInterval");
    render(<Timer />);

    const { counterElement, startButton, pauseButton } = getTimerElements();
    expect(counterElement).toHaveTextContent(/counter is: 0/i);
    expect(setSpy).toHaveBeenCalledOnce();

    act(() => {
      vi.advanceTimersToNextTimer();
    });
    expect(counterElement).toHaveTextContent(/counter is: 1/i);
    fireEvent.click(pauseButton);
    expect(clearSpy).toHaveBeenCalledOnce();
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(counterElement).toHaveTextContent(/counter is: 1/i);

    fireEvent.click(startButton);
    expect(setSpy).toHaveBeenCalledTimes(2);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(counterElement).toHaveTextContent(/counter is: 4/i);
  });

  it("should reset when reset button clicked", () => {
    const clearSpy = vi.spyOn(global, "setInterval");
    render(<Timer />);
    const { counterElement, resetButton } = getTimerElements();

    act(() => vi.advanceTimersToNextTimer());
    expect(counterElement).toHaveTextContent(/counter is: 1/i);
    fireEvent.click(resetButton);

    expect(counterElement).toHaveTextContent(/counter is: 0/i);
    expect(clearSpy).toHaveBeenCalledOnce();
  });

  it("should disable start button when running", () => {
    render(<Timer />);
    const { startButton } = getTimerElements();

    expect(startButton).toBeDisabled();
  });

  it("should disable reset button when count is zero", () => {
    render(<Timer />);
    const { counterElement, resetButton } = getTimerElements();

    expect(counterElement).toHaveTextContent(/counter is: 0/i);
    expect(resetButton).toBeDisabled();
  });

  it("should disable pause button when pause button has been clicked", () => {
    render(<Timer />);
    const { pauseButton } = getTimerElements();

    expect(pauseButton).toBeEnabled();
    fireEvent.click(pauseButton);
    expect(pauseButton).toBeDisabled();
  });
  it("should disable pause button when reset button has been clicked", () => {
    render(<Timer />);
    const { resetButton, pauseButton } = getTimerElements();

    expect(pauseButton).toBeEnabled();
    act(() => {
      vi.advanceTimersToNextTimer();
    });
    expect(resetButton).toBeEnabled();

    fireEvent.click(resetButton);

    expect(pauseButton).toBeDisabled();
    expect(resetButton).toBeDisabled();
  });
});
