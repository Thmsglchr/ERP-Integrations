import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { def as CreateExpenseReport } from "../functions/create_expense_report.ts";

const workflow = DefineWorkflow({
  callback_id: "create-expense-report-step",
  title: "Create an Expense Report",
  input_parameters: {
    properties: {
      channel_id: { type: Schema.types.channel_id },
    },
    required: ["channel_id"],
  },
});

workflow.addStep(CreateExpenseReport, {
  channel_id: workflow.inputs.channel_id,
});

export default workflow;