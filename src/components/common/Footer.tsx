import React from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  FileText,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#0B1B3D] text-slate-300 font-sans text-xs relative">
      {/* Indian Tricolor Stripe */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"></div>
      {/* Upper Footer: Official Links & Contact */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Identity */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded bg-white text-[#0E2A5C] flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5 text-[#0E2A5C]" />
              </div>
              <div>
                <span className="text-base font-bold text-white tracking-tight font-serif block">
                  SOVEREIGN
                </span>
                <span className="text-[10px] text-orange-400 uppercase font-semibold tracking-wider block -mt-1">
                  AI WORKSPACE
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Air-gapped on-premise artificial intelligence platform engineered for Indian Government ministries, public sector enterprises, and defense organizations.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-950 border border-blue-800 text-emerald-400 text-[11px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                National Enclave Active
              </span>
            </div>
          </div>

          {/* Quick Access Portal Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3 font-serif">
              Portal Services
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link to="/login/employee" className="hover:text-amber-400 transition-colors">Employee Portal</Link></li>
              <li><Link to="/login/admin" className="hover:text-amber-400 transition-colors">Admin Control Center</Link></li>
              <li><Link to="/workspace" className="hover:text-amber-400 transition-colors">Workspace Sandbox</Link></li>
              <li><Link to="/documents" className="hover:text-amber-400 transition-colors">Document OCR Vault</Link></li>
              <li><Link to="/knowledge" className="hover:text-amber-400 transition-colors">Organizational Knowledge</Link></li>
            </ul>
          </div>

          {/* Compliance & Standards */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3 font-serif">
              Standards & Security
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>Bureau of Indian Standards (BIS)</li>
              <li>CERT-In Security Framework</li>
              <li>100% On-Premise GPU Enclave</li>
              <li>Hardware Cryptographic HSM</li>
              <li>Tamper-Proof Audit Ledger</li>
            </ul>
          </div>

          {/* Contact / Official Desk */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3 font-serif">
              Nodal Contact
            </h4>
            <div className="space-y-2.5 text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>National Supercomputing Complex, Institutional Area, New Delhi, India</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>sovereign-desk@nic.in (Simulated)</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>Toll-Free Helpline: 1800-11-SOV-AI</span>
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Strip: Disclaimer & Copyright */}
      <div className="bg-[#07132C] py-4 px-4 border-t border-blue-900/60 text-slate-400 text-[11px]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div>
            © 2026 Sovereign AI Workspace. Prototype design inspired by modern Indian Government digital infrastructure.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-500">Air-Gapped & Auditable</span>
            <span>•</span>
            <span className="text-emerald-400">Strictly Internal Network</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
