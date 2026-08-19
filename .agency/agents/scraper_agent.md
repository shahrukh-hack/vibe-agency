name: Scraper Agent
schedule: "0 2 * * *" # Runs at 2:00 AM every night
skill: python-playwright-worker
task: |
  Run headless scraper across Umart, Scorptec, Centre Com, and JB Hi-Fi.
  Write raw SKU price records into price_tracker.db.
  When completed, dispatch notification message to analytics_agent inbox.
