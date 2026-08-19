import React from 'react';
import { OvernightStep } from '../types/agency';
import { Moon, CheckCircle2, Clock, Sparkles, ArrowRight, Zap } from 'lucide-react';

interface Props {
  timeline: OvernightStep[];
}

export const WorkflowTimeline: React.FC<Props> = ({ timeline }) => {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase font-bold">
            <Moon className="w-3.5 h-3.5" /> Overnight Autonomous Execution
          </div>
          <h3 className="text-xl font-bold text-foreground mt-1">
            Competitor Price Tracker & ERP Sync Pipeline
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            How your multi-agent team executes data scraping, margin delta math, and MYOB staging while you sleep.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold">
          <Zap className="w-3.5 h-3.5" /> Fully Autonomous Loop
        </span>
      </div>

      <div className="relative border-l-2 border-primary/30 ml-4 pl-6 space-y-8 my-4">
        {timeline.map((step, idx) => (
          <div key={step.time} className="relative group">
            {/* Timeline Dot */}
            <div className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-background flex items-center justify-center ${
              step.status === 'completed' ? 'bg-emerald-500' : 'bg-primary animate-pulse'
            }`} />

            <div className="space-y-1.5 bg-muted/40 p-4 rounded-xl border border-border/80">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-primary/10 text-primary">
                  {step.time}
                </span>
                <span className="text-xs font-mono font-bold text-foreground">
                  {step.agent}
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-card border border-border text-muted-foreground">
                  {step.action}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
                {step.summary}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
