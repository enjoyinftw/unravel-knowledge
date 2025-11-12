import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

import CountReducer from "@/components/CountReducer/CountReducer";

const meta = {
  title: "Componnent/CountReducer",
  component: CountReducer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CountReducer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Increment: Story = {
  play: async ({ canvas, userEvent }) => {
    const incrementButton = canvas.getByRole("button", { name: /increment/i });
    const counterText = canvas.getByText(/you have clicked/i);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await userEvent.click(incrementButton);

    await expect(counterText).toHaveTextContent(/1/);
  },
};

export const Decrement: Story = {
  play: async ({ canvas, userEvent }) => {
    const incrementButton = canvas.getByRole("button", { name: /increment/ });
    const decrementButton = canvas.getByRole("button", { name: /decrement/i });
    const counterText = canvas.getByText(/you have clicked/i);

    await new Promise((resolve) => setTimeout(resolve, 500));
    await userEvent.click(incrementButton);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await userEvent.click(decrementButton);

    await expect(counterText).toHaveTextContent(/0/);
  },
};

export const Reset: Story = {
  play: async ({ canvas, userEvent }) => {
    const incrementButton = canvas.getByRole("button", { name: /increment/ });
    const resetButton = canvas.getByRole("button", { name: /reset/i });
    const counterText = canvas.getByText(/you have clicked/i);

    await new Promise((resolve) => setTimeout(resolve, 500));
    await userEvent.click(incrementButton);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await userEvent.click(incrementButton);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await userEvent.click(resetButton);

    await expect(counterText).toHaveTextContent(/0/);
  },
};
