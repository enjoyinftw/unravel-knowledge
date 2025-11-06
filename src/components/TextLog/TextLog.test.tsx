import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TextLog from "./TextLog";

describe("TextLog", () => {
  it("should contain text when rendered", () => {
    const msg: string = "hello";
    const logMsg: string = "log THIS!";
    render(
      <TextLog
        msg={msg}
        logMsg={logMsg}
      />,
    );

    const msgElement = screen.getByText(msg);
    expect(msgElement).toBeInTheDocument();
  });

  it("should log to console when unmounted", () => {
    const mockConsoleLog = vi.fn();
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(mockConsoleLog);
    const msg: string = "hello";
    const logMsg: string = "log THIS!";
    const { unmount } = render(
      <TextLog
        msg={msg}
        logMsg={logMsg}
      />,
    );

    unmount();

    expect(consoleSpy).toHaveBeenCalledWith(logMsg);
  });
});
