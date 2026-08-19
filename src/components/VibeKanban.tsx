import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Kanban, Plus, Bot, CheckCircle2, Clock, Play, ArrowRight, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface KanbanTask {
  id: string;
  title: string;
  agent: string;
  division: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
}

const INITIAL_TASKS: KanbanTask[] = [
  {
    id: 't-1',
    title: 'Scrape 420 retail SKUs across Umart & Scorptec',
    agent: 'Headless Price Scraper',
    division: 'Operations',
    status: 'done',
  },
  {
    id: 't-2',
    title: 'Recalculate margin delta & flag 8 undercuts',
    agent: 'Backend Architect',
    division: 'Engineering',
    status: 'done',
  },
  {
    id: 't-3',
    title: 'Stage bulk item price commit in MYOB Cloud API',
    agent: 'MYOB Cloud ERP Sync',
    division: 'Operations',
    status: 'in_progress',
  },
  {
    id: 't-4',
    title: 'Audit Core Web Vitals & missing OpenGraph tags',
    agent: 'Technical SEO Strategist',
    division: 'Marketing',
    status: 'todo',
  },
  {
    id: 't-5',
    title: 'Review React 19 re-render loops in telemetry map',
    agent: 'Code Auditor',
    division: 'Engineering',
    status: 'review',
  },
];

export const VibeKanban: React.FC = () => {
  const [tasks, setTasks] = useState<KanbanTask[]>(INITIAL_TASKS);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [targetAgent, setTargetAgent] = useState('Frontend Wizard');

  const moveTask = (taskId: string, newStatus: KanbanTask['status']) => {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
    toast.success(`Task moved to ${newStatus.replace('_', ' ').toUpperCase()}!`);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: KanbanTask = {
      id: `t-${Date.now()}`,
      title: newTaskTitle,
      agent: targetAgent,
      division: 'Engineering',
      status: 'todo',
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    toast.success(`New task assigned to ${targetAgent}!`);
  };

  const columns: { id: KanbanTask['status']; title: string; color: string }[] = [
    { id: 'todo', title: 'Task Backlog', color: 'border-blue-500/30' },
    { id: 'in_progress', title: 'Agent Working ⚡', color: 'border-amber-500/30' },
    { id: 'review', title: 'Code Review 🛡️', color: 'border-purple-500/30' },
    { id: 'done', title: 'Completed / Staged ✅', color: 'border-emerald-500/30' },
  ];

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase font-bold">
            <Kanban className="w-3.5 h-3.5" /> Vibe Kanban Meta-Orchestrator
          </div>
          <h3 className="text-xl font-bold text-foreground mt-1">
            Autonomous Agent Task Board
          </h3>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold">
          <Zap className="w-3.5 h-3.5" /> Live Reactive Board
        </span>
      </div>

      {/* Task Creation Form */}
      <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl bg-muted/40 border border-border/80">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter new objective for agent team..."
          className="flex-1 rounded-lg border border-border bg-background p-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <select
          value={targetAgent}
          onChange={(e) => setTargetAgent(e.target.value)}
          className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-bold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="Frontend Wizard">Frontend Wizard</option>
          <option value="Backend Architect">Backend Architect</option>
          <option value="Headless Price Scraper">Headless Price Scraper</option>
          <option value="MYOB Cloud ERP Sync">MYOB Cloud ERP Sync</option>
          <option value="Technical SEO Strategist">Technical SEO Strategist</option>
          <option value="Code Auditor">Code Auditor</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-primary/90 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Ticket</span>
        </button>
      </form>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);
          return (
            <div key={col.id} className={`rounded-xl border ${col.color} bg-muted/30 p-4 space-y-3 flex flex-col justify-between`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-border/60 pb-2">
                  <span className="text-xs font-bold font-mono text-foreground">{col.title}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-card border border-border text-muted-foreground font-bold">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {colTasks.map((t) => (
                    <motion.div
                      key={t.id}
                      whileHover={{ y: -2 }}
                      className="p-3 rounded-lg border border-border bg-background shadow-xs space-y-2"
                    >
                      <p className="text-xs font-semibold text-foreground leading-snug">
                        {t.title}
                      </p>
                      <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                        <span className="px-1.5 py-0.5 rounded bg-muted text-primary font-bold">
                          🤖 {t.agent}
                        </span>
                        <div className="flex items-center gap-1">
                          {col.id !== 'todo' && (
                            <button
                              onClick={() => moveTask(t.id, col.id === 'done' ? 'review' : col.id === 'review' ? 'in_progress' : 'todo')}
                              className="hover:text-foreground text-[11px]"
                              title="Move backward"
                            >
                              ◀
                            </button>
                          )}
                          {col.id !== 'done' && (
                            <button
                              onClick={() => moveTask(t.id, col.id === 'todo' ? 'in_progress' : col.id === 'in_progress' ? 'review' : 'done')}
                              className="hover:text-primary text-[11px] font-bold"
                              title="Advance task"
                            >
                              ▶
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
