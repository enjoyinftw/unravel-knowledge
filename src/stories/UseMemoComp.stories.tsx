import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

import UseMemoComp from "@/components/UseMemoComp/UseMemoComp";

const meta = {
  title: "Component/UseMemoComp",
  component: UseMemoComp,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UseMemoComp>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SmallInt: Story = {
  play: async ({ canvas, userEvent }) => {
    const inputElement = canvas.getByLabelText(/Calculate the factorial for/i);
    await userEvent.type(inputElement, "12");

    const resultElement = canvas.getByText(/the factorial of 12/i);
    expect(resultElement).toBeInTheDocument();
  },
};

export const LargeInt: Story = {
  play: async ({ canvas, userEvent }) => {
    const inputElement = canvas.getByLabelText(/Calculate the factorial for/i);
    await userEvent.type(inputElement, "12345");

    const resultElement = canvas.getByText(/the factorial of 12345/i);
    expect(resultElement).toBeInTheDocument();
  },
};

export const InvalidInput: Story = {
  play: async ({ canvas, userEvent }) => {
    const inputElement = canvas.getByLabelText(/Calculate the factorial for/i);
    await userEvent.type(inputElement, "abc");

    const resultElement = canvas.queryByText(/the factorial of abc/i);
    expect(resultElement).not.toBeInTheDocument();
  },
};

export const NegativeInteger: Story = {
  play: async ({ canvas, userEvent }) => {
    const inputElement = canvas.getByLabelText(/Calculate the factorial for/i);
    await userEvent.type(inputElement, "-12");

    const resultElement = canvas.getByText(/the factorial of -12/i);
    expect(resultElement).toBeInTheDocument();
  },
};
