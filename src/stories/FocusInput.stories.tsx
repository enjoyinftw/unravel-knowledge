import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import FocusInput from "@/components/FocusInput/FocusInput";

const meta = {
  title: "Component/FocusInput",
  component: FocusInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FocusInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Focus: Story = {
  play: async ({ canvas, userEvent }) => {
    const buttonElement = canvas.getByRole("button", { name: /focus input/i });
    await userEvent.click(buttonElement);
  },
};
