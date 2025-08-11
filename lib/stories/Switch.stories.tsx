import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "@storybook/test";

import { Switch } from "../ui/Switch";

const meta: Meta<typeof Switch> = {
  title: "1. Example/Switch",
  component: Switch,
  decorators: [
    (Story) => (
      <Story />
    ),
  ],
  parameters: {
    layout: "centered",
    expended: true,
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "기본값",
    },
    size: {
      control: "select",
      options: ["s", "m", "l", "xl"],
      description: "버튼 크기",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
    },
    children: {
      control: "text",
      description: "스위치 라벨",
    },
    variant: {
      control: "select",
      options: ["default", "accent", "secondary"],
      description: "체크박스 색깔",
    },
    onChange: {
      action: "clicked",
      description: "값 변경 이벤트",
    }
  },
  args: { onChange: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "m",
    checked: false,
    variant: "default",
    disabled: false,
    children: "Switch on",
  },
};
