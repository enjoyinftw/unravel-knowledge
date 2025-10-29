import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";

import Button from "@/components/Button/Button";
import userEvent from "@testing-library/user-event";

const meta = {
  title: "Comonent/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "primary",
    onClick: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    const buttonElement = canvas.getByRole("button", { name: args.label });

    await expect(buttonElement).toBeInTheDocument();
    await expect(buttonElement).toHaveTextContent(args.label!);
    await userEvent.click(buttonElement);
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const Disabled: Story = {
  args: {
    label: "disabled",
    onClick: fn(),
    disabled: true,
  },
  play: async ({ args, canvas, userEvent }) => {
    const buttonElement = canvas.getByRole("button", { name: args.label });

    await expect(buttonElement).toBeInTheDocument();
    await expect(buttonElement).toHaveTextContent(args.label!);
    await expect(buttonElement).toBeDisabled();
    await userEvent.click(buttonElement);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const WithAriaLabel: Story = {
  args: {
    label: "WithAriaLabel",
    onClick: fn(),
    ariaLabel: "clickable",
  },
  play: async ({ args, canvas, userEvent }) => {
    const buttonElement = canvas.getByRole("button", { name: args.ariaLabel });
    
    await expect(buttonElement).toBeInTheDocument();
    await userEvent.click(buttonElement);
    await expect(args.onClick).toHaveBeenCalled();
  },
};
