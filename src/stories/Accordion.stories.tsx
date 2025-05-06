import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion"; // adjust path as needed

const meta: Meta = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-md mx-auto">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is ShadCN UI?</AccordionTrigger>
        <AccordionContent>
          ShadCN UI is a collection of beautifully designed components built with Tailwind CSS, Radix UI, and other modern libraries.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it customizable?</AccordionTrigger>
        <AccordionContent>
          Yes! You can easily customize every part of the component using Tailwind utility classes and your own styles.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Can I use it in my project?</AccordionTrigger>
        <AccordionContent>
          Absolutely! ShadCN UI is open-source and free to use in any project, commercial or personal.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
