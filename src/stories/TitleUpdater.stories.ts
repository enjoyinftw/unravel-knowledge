import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import TitleUpdater from "@/components/TitleUpdater/TitleUpdater";

const meta = {
  title: "Component/TitleUpdater",
  component: TitleUpdater,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TitleUpdater>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async () => {
    await expect(document.title).toBe("title");
  },
};

export const EmptyTitle: Story = {
  play: async ({ canvas, userEvent }) => {
    const inputElement = canvas.getByRole("textbox", { name: /title/i });

    await userEvent.clear(inputElement);
    await expect(document.title).toBe("");
  },
};

export const TypeInput: Story = {
  play: async ({ canvas, userEvent }) => {
    const inputElement = canvas.getByRole("textbox", { name: /title/i });
    const userInput: string[] = ["H", "E", "Y"]

    await new Promise((resolve) => setTimeout(resolve, 500));
    await userEvent.clear(inputElement);

    for (const i of userInput) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await userEvent.type(inputElement, i)
    }

    await expect(document.title).toBe("HEY")

  },
};
