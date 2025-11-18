import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import TodoList from "./UseCallbackEx";
import { FakeTodoList } from "@/faker/fakeToDo";

describe("TodoList", () => {
  it("should render a List with 3 todo when given data", () => {
    render(<TodoList />);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(FakeTodoList.length);

    listItems.forEach((item, index) => {
      const { text, status } = FakeTodoList[index];
      expect(item).toBeInTheDocument();

      const itemContainer = within(item);
      const titleElement = itemContainer.getByText(/title/i);
      const statusElement = itemContainer.getByText(/status/i);

      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toHaveTextContent(`Title: ${text}`);

      expect(statusElement).toBeInTheDocument();
      expect(statusElement).toHaveTextContent(`Status: ${status}`);

      const allButtons = itemContainer.getAllByRole("button");

      expect(allButtons).toHaveLength(3);

      const changeTextButton = itemContainer.getByRole("button", { name: /change Text/i });
      const changeStatusButton = itemContainer.getByRole("button", {
        name: status === "OPEN" ? "FINISHED" : "OPEN",
      });
      const deleteButton = itemContainer.getByRole("button", { name: /delete/i });

      expect(changeTextButton).toBeInTheDocument();
      expect(changeStatusButton).toBeInTheDocument();
      expect(deleteButton).toBeInTheDocument();
    });
  });

  it("should change text when changetext button is clicked", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const listItems = screen.getAllByRole("listitem");

    for (const [index, listItem] of listItems.entries()) {
      const { text } = FakeTodoList[index];
      const itemContainer = within(listItem);
      const changeTextButton = itemContainer.getByRole("button", { name: /change text/i });
      const titleElement = itemContainer.getByText(/title/i);

      expect(titleElement).toHaveTextContent(`Title: ${text}`);

      await user.click(changeTextButton);

      expect(titleElement).toHaveTextContent(/placeholder/i);
    }
  });

  it("should change status when changestatus button is clicked once", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const listItems = screen.getAllByRole("listitem");

    for (const [index, listItem] of listItems.entries()) {
      const { status } = FakeTodoList[index];
      const itemContainer = within(listItem);
      const changeStatusButton = itemContainer.getByRole("button", {
        name: status === "OPEN" ? "FINISHED" : "OPEN",
      });
      const statusElement = itemContainer.getByText(/status/i);

      expect(statusElement).toHaveTextContent(`Status: ${status}`);

      await user.click(changeStatusButton);

      expect(statusElement).toHaveTextContent(/status: finished/i);
    }
  });

  it("should change status to original status when changestatus button is clicked twice", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const listItems = screen.getAllByRole("listitem");

    for (const [index, listItem] of listItems.entries()) {
      const { status } = FakeTodoList[index];
      const itemContainer = within(listItem);
      const changeStatusButton = itemContainer.getByRole("button", {
        name: status === "OPEN" ? "FINISHED" : "OPEN",
      });
      const statusElement = itemContainer.getByText(/status/i);

      expect(statusElement).toHaveTextContent(`Status: ${status}`);

      await user.click(changeStatusButton);

      expect(statusElement).toHaveTextContent(/status: finished/i);

      await user.click(changeStatusButton);
      expect(statusElement).toHaveTextContent(/status: open/i);
    }
  });

  it("should delete todo when delete button is clicked", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const listItems = screen.getAllByRole("listitem");

    for (const [index, listItem] of listItems.entries()) {
      const itemContainer = within(listItem);
      const deleteButton = itemContainer.getByRole("button", { name: /delete/i });

      expect(listItem).toBeInTheDocument();
      await user.click(deleteButton);
      expect(listItem).not.toBeInTheDocument();
    }
  });
});
