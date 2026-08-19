name: ERP Sync Agent
schedule: "0 3 * * *"
skill: enterprise-erp-sync
task: |
  Read recommended SKU price adjustments from inbox.
  Authenticate with MYOB Cloud REST API via OAuth2 token refresh rotation.
  Stage bulk price update payload in MYOB.
  Dispatch formatted summary email digest to Yogeshkumar Patel.
