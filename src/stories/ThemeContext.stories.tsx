import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ThemeContextComp from "@/components/ThemeContext/ThemeContext";

const meta = {
  title: "Component/ThemeContext",
  component: ThemeContextComp,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ThemeContextComp>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ThemeSwap: Story = {
  play: async ({ canvas, userEvent }) => {
    const buttonElement = canvas.getByRole("button", { name: /toggle theme/i });

    await new Promise((resolve) => setTimeout(resolve, 500));
    await userEvent.click(buttonElement);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await userEvent.click(buttonElement);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await userEvent.click(buttonElement);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await userEvent.click(buttonElement);
  },
};
