import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Input } from "../Input";
import { Provider } from "../Provider";

const meta: Meta<typeof Input> = {
  title: "Example/Input",
  component: Input,
  decorators: [
    (Story) => (
      <Provider>
        <Story />
      </Provider>
    ),
  ],
  parameters: {
    layout: "centered",
    expanded: true,
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      description: "ID",
    },
    size: {
      control: "select",
      options: ["s", "m", "l", "xl"],
      description: "입력창 크기",
    },
    valid: {
      control: "boolean",
      description: "유효성 검사 성공 여부",
    },
    invalid: {
      control: "boolean",
      description: "유효성 검사 실패 여부",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
    },
    quiet: {
      control: "boolean",
      description: "테두리 없음 여부",
    },
    placeholder: {
      control: "text",
      description: "입력창의 placeholder 텍스트",
    },
    onChange: {
      action: "changed",
      description: "값 변경 이벤트",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "tel", "url"],
      description: "입력창의 키보드 여부(모바일)",
    }
  },
  args: { onChange: fn(), id: "input", placeholder: "Placeholder", type: "text" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "m",
    valid: false,
    invalid: false,
    disabled: false,
    quiet: false,
  },
};
