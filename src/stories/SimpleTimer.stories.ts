import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SimpleTimer from "@/components/SimpleTimer/SimpleTimer";

const meta = {
  title: "Component/SimpleTimer",
  component: SimpleTimer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SimpleTimer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
