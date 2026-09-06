import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  User, 
  ArrowRight, 
  Fingerprint, 
  Sun, 
  Moon,
  Home,
  Shield,
  Briefcase,
  Terminal,
  Lock
} from 'lucide-react';
import { useAuth, DEMO_PROFILES, UserRoleType } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [roleTab, setRoleTab] = useState<UserRoleType>('admin');
  const [operatorId, setOperatorId] = useState('');
  const [passkey, setPasskey] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const filteredProfiles = DEMO_PROFILES.filter((p) => p.roleType === roleTab);

  const handleLogin = (profileId: string) => {
    setIsVerifying(true);
    setTimeout(() => {
      login(profileId);
      setIsVerifying(false);
      navigate('/workspace');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#FFFFFF] text-[#EDEDED] dark:text-[#EDEDED] light:text-[#171717] flex flex-col justify-between relative overflow-hidden transition-colors font-sans antialiased">
      {/* Top Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] max-w-5xl mx-auto w-full font-mono text-xs">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-bold text-white dark:text-white light:text-black uppercase tracking-tight text-sm">
            SOVEREIGN
          </span>
          <span className="text-[#F97316]">// auth</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#141414] dark:bg-[#141414] light:bg-[#F5F5F5] text-[#A3A3A3] hover:text-white dark:hover:text-white light:hover:text-black transition-colors"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
          </button>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#141414] dark:bg-[#141414] light:bg-[#F5F5F5] text-xs text-[#A3A3A3] hover:text-white dark:hover:text-white light:hover:text-black transition-colors"
          >
            <Home className="w-3 h-3" />
            <span>Landing</span>
          </Link>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4 my-8">
        <div className="w-full max-w-md rounded-xl border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#141414] dark:bg-[#141414] light:bg-[#FFFFFF] p-6 sm:p-8 shadow-sm space-y-6">
          {/* Header */}
          <div className="text-left space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373]">
              <Terminal className="w-3.5 h-3.5 text-[#F97316]" />
              <span>// OPERATOR CLEARANCE</span>
            </div>
            <h1 className="text-2xl font-bold text-white dark:text-white light:text-[#171717] tracking-tight">
              Sign In to Enclave
            </h1>
            <p className="text-xs text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373] font-mono">
              Role-based hardware access for air-gapped workloads
            </p>
          </div>

          {/* Role Switcher: Admin vs Employee */}
          <div className="p-1 rounded-lg bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F5F5F5] border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] grid grid-cols-2 gap-1 font-mono text-xs">
            <button
              type="button"
              onClick={() => setRoleTab('admin')}
              className={`flex items-center justify-center gap-2 py-2 rounded font-medium transition-all ${
                roleTab === 'admin'
                  ? 'bg-white dark:bg-white light:bg-[#171717] text-black dark:text-black light:text-white shadow-sm font-semibold'
                  : 'text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373] hover:text-white dark:hover:text-white light:hover:text-black'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-[#F97316]" />
              <span>Administrator</span>
            </button>
            <button
              type="button"
              onClick={() => setRoleTab('employee')}
              className={`flex items-center justify-center gap-2 py-2 rounded font-medium transition-all ${
                roleTab === 'employee'
                  ? 'bg-white dark:bg-white light:bg-[#171717] text-black dark:text-black light:text-white shadow-sm font-semibold'
                  : 'text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373] hover:text-white dark:hover:text-white light:hover:text-black'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-blue-400" />
              <span>Employee / Staff</span>
            </button>
          </div>

          {/* Role Profiles List */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-[#737373] uppercase tracking-wider block">
              // Select {roleTab === 'admin' ? 'Administrator' : 'Employee'} Profile:
            </span>
            <div className="space-y-2">
              {filteredProfiles.map((prof) => (
                <button
                  key={prof.id}
                  onClick={() => handleLogin(prof.id)}
                  disabled={isVerifying}
                  className="w-full p-3 rounded-lg border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-[#FAFAFA] hover:border-[#525252] transition-colors flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded border border-[#333333] dark:border-[#333333] light:border-[#D4D4D4] bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-white flex items-center justify-center font-mono font-bold text-xs text-white dark:text-white light:text-black">
                      {prof.avatarInitials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white dark:text-white light:text-[#171717]">
                          {prof.name}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#262626] dark:bg-[#262626] light:bg-[#E5E5E5] text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252]">
                          {prof.clearanceLevel.split('//')[0].trim()}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373] font-mono block">
                        {prof.role}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#737373] group-hover:text-white dark:group-hover:text-white light:group-hover:text-black transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 font-mono text-[10px] text-[#737373]">
            <div className="h-px bg-[#262626] dark:bg-[#262626] light:bg-[#E5E5E5] flex-1" />
            <span>OR LOCAL PASSKEY</span>
            <div className="h-px bg-[#262626] dark:bg-[#262626] light:bg-[#E5E5E5] flex-1" />
          </div>

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(filteredProfiles[0]?.id || 'admin-01'); }} className="space-y-3 font-mono text-xs">
            <div>
              <label className="text-[10px] text-[#737373] uppercase tracking-wider block mb-1">
                Operator ID
              </label>
              <input
                type="text"
                value={operatorId}
                onChange={(e) => setOperatorId(e.target.value)}
                placeholder={roleTab === 'admin' ? 'admin@sovereign.local' : 'employee@sovereign.local'}
                className="w-full px-3 py-2 rounded bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F9F9F9] border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] text-xs text-white dark:text-white light:text-black placeholder-[#737373] focus:outline-none focus:border-[#525252]"
              />
            </div>

            <div>
              <label className="text-[10px] text-[#737373] uppercase tracking-wider block mb-1">
                Hardware Enclave PIN
              </label>
              <input
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2 rounded bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F9F9F9] border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] text-xs text-white dark:text-white light:text-black placeholder-[#737373] focus:outline-none focus:border-[#525252]"
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-2.5 rounded bg-white dark:bg-white light:bg-[#171717] text-black dark:text-black light:text-white font-semibold text-xs transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
            >
              <span>{isVerifying ? 'Verifying Enclave Token...' : `Sign In as ${roleTab === 'admin' ? 'Admin' : 'Employee'}`}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Footer note */}
          <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-[#737373]">
            <span className="flex items-center gap-1 text-emerald-400 dark:text-emerald-400 light:text-emerald-700">
              <ShieldCheck className="w-3 h-3" />
              Air-Gapped HSM Verified
            </span>
            <span>0 External Calls</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-xs font-mono text-[#737373] border-t border-[#262626] dark:border-[#262626] light:border-[#E5E5E5]">
        © 2026 SOVEREIGN AI WORKSPACE · STRICTLY ON-PREMISES ENCLAVE
      </footer>
    </div>
  );
};
