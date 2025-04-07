import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Select } from "../Select";
import { MenuItem } from "../Menu";
import { Provider } from "../Provider";

const meta: Meta<typeof Select> = {
  title: "Example/Select",
  component: Select,
  decorators: [
    (Story) => (
      <Provider>
        <Story />
      </Provider>
    ),
  ],
  parameters: {
    layout: "centered",
    expended: true,
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["s", "m", "l", "xl"],
      description: "버튼 크기",
    },
    invalid: {
      control: "boolean",
      description: "유효성 검사 실패 여부",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
    },
    pending: {
      control: "boolean",
      description: "로딩 상태",
    },
    quiet: {
      control: "boolean",
      description: "테두리 없음 여부",
    },
    forcePopover: {
      control: "boolean",
      description: "팝오버 강제 여부(모바일을 위한 옵션)",
    },
    // variant: {
    //   control: "select",
    //   options: ["default", "accent", "secondary"],
    //   description: "체크박스 색깔",
    // },
    onChange: {
      action: "changed",
      description: "값 변경 이벤트",
    }
  },
  args: { onChange: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
      <MenuItem>Option 3</MenuItem>
    </Select>
  ),
  args: {
    size: "m",
    invalid: false,
    disabled: false,
    quiet: false,
    pending: false,
  },
};
