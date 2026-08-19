name: Analytics Agent
schedule: "0 2:30 * * *"
skill: sql-margin-optimizer
task: |
  Check inbox for scraper completion notice.
  Query price_tracker.db for price changes greater than 5%.
  Recalculate profit margins and check margin safety thresholds.
  Dispatch recommended price adjustments to erp_sync_agent inbox.
