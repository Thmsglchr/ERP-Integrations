import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import { SlackAPIClient } from "slack-web-api-client/mod.ts";

export const def = DefineFunction({
  callback_id: "create_expense_report",
  title: "Create an expense Report",
  source_file: "./functions/create_expense_report.ts",
  input_parameters: {
    properties: {
      user_id: { type: Schema.types.string },
      expense_amount: { type: Schema.types.string },
      expense_type: { type: Schema.types.string }
    },
    required: ["user_id", "expense_amount", "expense_type"],
  },
});

export default SlackFunction(def, async ({ inputs, env }) => {
  const client = new SlackAPIClient(env.APP_TOKEN);
  try {
    const postMessage = await client.chat.postMessage({
      channel: inputs.user_id, 
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": ":white_check_mark: *Your expense report has been successfully created!*"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Reference Number:* `#12345678`"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Amount:* `£"+inputs.expense_amount+"`"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Type:* `"+inputs.expense_type+"`"
          }
        },
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Modify",
                "emoji": true
              },
              "value": "modify_expense_report",
              "action_id": "button_modify"
            }
          ]
        }
      ]      
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
