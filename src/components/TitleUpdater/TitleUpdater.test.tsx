import { describe, it, expect } from "vitest";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TitleUpdater from "./TitleUpdater";
import { T } from "vitest/dist/chunks/reporters.d.BFLkQcL6.js";

describe("TitleUpdater", () => {
  it("should render with a label and input field when mounted", () => {
    render(<TitleUpdater />);
    const labelElement = screen.getByText(/Enter document title/i);
    const inputElement = screen.getByRole("textbox", { name: /title/i });

    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute(
      "placeholder",
      expect.stringMatching(/Enter document title/i),
    );
  });

  it("should render with a default title when mounted", () => {
    render(<TitleUpdater />);

    expect(document.title).toBe("title");
  });

  it("should change title when a user types input", async () => {
    const user = userEvent.setup();
    render(<TitleUpdater />);
    const newTitle = "Hello!";
    expect(document.title).toBe("title");

    const inputElement = screen.getByRole("textbox", { name: /title/i });
    await user.clear(inputElement);
    await user.type(inputElement, newTitle);

    expect(document.title).toBe(newTitle);
  });

  it("should change title when giving a keystroke", async () => {
    const user = userEvent.setup();
    render(<TitleUpdater />)
    const inputElement = screen.getByRole("textbox", { name: /title/i })
    
    await user.clear(inputElement)
    await user.type(inputElement, "1")

    expect(document.title).toBe("1")

    await user.type(inputElement, "2")
    expect(document.title).toBe("12")

  })

  it("should change title to the empty string when cleared", async () => {
    const user = userEvent.setup();
    render(<TitleUpdater />)
    const inputElement = screen.getByRole("textbox", { name: /title/i });

    await user.clear(inputElement)

    expect(document.title).toBe("")
  })
});
