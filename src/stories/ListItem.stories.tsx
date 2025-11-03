import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ListItem from "@/components/ItemList/ListItem";

const meta = {
  title: "Component/ListItem",
  component: ListItem,
  decorators: [
    (Story) => (
      <ul>
        <Story />
      </ul>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    itemKey: "LI1",
    content: "Default",
  },
};

export const Empty: Story = {
  args: {
    itemKey: "LI1",
  },
};

export const Unicode: Story = {
  args: {
    itemKey: "LI1",
    content: "\u2713",
  },
};
