import React, { useState } from 'react';
import { WorkspaceLayout } from '../components/workspace/WorkspaceLayout';
import { AGENTS } from '../data/agents';
import { INITIAL_AUDIT_LOG } from '../data/mockData';
import { 
  Activity, 
  ShieldCheck, 
  Download, 
  Search, 
  CheckCircle2, 
  Clock, 
  Terminal, 
  Lock 
} from 'lucide-react';

export const ActivityPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const filtered = INITIAL_AUDIT_LOG.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.agent.toLowerCase().includes(search.toLowerCase()) ||
    item.detail.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <WorkspaceLayout
      activeAgent={AGENTS[6]} // Inspection Agent
      onSelectAgent={() => {}}
      currentTaskTitle="Enterprise Compliance Audit Log"
    >
      <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                AUDIT LOG SEVERE-0
              </span>
              <span className="text-[10px] font-mono text-emerald-400">
                APPEND-ONLY HSM LEDGER
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
              System Activity & Audit Trail
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Tamper-proof chronological record of every agent action, model activation, and deliverable compiled within your network.
            </p>
          </div>

          <button
            onClick={() => alert('Audit log exported to encrypted local disk (audit-2026-09-05.enc)')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/10 border border-white/10 text-white text-xs font-mono font-semibold transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export Audit Certificate</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search audit trail by agent, task ID, or action..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Audit Log Table */}
        <div className="rounded-2xl bg-[#090e1c]/80 border border-white/[0.08] overflow-hidden backdrop-blur-xl">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#050811] text-[10px] uppercase text-slate-400 border-b border-white/[0.08]">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Type</th>
                <th className="p-4">Event Description</th>
                <th className="p-4">Agent Enclave</th>
                <th className="p-4">Latency</th>
                <th className="p-4 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-slate-300">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 text-slate-400">{item.timestamp}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-[10px] text-cyan-300">
                      {item.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-white font-sans">{item.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{item.detail}</div>
                  </td>
                  <td className="p-4 text-purple-300">{item.agent}</td>
                  <td className="p-4 text-emerald-400">+{item.latencyMs}ms</td>
                  <td className="p-4 text-right">
                    <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Sealed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </WorkspaceLayout>
  );
};
