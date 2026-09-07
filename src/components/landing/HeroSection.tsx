import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Server, 
  Cpu, 
  CheckCircle2,
  FileText,
  Building,
  HardDrive
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-white pt-12 pb-16 md:pt-16 md:pb-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Official Heading & Purpose */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Official Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-blue-200 bg-blue-50 text-[#0E2A5C] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>National Enterprise AI Framework · 100% On-Premise Sovereign Compute</span>
            </div>

            {/* Large Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B1B3D] leading-[1.18] font-serif">
              Secure AI for Government & Critical Organizations
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl font-sans">
              An on-premise AI workforce designed to help organizations use modern artificial intelligence 
              without sending confidential information outside their infrastructure.
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                to="/login/employee"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#133863] hover:bg-[#0B2545] text-white font-bold text-sm transition-all shadow-sm"
              >
                <span>Employee Portal</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </Link>

              <Link
                to="/login/admin"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#EE7027] hover:bg-[#D65F18] text-white font-bold text-sm transition-all shadow-sm"
              >
                <span>Admin Console</span>
              </Link>

              <a
                href="#why-sovereign"
                className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors shadow-sm"
              >
                Platform Overview
              </a>
            </div>

            {/* Security Badges: 4 Official Restrained Badges */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-3 text-xs">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-800 font-semibold">
                <Lock className="w-3.5 h-3.5 text-emerald-700" />
                <span>AIR-GAPPED</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-800 font-semibold">
                <Server className="w-3.5 h-3.5 text-[#0E2A5C]" />
                <span>ON-PREMISE</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-800 font-semibold">
                <Cpu className="w-3.5 h-3.5 text-orange-600" />
                <span>PRIVATE AI</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-800 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                <span>AUDITABLE</span>
              </div>
            </div>
          </div>

          {/* Right Column: Professional Government Dashboard Preview */}
          <div className="lg:col-span-5">
            <div className="rounded-lg border border-slate-300 bg-slate-50 shadow-md overflow-hidden text-left">
              {/* Window Titlebar */}
              <div className="px-4 py-2.5 bg-[#0E2A5C] text-white flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                  <span className="font-semibold tracking-wide">Sovereign On-Premise Enclave · Status: Active</span>
                </div>
                <span className="text-[11px] text-amber-300 font-mono">NIC / C-DAC Compatible</span>
              </div>

              {/* Internal Dashboard View */}
              <div className="p-5 space-y-4 bg-white">
                <div className="flex items-center justify-between pb-3 border-b border-slate-150 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Authorized Node</span>
                    <span className="font-bold text-slate-900">National Supercomputing Enclave-01</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                    WAN: OFF
                  </span>
                </div>

                {/* Metric Summary Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded border border-slate-200 bg-slate-50">
                    <span className="text-slate-500 block text-[11px]">External Cloud Calls</span>
                    <span className="text-xl font-bold text-slate-900">0 Calls</span>
                    <span className="text-[10px] text-emerald-700 font-medium block mt-0.5">Physical Cutout Enforced</span>
                  </div>

                  <div className="p-3 rounded border border-slate-200 bg-slate-50">
                    <span className="text-slate-500 block text-[11px]">Local Processing</span>
                    <span className="text-xl font-bold text-[#0E2A5C]">100%</span>
                    <span className="text-[10px] text-slate-600 font-medium block mt-0.5">On-Premise GPU Nodes</span>
                  </div>
                </div>

                {/* Sample Government Task Dispatch */}
                <div className="p-3 rounded border border-slate-200 bg-blue-50/50 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#0E2A5C] flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-blue-700" />
                      Active Task: Technical Compliance Audit
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">ID: GOV-2026-09</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Analyzing turbine vibration report against Bureau of Indian Standards (BIS) IS-14817 and generating official approval note.
                  </p>
                  <div className="pt-1 flex items-center gap-2 text-[10px] font-semibold text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Deliverable verified against internal rulebook</span>
                  </div>
                </div>

                {/* Fast Action */}
                <Link
                  to="/workspace"
                  className="w-full py-2 rounded bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-semibold text-center block transition-colors"
                >
                  Launch Workspace Sandbox →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
