import { Manifest } from "deno-slack-sdk/mod.ts";
import CreateExpenseReport from "./workflows/create_expense_report.ts";

export default Manifest({
  name: "ERP Custom Integrations",
  description: "ERP custom integrations for Slack",
  icon: "assets/ERPCustomIntegrations.png",
  workflows: [CreateExpenseReport],
  outgoingDomains: [],
  botScopes: [
    "chat:write",
    "chat:write.public",
  ],
});
