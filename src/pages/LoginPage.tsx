import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { ShieldCheck, User, ArrowRight, Lock, Home } from 'lucide-react';
import { useAuth, DEMO_PROFILES, UserRoleType } from '../context/AuthContext';

interface LoginPageProps {
  initialRole?: UserRoleType;
}

export const LoginPage: React.FC<LoginPageProps> = ({ initialRole = 'employee' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [role, setRole] = useState<UserRoleType>(() => {
    if (location.pathname.includes('/admin')) return 'admin';
    if (location.pathname.includes('/employee')) return 'employee';
    return initialRole;
  });

  const [emailOrId, setEmailOrId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const availableProfiles = DEMO_PROFILES.filter((p) => p.roleType === role);

  const handleSignIn = (profileId?: string) => {
    setIsLoggingIn(true);
    setTimeout(() => {
      const selectedId = profileId || availableProfiles[0]?.id || (role === 'admin' ? 'admin-01' : 'emp-01');
      login(selectedId);
      setIsLoggingIn(false);
      navigate(role === 'admin' ? '/admin' : '/workspace');
    }, 450);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col justify-between font-sans">

      {/* Top bar */}
      <div className="border-b border-white/5 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm font-semibold text-white/70">Sovereign AI</span>
          <Link to="/" className="text-white/30 hover:text-white/60 flex items-center gap-1 text-xs transition-colors">
            <Home className="w-3 h-3" />
            <span>Home</span>
          </Link>
        </div>
      </div>

      {/* Login Card */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-[#1A1A1A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

          {/* Card Header */}
          <div className="p-8 pb-6 text-center border-b border-white/5">
            <div className="w-12 h-12 mx-auto rounded-xl bg-[#EE7027]/10 border border-[#EE7027]/20 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-[#EE7027]" />
            </div>
            <h1 className="text-xl font-bold text-white">Sign in</h1>
            <p className="text-xs text-white/40 mt-1">Sovereign AI Workspace</p>
          </div>

          {/* Role Tabs */}
          <div className="grid grid-cols-2 border-b border-white/5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setRole('employee')}
              className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
                role === 'employee'
                  ? 'border-[#EE7027] text-white bg-white/5'
                  : 'border-transparent text-white/30 hover:text-white/60'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Employee</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
                role === 'admin'
                  ? 'border-[#EE7027] text-white bg-white/5'
                  : 'border-transparent text-white/30 hover:text-white/60'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>

          <div className="p-6 space-y-4">
            {/* Quick profiles */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-white/30 uppercase tracking-wider font-semibold">Quick sign in</span>
              <div className="space-y-1">
                {availableProfiles.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSignIn(p.id)}
                    disabled={isLoggingIn}
                    className="w-full px-3 py-2 rounded-lg bg-[#111] border border-white/5 hover:border-white/15 hover:bg-white/5 text-left flex items-center justify-between text-xs transition-all group"
                  >
                    <div>
                      <span className="font-semibold text-white/80 group-hover:text-white block">{p.name}</span>
                      <span className="text-[10px] text-white/30">{p.role}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-[#EE7027] transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-[10px] text-white/20">or</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            {/* Form */}
            <form onSubmit={(e) => { e.preventDefault(); handleSignIn(); }} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1">Email / ID</label>
                <input
                  type="text"
                  value={emailOrId}
                  onChange={(e) => setEmailOrId(e.target.value)}
                  placeholder={role === 'admin' ? 'admin@sovereign.local' : 'user@sovereign.local'}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#111] border border-white/10 text-white text-xs placeholder-white/20 focus:outline-none focus:border-[#EE7027]/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 rounded-lg bg-[#111] border border-white/10 text-white text-xs placeholder-white/20 focus:outline-none focus:border-[#EE7027]/50 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-2.5 rounded-xl bg-[#EE7027] hover:bg-[#D65F18] text-white font-semibold text-xs transition-colors shadow-lg shadow-[#EE7027]/20 mt-1"
              >
                {isLoggingIn ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="p-4 text-center text-[11px] text-white/20">
        © 2026 Sovereign AI Workspace
      </footer>
    </div>
  );
};

export default LoginPage;
