import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Server, 
  Cpu, 
  ArrowDown, 
  CheckCircle2,
  Database,
  UserCheck,
  CloudOff
} from 'lucide-react';

export const SecuritySection: React.FC = () => {
  return (
    <section id="security" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-emerald-300 bg-emerald-50 text-emerald-900 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Strict Air-Gapped Architectural Guarantee</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1B3D] font-serif">
            Your Data Stays Within Your Organization
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed font-sans">
            Every query, scanned file, and spreadsheet is executed solely on local on-premise hardware. 
            There are zero outbound internet connections, no cloud telemetry, and complete cryptographic boundaries.
          </p>
        </div>

        {/* 4 Official Security Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-14">
          <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium block">Internet Access</span>
            <span className="text-2xl font-bold text-red-600 block my-0.5">OFF</span>
            <span className="text-[11px] text-emerald-700 font-medium">Physical Cutout</span>
          </div>

          <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium block">External API Calls</span>
            <span className="text-2xl font-bold text-slate-900 block my-0.5">0</span>
            <span className="text-[11px] text-emerald-700 font-medium">No Cloud Tokens</span>
          </div>

          <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium block">Outbound Data</span>
            <span className="text-2xl font-bold text-emerald-700 block my-0.5">0 KB</span>
            <span className="text-[11px] text-slate-500 font-medium">Strict Local Perimeter</span>
          </div>

          <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium block">Local Processing</span>
            <span className="text-2xl font-bold text-[#0E2A5C] block my-0.5">100%</span>
            <span className="text-[11px] text-slate-500 font-medium">On-Premise GPU Nodes</span>
          </div>
        </div>

        {/* Clean Government-Style Security Flow Diagram */}
        <div className="max-w-2xl mx-auto rounded-lg border border-slate-300 bg-white p-6 sm:p-8 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6 text-center">
            Perimeter Security & Execution Architecture
          </h3>

          <div className="flex flex-col items-center space-y-3">
            {/* Step 1: Employee */}
            <div className="w-full sm:w-96 p-3.5 rounded border border-slate-300 bg-slate-50 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded bg-blue-100 text-[#0E2A5C]">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-900 block">EMPLOYEE / OFFICER</span>
                  <span className="text-[10px] text-slate-500">Government Intranet / VPN Connection</span>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                TLS 1.3
              </span>
            </div>

            <ArrowDown className="w-5 h-5 text-slate-400" />

            {/* Step 2: Organization's Private Server */}
            <div className="w-full sm:w-96 p-3.5 rounded border-2 border-[#0E2A5C] bg-blue-50/50 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded bg-[#0E2A5C] text-white">
                  <Server className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-[#0E2A5C] block">ORGANIZATION'S PRIVATE SERVER</span>
                  <span className="text-[10px] text-slate-600">Air-Gapped Sovereign Operating System</span>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                SECURE
              </span>
            </div>

            <ArrowDown className="w-5 h-5 text-slate-400" />

            {/* Step 3: Local AI Models */}
            <div className="w-full sm:w-96 p-3.5 rounded border border-slate-300 bg-slate-50 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded bg-orange-100 text-orange-700">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-900 block">LOCAL AI MODELS</span>
                  <span className="text-[10px] text-slate-500">Quantized on Local GPU Memory (PCIe Direct)</span>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">
                VRAM ONLY
              </span>
            </div>

            <ArrowDown className="w-5 h-5 text-slate-400" />

            {/* Step 4: Authorized Data / Tools */}
            <div className="w-full sm:w-96 p-3.5 rounded border border-emerald-300 bg-emerald-50/40 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded bg-emerald-700 text-white">
                  <Database className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-900 block">AUTHORIZED DATA / TOOLS</span>
                  <span className="text-[10px] text-slate-600">Internal Vector Store & Sandboxed Parsers</span>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                AIR-GAPPED
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-center gap-2 text-xs text-slate-600 font-medium">
            <CloudOff className="w-4 h-4 text-red-600" />
            <span>Outbound Internet Sockets Dropped at Kernel Level (Port 80/443 BLOCKED)</span>
          </div>
        </div>
      </div>
    </section>
  );
};
