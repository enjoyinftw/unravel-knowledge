import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor } from "storybook/test";
import { FakeData } from "@/components/ItemList/ListComponent";
import ListContainer from "@/components/ItemList/ListContainer";
import { fetchListData } from "@/services/listService.mock";
import { ListItemProps } from "@/components/ItemList/ListItem";

const meta = {
  title: "Component/ListContainer",
  component: ListContainer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ListContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
};

export const Loading: Story = {
  args: {
    fetchData: () => new Promise<ListItemProps[]>(() => {}),
  },
};

export const Error: Story = {
  args: {
    fetchData: () =>
      new Promise<ListItemProps[]>((_, reject) => {
        setTimeout(() => reject("error"), 1000);
      }),
  },
};

export const Empty: Story = {
  args: {
    fetchData: () =>
      new Promise<ListItemProps[]>((resolve, _) => {
        setTimeout(() => resolve([]), 1000);
      }),
  },
};
