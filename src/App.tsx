import React, { useState } from 'react';
import { AgentFleetBoard } from './components/AgentFleetBoard';
import { WorkflowTimeline } from './components/WorkflowTimeline';
import { InboxQueueMonitor } from './components/InboxQueueMonitor';
import { VibeKanban } from './components/VibeKanban';
import {
  SAMPLE_AGENTS,
  SAMPLE_INBOX_MESSAGES,
  SAMPLE_OVERNIGHT_TIMELINE,
} from './data/sampleAgency';
import {
  Bot,
  Layers,
  Moon,
  Sun,
  Mail,
  Zap,
  Github,
  Sparkles,
  Terminal,
  Activity,
  Workflow,
  Kanban,
} from 'lucide-react';
import { Toaster } from 'sonner';

export function App() {
  const [activeTab, setActiveTab] = useState<'fleet' | 'kanban' | 'timeline' | 'inbox' | 'cli'>('fleet');
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={`min-h-screen bg-background text-foreground transition-colors duration-200 ${darkMode ? 'dark' : ''}`}>
      <Toaster position="top-right" richColors />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-mono font-bold text-sm shadow-sm">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm sm:text-base tracking-tight text-foreground">
                Vibe Agency
              </span>
              <span className="hidden sm:inline-block ml-2 text-[11px] font-mono text-muted-foreground">
                v1.2 (Multi-Agent Suite & Vibe Kanban)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/shahrukh-hack/vibe-agency"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-mono text-foreground hover:bg-muted transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Star on GitHub</span>
            </a>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground transition-colors"
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autonomous Multi-Agent Team Orchestration & Vibe Kanban</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-foreground tracking-tight leading-tight">
            Self-Managing <span className="italic font-normal text-primary">AI Agent Teams</span>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Define agent roles across 12 departments, manage live task queues on a reactive Vibe Kanban board, and delegate tasks between agents via inter-agent inbox queues.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-mono text-muted-foreground">
            <span className="px-2 py-1 rounded bg-muted">200+ Agent Manifests</span>
            <span>•</span>
            <span className="px-2 py-1 rounded bg-muted">Vibe Kanban</span>
            <span>•</span>
            <span className="px-2 py-1 rounded bg-muted">Overnight Price Scraper</span>
            <span>•</span>
            <span className="px-2 py-1 rounded bg-muted">MYOB ERP Sync</span>
            <span>•</span>
            <span className="px-2 py-1 rounded bg-muted">Inter-Agent Inbox</span>
            <span>•</span>
            <span className="px-2 py-1 rounded bg-muted">Antigravity</span>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-xl border border-border bg-muted/60 gap-1 overflow-x-auto">
            {[
              { id: 'fleet', label: 'Agent Fleet Roster', icon: <Bot className="w-3.5 h-3.5" /> },
              { id: 'kanban', label: 'Vibe Kanban Board', icon: <Kanban className="w-3.5 h-3.5" /> },
              { id: 'timeline', label: 'Overnight Timeline', icon: <Workflow className="w-3.5 h-3.5" /> },
              { id: 'inbox', label: 'Inter-Agent Inbox', icon: <Mail className="w-3.5 h-3.5" /> },
              { id: 'cli', label: 'CLI & Setup Guide', icon: <Terminal className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Views */}
        {activeTab === 'fleet' && <AgentFleetBoard agents={SAMPLE_AGENTS} />}
        {activeTab === 'kanban' && <VibeKanban />}
        {activeTab === 'timeline' && <WorkflowTimeline timeline={SAMPLE_OVERNIGHT_TIMELINE} />}
        {activeTab === 'inbox' && <InboxQueueMonitor initialMessages={SAMPLE_INBOX_MESSAGES} />}
        {activeTab === 'cli' && (
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase font-bold">
                <Terminal className="w-3.5 h-3.5" /> 1-Command CLI Orchestrator
              </div>
              <h3 className="text-xl font-bold text-foreground mt-1">
                How to Run Vibe Agency in Your Terminal
              </h3>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="p-4 rounded-xl border border-border/80 bg-muted/40 space-y-2">
                <span className="text-primary font-bold"># 1. Initialize an AI agent team in any repository</span>
                <pre className="text-foreground bg-background p-3 rounded-lg border border-border/60">
                  npx vibe-agency init
                </pre>
              </div>

              <div className="p-4 rounded-xl border border-border/80 bg-muted/40 space-y-2">
                <span className="text-primary font-bold"># 2. Start the heartbeat autonomous background daemon</span>
                <pre className="text-foreground bg-background p-3 rounded-lg border border-border/60">
                  npx vibe-agency run --daemon
                </pre>
              </div>

              <div className="p-4 rounded-xl border border-border/80 bg-muted/40 space-y-2">
                <span className="text-primary font-bold"># 3. Send a task from one agent to another</span>
                <pre className="text-foreground bg-background p-3 rounded-lg border border-border/60">
                  npx vibe-agency send --from pm --to coder "Implement real-time pricing chart"
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="pt-12 border-t border-border/80 text-center space-y-3">
          <p className="text-xs sm:text-sm font-mono text-muted-foreground">
            Created with intention by <a href="https://github.com/shahrukh-hack" className="text-primary font-bold hover:underline">Yogeshkumar Patel</a> • Adelaide, Australia 🇦🇺
          </p>
          <p className="text-[11px] text-muted-foreground">
            Open Source under MIT License • Part of The Vibe Coder's Power Suite
          </p>
        </footer>
      </main>
    </div>
  );
}
