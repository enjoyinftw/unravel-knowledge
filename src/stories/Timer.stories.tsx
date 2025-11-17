import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Timer from "@/components/Timer/Timer";

const meta = {
  title: "Component/Timer",
  component: Timer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Timer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Paused: Story = {
  play: async ({ canvas, userEvent }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const pauseButton = canvas.getByRole("button", { name: /pause/i });
    await userEvent.click(pauseButton);
  },
};

export const Play: Story = {
  play: async ({ canvas, userEvent }) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const pauseButton = canvas.getByRole("button", { name: /pause/i });
    await userEvent.click(pauseButton);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const playButton = canvas.getByRole("button", { name: /start/i });
    await userEvent.click(playButton);
  },
};

export const Reset: Story = {
  play: async ({ canvas, userEvent }) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const resetButton = canvas.getByRole("button", { name: /reset/i });
    await userEvent.click(resetButton);
  },
};
