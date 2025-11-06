import { Meta, StoryObj } from "@storybook/nextjs-vite";
import TextLog from "@/components/TextLog/TextLog";
import { useState } from "react";
import Button from "@/components/Button/Button";
import { expect, spyOn } from "storybook/test";

const meta = {
  title: "Component/TextLog",
  component: TextLog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextLog>;

export default meta;

type Story = StoryObj<typeof meta>;

const TextLogWrapper = ({ msg = "placeholder", logMsg = "placeholder log" }) => {
  const [isMounted, setIsMounted] = useState(true);
  const handleMount = () => {
    setIsMounted((state) => !state);
  };

  return (
    <div>
      <Button
        label={isMounted ? "unmount" : "mount"}
        onClick={handleMount}
      />
      {isMounted && (
        <TextLog
          msg={msg}
          logMsg={logMsg}
        />
      )}
    </div>
  );
};

export const Default: Story = {
  args: {
    msg: "HOLA",
    logMsg: "LOG THIS",
  },
  render: (args) => <TextLogWrapper {...args} />,
};
