import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert"; // Adjust the path
import { AlertCircle, Info, CheckCircle2, XCircle } from "lucide-react";

type AlertVariant = "default" | "destructive";

const meta: Meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default", "destructive"],
    },
  },
};

export default meta;

type Story = StoryObj<{
  variant: AlertVariant;
}>;

// Icon selector for demo
const iconMap = {
  default: <Info className="h-4 w-4" />,
  destructive: <XCircle className="h-4 w-4" />,
};

export const Playground: Story = {
  args: {
    variant: "default",
  },
  render: ({ variant }) => (
    <Alert variant={variant}>
      {iconMap[variant]}
      <div>
        <AlertTitle>{variant === "destructive" ? "Error!" : "Heads up!"}</AlertTitle>
        <AlertDescription>
          {variant === "destructive"
            ? "Something went wrong. Please try again later."
            : "This is a general alert with helpful information."}
        </AlertDescription>
      </div>
    </Alert>
  ),
};

export const Default: Story = {
  render: () => (
    <Alert>
      <Info className="h-4 w-4" />
      <div>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          This is a default alert that uses the standard theme.
        </AlertDescription>
      </div>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <XCircle className="h-4 w-4" />
      <div>
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>
          Something went terribly wrong. Please check and try again.
        </AlertDescription>
      </div>
    </Alert>
  ),
};
