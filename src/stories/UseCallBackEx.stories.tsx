import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { within } from "storybook/test";
import TodoList from "@/components/UseCallbackEx/UseCallbackEx";

const meta = {
  title: "Component/UseCallbackEx",
  component: TodoList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TodoList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithChangedText: Story = {
  play: async ({ canvas, userEvent }) => {
    const listItems = canvas.getAllByRole("listitem");

    await new Promise((resolve) => setTimeout(resolve, 500));

    for (const listItem of listItems) {
      const itemContainer = within(listItem);
      const changeTextButton = itemContainer.getByRole("button", { name: /change text/i });

      await userEvent.click(changeTextButton);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  },
};

export const WithChangedStatus: Story = {
  play: async ({ canvas, userEvent }) => {
    const listItems = canvas.getAllByRole("listitem");

    await new Promise((resolve) => setTimeout(resolve, 500));

    for (const listItem of listItems) {
      const itemContainer = within(listItem);
      const changeStatusButton = itemContainer.getByRole("button", { name: /finished/i });

      await userEvent.click(changeStatusButton);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  },
};

export const DeletedOne: Story = {
  play: async ({ canvas, userEvent }) => {
    const listItems = canvas.getAllByRole("listitem");

    await new Promise((resolve) => setTimeout(resolve, 500));

    const itemContainer = within(listItems[0]);

    const deleteButton = itemContainer.getByRole("button", { name: /delete/i });

    userEvent.click(deleteButton);
  },
};
