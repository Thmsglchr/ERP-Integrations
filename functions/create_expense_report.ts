import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import { SlackAPIClient } from "deno-slack-api-client/mod.ts";

export const def = DefineFunction({
  callback_id: "create_expense_report",
  title: "Create an expense Report",
  source_file: "./functions/create_expense_report.ts",
  input_parameters: {
    properties: {
      channel_id: { type: Schema.types.channel_id },
    },
    required: ["channel_id"],
  },
});

export default SlackFunction(def, async ({ inputs, env, token }) => {
  const client = new SlackAPIClient(token);

  try {
    const authTest = await client.auth.test();
    console.log("Auth test successful:", authTest);
  } catch (error) {
    console.error("Auth test failed:", error);
    return { error: "Auth test failed" };
  }

  console.log("Slack function called");
  console.log(env);

  try {
    const postMessage = await client.chat.postMessage({
      channel: inputs.channel_id,
      text: "Test",
    });

    if (!postMessage.ok) {
      const error = `Failed to post message: ${postMessage.error}`;
      console.error(error);
      return { error };
    }

    console.log("Message posted successfully:", postMessage);
    return { success: true };
  } catch (error) {
    console.error("Error posting message:", error);
    return { error: "Error posting message" };
  }
});
