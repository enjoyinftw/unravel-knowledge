import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ListComponent, { FakeData } from "@/components/ItemList/ListComponent";

const meta = {
  title: "Component/ListComponent",
  component: ListComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ListComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    state: {
      items: FakeData,
      isLoading: false,
      errorMsg: "",
    },
  },
};

export const Loading: Story = {
  args: {
    state: {
      items: [],
      isLoading: true,
      errorMsg: "",
    },
  },
};

export const Error: Story = {
  args: {
    state: {
      items: [],
      isLoading: true,
      errorMsg: "Error",
    },
  },
};

export const EmptyList: Story = {
  args: {
    state: {
      items: [],
      isLoading: true,
      errorMsg: "",
    },
  },
};
