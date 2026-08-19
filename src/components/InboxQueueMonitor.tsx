import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { InboxMessage } from '../types/agency';
import { Mail, Send, CheckCircle2, ArrowRight, MessageSquare, Plus, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  initialMessages: InboxMessage[];
}

export const InboxQueueMonitor: React.FC<Props> = ({ initialMessages }) => {
  const [messages, setMessages] = useState<InboxMessage[]>(initialMessages);
  const [fromAgent, setFromAgent] = useState('Scraper Agent');
  const [toAgent, setToAgent] = useState('Analytics Agent');
  const [subject, setSubject] = useState('Scrape finished: 15 SKUs updated in SQLite');
  const [payload, setPayload] = useState('Competitor price shifts detected at Umart. Recalculate margins.');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const newMsg: InboxMessage = {
      id: `msg-${Date.now()}`,
      fromAgent,
      toAgent,
      subject,
      timestamp: 'Just now',
      status: 'unread',
      payload,
    };
    setMessages([newMsg, ...messages]);
    toast.success(`Message dispatched to ${toAgent}'s inbox!`);
    setSubject('');
    setPayload('');
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase font-bold">
            <Mail className="w-3.5 h-3.5" /> Inter-Agent Message Queue
          </div>
          <h3 className="text-xl font-bold text-foreground mt-1">
            Live Agent Inbox & Task Delegation
          </h3>
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          {messages.length} Total Messages Exchanged
        </span>
      </div>

      {/* Quick Dispatch Form */}
      <form onSubmit={handleSendMessage} className="p-4 rounded-xl bg-muted/40 border border-border/80 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-foreground font-mono">
          <Send className="w-3.5 h-3.5 text-primary" /> Dispatch Task to Agent Inbox:
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase text-muted-foreground">From Agent:</label>
            <input
              type="text"
              value={fromAgent}
              onChange={(e) => setFromAgent(e.target.value)}
              className="w-full rounded-lg border border-border bg-background p-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase text-muted-foreground">To Agent:</label>
            <input
              type="text"
              value={toAgent}
              onChange={(e) => setToAgent(e.target.value)}
              className="w-full rounded-lg border border-border bg-background p-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-mono uppercase text-muted-foreground">Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Scraped 420 SKUs, recalculate margin delta"
            className="w-full rounded-lg border border-border bg-background p-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-sm"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send Message to {toAgent}</span>
        </button>
      </form>

      {/* Inbox Feed */}
      <div className="space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="p-4 rounded-xl border border-border/80 bg-background/80 space-y-2 hover:border-primary/40 transition-colors"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 font-mono font-bold">
                <span className="text-primary">{msg.fromAgent}</span>
                <ArrowRight className="w-3 h-3 text-muted-foreground" />
                <span className="text-foreground">{msg.toAgent}</span>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground">{msg.timestamp}</span>
            </div>

            <h5 className="font-bold text-xs sm:text-sm text-foreground">{msg.subject}</h5>
            <p className="text-xs text-muted-foreground leading-relaxed font-mono bg-muted/30 p-2.5 rounded-lg border border-border/40">
              {msg.payload}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
