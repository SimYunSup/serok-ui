import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Button } from "../Button";
import { Provider } from "../Provider";

const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
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
    variant: {
      control: "select",
      options: ["accent", "primary", "secondary", "negative", "white", "black"],
      description: "버튼 색깔",
    },
    size: {
      control: "select",
      options: ["xxs", "xs", "s", "m", "l", "xl", "xxl"],
      description: "버튼 크기",
    },
    treatment: {
      control: "select",
      options: ["fill", "outline"],
      description: "버튼 스타일",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
    },
    pending: {
      control: "boolean",
      description: "로딩 여부",
    },
    children: {
      control: "text",
      description: "버튼 텍스트",
    },
    onClick: {
      action: "clicked",
      description: "버튼 클릭 이벤트",
    }
  },
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "accent",
    children: "Button",
    size: "m",
    treatment: "fill"
  },
};
