import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  ArrowRight, 
  LogOut, 
  Fingerprint, 
  Terminal,
  Shield,
  Briefcase
} from 'lucide-react';
import { useAuth, DEMO_PROFILES, UserRoleType } from '../../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { user, isAuthenticated, login, logout, switchProfile, isAuthModalOpen, closeAuthModal } = useAuth();
  const [roleTab, setRoleTab] = useState<UserRoleType>('admin');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isAuthModalOpen) return null;

  const filteredProfiles = DEMO_PROFILES.filter((p) => p.roleType === roleTab);

  const handleSelectProfile = (profileId: string) => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      switchProfile(profileId);
      closeAuthModal();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-md rounded-xl bg-[#141414] dark:bg-[#141414] light:bg-[#FFFFFF] border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] shadow-2xl overflow-hidden font-mono text-xs text-[#EDEDED] dark:text-[#EDEDED] light:text-[#171717]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#F97316]" />
            <span className="font-bold text-white dark:text-white light:text-black uppercase">
              // Enclave Authentication
            </span>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1 rounded text-[#737373] hover:text-white dark:hover:text-white light:hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Active User Banner */}
        {isAuthenticated && user && (
          <div className="p-4 bg-[#1C1C1C] dark:bg-[#1C1C1C] light:bg-[#FAFAFA] border-b border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#737373] block uppercase">// Currently Active:</span>
              <span className="font-bold text-white dark:text-white light:text-black">{user.name}</span>
              <span className="text-[10px] text-[#F97316] block">{user.role} ({user.roleType.toUpperCase()})</span>
            </div>
            <button
              onClick={() => {
                logout();
                closeAuthModal();
              }}
              className="px-2.5 py-1 rounded border border-[#333333] dark:border-[#333333] light:border-[#D4D4D4] text-[11px] text-[#A3A3A3] hover:text-red-400 hover:border-red-500/40 transition-colors flex items-center gap-1"
            >
              <LogOut className="w-3 h-3" />
              <span>Log Out</span>
            </button>
          </div>
        )}

        {/* Admin vs Employee Selector */}
        <div className="p-4 space-y-3">
          <div className="p-1 rounded bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F5F5F5] border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => setRoleTab('admin')}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded font-medium transition-all ${
                roleTab === 'admin'
                  ? 'bg-white dark:bg-white light:bg-[#171717] text-black dark:text-black light:text-white font-semibold'
                  : 'text-[#737373] hover:text-white dark:hover:text-white light:hover:text-black'
              }`}
            >
              <Shield className="w-3 h-3 text-[#F97316]" />
              <span>Admin Roles</span>
            </button>
            <button
              type="button"
              onClick={() => setRoleTab('employee')}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded font-medium transition-all ${
                roleTab === 'employee'
                  ? 'bg-white dark:bg-white light:bg-[#171717] text-black dark:text-black light:text-white font-semibold'
                  : 'text-[#737373] hover:text-white dark:hover:text-white light:hover:text-black'
              }`}
            >
              <Briefcase className="w-3 h-3 text-blue-400" />
              <span>Employee Roles</span>
            </button>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] text-[#737373] uppercase tracking-wider block">
              // Switch to {roleTab === 'admin' ? 'Administrator' : 'Employee'}:
            </span>
            <div className="space-y-1.5">
              {filteredProfiles.map((prof) => {
                const isActive = user?.id === prof.id;
                return (
                  <button
                    key={prof.id}
                    onClick={() => handleSelectProfile(prof.id)}
                    className={`w-full p-2.5 rounded border transition-colors flex items-center justify-between text-left ${
                      isActive
                        ? 'border-[#F97316] bg-[#1E1E1E] dark:bg-[#1E1E1E] light:bg-[#FFF7ED]'
                        : 'border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#141414] dark:bg-[#141414] light:bg-[#FAFAFA] hover:border-[#525252]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white dark:text-white light:text-black">{prof.name}</span>
                        <span className="text-[9px] px-1 rounded bg-[#262626] dark:bg-[#262626] light:bg-[#E5E5E5] text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252]">
                          {prof.clearanceLevel.split('//')[0].trim()}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#737373] block">{prof.role}</span>
                    </div>

                    {isActive ? (
                      <span className="text-[10px] text-[#F97316] font-semibold">ACTIVE</span>
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-[#737373]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F5F5F5] border-t border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] flex items-center justify-between text-[10px] text-[#737373]">
          <span className="flex items-center gap-1 text-emerald-400 dark:text-emerald-400 light:text-emerald-700">
            <ShieldCheck className="w-3 h-3" />
            Air-Gap HSM Enclave
          </span>
          <span>0 External Calls</span>
        </div>
      </div>
    </div>
  );
};
