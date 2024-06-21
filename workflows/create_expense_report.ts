import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { def as CreateExpenseReportFunction } from "../functions/create_expense_report.ts";

const CreateExpenseReportWorkflow = DefineWorkflow({
  callback_id: "create_expense_report_step",
  title: "Create Expense Report",
  input_parameters: {
    properties: {
      user_id: { type: Schema.types.string },
      expense_amount: { type: Schema.types.string },
      expense_type: { type: Schema.types.string }
    },
    required: ["user_id", "expense_amount", "expense_type"],
  },
});

CreateExpenseReportWorkflow.addStep(CreateExpenseReportFunction, {
  user_id: CreateExpenseReportWorkflow.inputs.user_id,
  expense_amount: CreateExpenseReportWorkflow.inputs.expense_amount,
  expense_type: CreateExpenseReportWorkflow.inputs.expense_type
});

export default CreateExpenseReportWorkflow;
