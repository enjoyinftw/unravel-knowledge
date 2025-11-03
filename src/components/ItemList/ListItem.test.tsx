import { describe, it, expect } from "vitest";
import ListItem from "./ListItem";
import { render, screen } from "@testing-library/react";

describe("ListItem test", () => {
  it("should render a ListItem with a title when given props", () => {
    const content = "hello";
    const id = "LI1";
    render(
      <ListItem
        content={content}
        itemKey={id}
      />,
    );

    const itemElement = screen.getByTestId(id);

    expect(itemElement).toBeInTheDocument();
    expect(itemElement).toHaveTextContent(content);
  });

  it("should render empty ListItem when only given a key", () => {
    const id = "LI1";
    render(<ListItem itemKey={id} />);

    const itemElement = screen.getByTestId(id);
    expect(itemElement).toBeInTheDocument();
    expect(itemElement).toHaveTextContent("");
  });

  it("should render unicode characters when given", () => {
    const content = "\u2713";
    const id = "LI1";
    render(
      <ListItem
        content={content}
        itemKey={id}
      />,
    );
    const itemElement = screen.getByTestId(id);

    expect(itemElement).toHaveTextContent("✓");
  });

  it("should render as an <li> element", () => {
    const id = "LI1";
    render(<ListItem itemKey={id} />);

    const itemElement = screen.getByTestId(id);
    expect(itemElement.tagName).toBe("LI");
  });

  it("should update text when props change", () => {
    const content = "hello";
    const id = "LI1";
    const { rerender } = render(
      <ListItem
        content={content}
        itemKey={id}
      />,
    );

    const listItem = screen.getByTestId(id);
    expect(listItem).toHaveTextContent(content);

    const newContent = "bye";
    rerender(
      <ListItem
        content={newContent}
        itemKey={id}
      />,
    );
    expect(listItem).toHaveTextContent(newContent);
  });
});
