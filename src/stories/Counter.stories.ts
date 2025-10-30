import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

import Counter from "@/components/Counter/Counter";

const meta = {
  title: "Component/Counter",
  component: Counter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Counter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const incrementButton = canvas.getByRole("button", { name: /increment/i });
    const decrementButton = canvas.getByRole("button", { name: /decrement/i });
    const resetButton = canvas.getByRole("button", { name: /reset/i });
    const counter = canvas.getByTestId("counterState");

    await expect(incrementButton).toBeInTheDocument();
    await expect(decrementButton).toBeInTheDocument();
    await expect(resetButton).toBeInTheDocument();
    await expect(counter).toBeInTheDocument();

    await expect(decrementButton).toBeDisabled();
    await expect(counter).toHaveTextContent("0");
  },
};

export const Increment: Story = {
  play: async ({ canvas, userEvent }) => {
    const incrementButton = canvas.getByRole("button", { name: /increment/i });
    const counter = canvas.getByTestId("counterState");

    await expect(counter).toHaveTextContent("0");
    await userEvent.click(incrementButton);
    await expect(counter).toHaveTextContent("1");
  },
};

export const Decrement: Story = {
  play: async ({ canvas, userEvent }) => {
    const incrementButton = canvas.getByRole("button", { name: /increment/i });
    const decrementButton = canvas.getByRole("button", { name: /decrement/i });
    const counter = canvas.getByTestId("counterState");

    await expect(counter).toHaveTextContent("0");
    await userEvent.click(incrementButton);
    await expect(counter).toHaveTextContent("1");
    await expect(decrementButton).not.toBeDisabled();
    await userEvent.click(decrementButton);
    await expect(counter).toHaveTextContent("0");
  },
};

export const Reset: Story = {
  play: async ({ canvas, userEvent }) => {
    const incrementButton = canvas.getByRole("button", { name: /increment/i });
    const resetButton = canvas.getByRole("button", { name: /reset/i });
    const counter = canvas.getByTestId("counterState");

    await expect(counter).toHaveTextContent("0");
    await userEvent.click(incrementButton);
    await userEvent.click(incrementButton);
    await userEvent.click(incrementButton);
    await expect(counter).toHaveTextContent("3");
    await userEvent.click(resetButton);
    await expect(counter).toHaveTextContent("0");
  },
};

export const FullInteraction: Story = {
  play: async ({ canvas, userEvent }) => {
    const incrementButton = canvas.getByRole("button", { name: /increment/i });
    const decrementButton = canvas.getByRole("button", { name: /decrement/i });
    const resetButton = canvas.getByRole("button", { name: /reset/i });
    const counter = canvas.getByTestId("counterState");

    await expect(counter).toHaveTextContent("0");
    await userEvent.click(incrementButton);
    await expect(counter).toHaveTextContent("1");
    await userEvent.click(decrementButton);
    await expect(counter).toHaveTextContent("0");
    await userEvent.click(incrementButton);
    await userEvent.click(incrementButton);
    await userEvent.click(incrementButton);
    await expect(counter).toHaveTextContent("3");
    await userEvent.click(resetButton);
    await expect(counter).toHaveTextContent("0");
  },
};
