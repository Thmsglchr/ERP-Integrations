import { Manifest } from "deno-slack-sdk/mod.ts";
import CreateExpenseReport from "./workflows/create_expense_report.js";

export default Manifest({
  name: "ERP Custom Integrations",
  description: "ERP custom integrations for Slack",
  icon: "assets/ERPCustomIntegrations.png",
  workflows: [CreateExpenseReport],
  outgoingDomains: [],
  botScopes: [
    "commands",
    "app_mentions:read",
    "chat:write",
    "chat:write.public",
    "channels:join",
    "channels:history",
    "triggers:read",
    "triggers:write",
  ],
});
