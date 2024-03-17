import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { SimpleFormTest } from "./SimpleFormTest.tsx";

const component = SimpleFormTest;

const meta = {
  component,
} satisfies Meta<typeof component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const simpleFormTest = {
  async play({ step, canvasElement }) {
    const canvas = within(canvasElement);

    await waitFor(function storyIsLoaded() {
      canvas.getByText("Submit");
    });

    const simpleText = "Text 1";

    async function runOnce() {
      const submit = canvas.getByRole("button", { name: "Submit" });
      const input = canvas.getByLabelText("Simple field");

      await expect(input).not.toHaveValue();

      await step("Submit empty form", async () => {
        console.debug("T: Submit empty form");

        await userEvent.click(submit);
        await expect(
          await canvas.findByText("Please fill out this field."),
        ).toBeVisible();
      });

      await step("Fill in the simple field", async () => {
        console.debug("T: Fill in the simple field");

        await expect(input).not.toHaveValue();

        await userEvent.type(input, simpleText, { delay: 10 });
        await expect(input).toHaveFocus();
        await expect(input).toHaveValue(simpleText);
      });

      await userEvent.click(submit);

      console.debug("T: Looking for the text");
      await expect(
        await canvas.findByText(`Simple text: ${simpleText}`),
      ).toBeVisible();
    }

    await runOnce();
    // await runOnce();
  },
} satisfies Story;
