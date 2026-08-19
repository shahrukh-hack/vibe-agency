import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AgentRole, AgentDivision } from '../types/agency';
import { Bot, Clock, Activity, Cpu, Sparkles, CheckCircle2, Play, Filter, Layers } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  agents: AgentRole[];
}

export const AgentFleetBoard: React.FC<Props> = ({ agents }) => {
  const [selectedDivision, setSelectedDivision] = useState<string>('All');

  const divisions = ['All', 'Engineering', 'Design & UX', 'Marketing & Growth', 'Operations & ERP'];

  const filteredAgents =
    selectedDivision === 'All'
      ? agents
      : agents.filter((a) => a.division === selectedDivision);

  const handlePing = (agentName: string) => {
    toast.success(`Heartbeat ping sent to ${agentName}. Agent active and listening.`);
  };

  const getStatusBadge = (status: AgentRole['status']) => {
    switch (status) {
      case 'running':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 animate-pulse">● Running</span>;
      case 'sleeping':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">🌙 Scheduled Cron</span>;
      case 'idle':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-muted text-muted-foreground border border-border">○ Idle / Standby</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20">Awaiting Review</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase font-bold">
            <Bot className="w-3.5 h-3.5" /> Full-Stack AI Agency Fleet
          </div>
          <h3 className="text-xl font-bold text-foreground mt-1">
            Specialized Department Roster
          </h3>
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          {agents.length} Specialized Agents Across 4 Divisions
        </span>
      </div>

      {/* Division Filters */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-muted/50 border border-border/80 w-fit">
        {divisions.map((div) => (
          <button
            key={div}
            onClick={() => setSelectedDivision(div)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedDivision === div
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {div}
          </button>
        ))}
      </div>

      {/* Agent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAgents.map((agent) => (
          <motion.div
            key={agent.id}
            whileHover={{ y: -3 }}
            className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 rounded-xl bg-muted">{agent.avatar}</span>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">{agent.name}</h4>
                    <p className="text-[11px] font-mono text-muted-foreground">{agent.role}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                {getStatusBadge(agent.status)}
                <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                  <Activity className="w-3 h-3 text-primary" /> {agent.lastHeartbeat}
                </span>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {agent.description}
              </p>
            </div>

            <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] font-mono">
              <span className="px-2 py-0.5 rounded bg-muted/80 text-foreground">
                Skill: {agent.skill}
              </span>
              <button
                onClick={() => handlePing(agent.name)}
                className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                title="Ping Agent"
              >
                <Play className="w-3.5 h-3.5 text-primary" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
