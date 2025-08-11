import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "@storybook/test";

import { Checkbox } from "../ui/Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "1. Example/Checkbox",
  component: Checkbox,
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
    indeterminate: {
      control: "boolean",
      description: "불확실한 상태",
    },
    invalid: {
      control: "boolean",
      description: "유효성 검사 실패 여부",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
    },
    children: {
      control: "text",
      description: "체크박스 라벨",
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
    invalid: false,
    disabled: false,
    children: "Checkbox",
  },
};
