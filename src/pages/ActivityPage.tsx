import React, { useState } from 'react';
import { WorkspaceLayout } from '../components/workspace/WorkspaceLayout';
import { AGENTS } from '../data/agents';
import { 
  ShieldCheck, 
  Download, 
  Search, 
  CheckCircle2, 
  Clock, 
  Lock,
  Filter,
  FileCheck
} from 'lucide-react';

interface AuditRecord {
  id: string;
  timestamp: string;
  user: string;
  designation: string;
  agent: string;
  action: string;
  clearance: string;
  status: 'Verified' | 'Encrypted' | 'Signed' | 'Passed';
}

export const ActivityPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterAgent, setFilterAgent] = useState('All');
  const [isExporting, setIsExporting] = useState(false);

  const auditLogData: AuditRecord[] = [
    {
      id: 'AUD-8842',
      timestamp: '2026-09-07 14:32:08',
      user: 'Dr. Rajesh Sharma (EMP-0142)',
      designation: 'Chief Engineer',
      agent: 'Engineering Assistant',
      action: 'Vibration FFT spectrum analyzed against IS 12075 permissible thresholds for Gas Turbine 04',
      clearance: 'Level 5',
      status: 'Verified'
    },
    {
      id: 'AUD-8841',
      timestamp: '2026-09-07 14:28:44',
      user: 'Amitabh Sen (EMP-0204)',
      designation: 'GM Commercial',
      agent: 'Finance Analyst',
      action: 'Comparative evaluation of 3 GeM tender bids generated under GFR 2017 Rule 149',
      clearance: 'Level 3',
      status: 'Signed'
    },
    {
      id: 'AUD-8840',
      timestamp: '2026-09-07 14:15:19',
      user: 'Sunita Meena (EMP-0189)',
      designation: 'Deputy Director',
      agent: 'Document Assistant',
      action: 'Summarized CVC Vigilance Ingestion Circular 03/2024 and generated executive brief',
      clearance: 'Level 4',
      status: 'Encrypted'
    },
    {
      id: 'AUD-8839',
      timestamp: '2026-09-07 13:58:02',
      user: 'Vikram Joshi (EMP-0255)',
      designation: 'Systems Administrator',
      agent: 'Software Engineer',
      action: 'Air-gapped model weights SHA-256 integrity check completed on DeepSeek R1 & Llama 3.3',
      clearance: 'Level 5',
      status: 'Passed'
    },
    {
      id: 'AUD-8838',
      timestamp: '2026-09-07 13:42:11',
      user: 'Pooja Deshmukh (EMP-0211)',
      designation: 'Senior Scientist',
      agent: 'Inspection Assistant',
      action: 'Piping ultrasonic weld thickness scan parsed; 0 defects beyond tolerance detected',
      clearance: 'Level 3',
      status: 'Verified'
    },
    {
      id: 'AUD-8837',
      timestamp: '2026-09-07 12:50:33',
      user: 'Anita Roy (EMP-0310)',
      designation: 'Assistant Director',
      agent: 'HR Assistant',
      action: 'Drafted Departmental Promotion Committee agenda notes under CCS Conduct Rules',
      clearance: 'Level 2',
      status: 'Signed'
    },
    {
      id: 'AUD-8836',
      timestamp: '2026-09-07 11:34:20',
      user: 'Dr. Rajesh Sharma (EMP-0142)',
      designation: 'Chief Engineer',
      agent: 'Presentation Builder',
      action: 'Generated 12-slide Parliamentary Standing Committee briefing note from project telemetry',
      clearance: 'Level 5',
      status: 'Verified'
    },
    {
      id: 'AUD-8835',
      timestamp: '2026-09-07 10:18:49',
      user: 'Amitabh Sen (EMP-0204)',
      designation: 'GM Commercial',
      agent: 'Data Analyst',
      action: 'Aggregated 30-day thermal efficiency telemetry CSV into structured executive matrix',
      clearance: 'Level 3',
      status: 'Passed'
    }
  ];

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Government Audit Ledger Certificate exported in CERT-In / ISO 27001 compliance format (SHA-256 Signed).');
    }, 800);
  };

  const filtered = auditLogData.filter((item) => {
    const matchesAgent = filterAgent === 'All' || item.agent === filterAgent;
    const matchesSearch =
      item.user.toLowerCase().includes(search.toLowerCase()) ||
      item.action.toLowerCase().includes(search.toLowerCase()) ||
      item.agent.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());
    return matchesAgent && matchesSearch;
  });

  return (
    <WorkspaceLayout
      activeAgent={AGENTS[6]}
      onSelectAgent={() => {}}
      currentTaskTitle="Government Compliance Audit Log"
    >
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-7xl mx-auto w-full font-sans text-xs">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-[#0E2A5C] dark:text-blue-400">APPEND-ONLY IMMUTABLE LEDGER</span>
              <span>•</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-medium">CERT-IN COMPLIANT</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Official Government & Enterprise Audit Log
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Cryptographically signed chronological record of all officer interactions, local model activations, and synthesized deliverables.
            </p>
          </div>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0E2A5C] text-white font-semibold text-xs hover:bg-[#0B1B3D] transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Exporting Certificate...' : 'Export Audit Certificate (PDF / JSON)'}</span>
          </button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search audit trail by Officer ID, agent, action description, or ID..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-[#1A1A1A] border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#0E2A5C]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-slate-500 whitespace-nowrap">Filter Agent:</span>
            <select
              value={filterAgent}
              onChange={(e) => setFilterAgent(e.target.value)}
              className="px-3 py-2 rounded-lg bg-white dark:bg-[#1A1A1A] border border-slate-300 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="All">All Specialists</option>
              <option value="Engineering Assistant">Engineering Assistant</option>
              <option value="Finance Analyst">Finance Analyst</option>
              <option value="Document Assistant">Document Assistant</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Inspection Assistant">Inspection Assistant</option>
              <option value="HR Assistant">HR Assistant</option>
              <option value="Presentation Builder">Presentation Builder</option>
              <option value="Data Analyst">Data Analyst</option>
            </select>
          </div>
        </div>

        {/* Official Audit Log Table */}
        <div className="rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-[#1A1A1A] text-[11px] uppercase tracking-wider text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-semibold">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">User / Officer</th>
                  <th className="py-3 px-4">Agent Enclave</th>
                  <th className="py-3 px-4">Action Summary</th>
                  <th className="py-3 px-4">Clearance</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-sans">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-[#1E1E1E]/50 transition-colors">
                    {/* Timestamp */}
                    <td className="py-3 px-4 whitespace-nowrap font-mono text-slate-500 dark:text-slate-400">
                      <div>{item.timestamp}</div>
                      <div className="text-[10px] text-slate-400">{item.id}</div>
                    </td>

                    {/* User */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="font-bold text-slate-900 dark:text-white">{item.user}</div>
                      <div className="text-[10px] text-slate-500">{item.designation}</div>
                    </td>

                    {/* Agent */}
                    <td className="py-3 px-4 whitespace-nowrap font-semibold text-[#0E2A5C] dark:text-blue-400">
                      {item.agent}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 max-w-md text-slate-600 dark:text-slate-300">
                      {item.action}
                    </td>

                    {/* Clearance */}
                    <td className="py-3 px-4 whitespace-nowrap font-mono text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#202020] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                        {item.clearance}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono text-[10px] font-bold border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Integrity Certificate Notice */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#1A1A1A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span>Audit entries are immutable and cryptographically anchored to local Hardware Security Module (HSM).</span>
          </div>
          <span className="font-mono text-[10px] text-slate-500">
            Hash: 8d2b...910f (Block #12409)
          </span>
        </div>
      </div>
    </WorkspaceLayout>
  );
};

export default ActivityPage;
