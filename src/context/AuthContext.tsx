import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRoleType = 'admin' | 'employee';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  roleType: UserRoleType;
  department: string;
  clearanceLevel: string;
  enclaveNode: string;
  avatarInitials: string;
  permissions: string[];
}

export const DEMO_PROFILES: UserProfile[] = [
  // Admin profiles
  {
    id: 'admin-01',
    name: 'Dr. Val Morrison',
    email: 'v.morrison@defense.sovereign.local',
    role: 'Chief Infrastructure Administrator',
    roleType: 'admin',
    department: 'Enterprise Security & GPU Enclave',
    clearanceLevel: 'LEVEL 5 // ROOT DIRECTIVE',
    enclaveNode: 'HSM-Enclave-Alpha',
    avatarInitials: 'VM',
    permissions: ['Full Root Access', 'Model Weight Quantization', 'Air-Gap Firewall Configuration', 'Vector Store Encryption']
  },
  {
    id: 'admin-02',
    name: 'Elena Rostova',
    email: 'e.rostova@systems.sovereign.local',
    role: 'Lead Security & Enclave Officer',
    roleType: 'admin',
    department: 'Core Infrastructure Security',
    clearanceLevel: 'LEVEL 5 // CRYPTO ROOT',
    enclaveNode: 'Dual-L40S-Node-01',
    avatarInitials: 'ER',
    permissions: ['Security Audit Logs', 'Hardware Key Lifecycle', 'Zero-Trust Gatekeeper', 'VRAM Allocation']
  },
  // Employee profiles
  {
    id: 'emp-01',
    name: 'Marcus Vance',
    email: 'm.vance@operations.sovereign.local',
    role: 'Senior Plant Operations Engineer',
    roleType: 'employee',
    department: 'Heavy Turbomachinery Operations',
    clearanceLevel: 'LEVEL 3 // CERTIFIED OPERATOR',
    enclaveNode: 'Turbine-Floor-04',
    avatarInitials: 'MV',
    permissions: ['Inspection Agent Dispatch', 'Document OCR Extraction', 'SOP Querying', 'Approval Note Generation']
  },
  {
    id: 'emp-02',
    name: 'Sarah Chen',
    email: 's.chen@finance.sovereign.local',
    role: 'Lead Quantitative Procurement Analyst',
    roleType: 'employee',
    department: 'Strategic Sourcing & Finance',
    clearanceLevel: 'LEVEL 3 // CONFIDENTIAL',
    enclaveNode: 'Finance-Vlan-02',
    avatarInitials: 'SC',
    permissions: ['Vendor Quotations Modeling', 'Telemetry Excel Processing', 'Presentation Deck Builder']
  }
];

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  activeRoleFilter: UserRoleType;
  setActiveRoleFilter: (role: UserRoleType) => void;
  login: (profileId?: string) => void;
  logout: () => void;
  switchProfile: (profileId: string) => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRoleFilter, setActiveRoleFilter] = useState<UserRoleType>('admin');

  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('sovereign_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEMO_PROFILES[0];
      }
    }
    return DEMO_PROFILES[0];
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('sovereign_auth_token');
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!localStorage.getItem('sovereign_auth_token')) {
      localStorage.setItem('sovereign_auth_token', 'local_jwt_token_airgap_verified');
      setIsAuthenticated(true);
    }
  }, []);

  const login = (profileId: string = 'admin-01') => {
    const found = DEMO_PROFILES.find((p) => p.id === profileId) || DEMO_PROFILES[0];
    setUser(found);
    setIsAuthenticated(true);
    localStorage.setItem('sovereign_auth_user', JSON.stringify(found));
    localStorage.setItem('sovereign_auth_token', 'local_jwt_token_airgap_verified');
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('sovereign_auth_user');
    localStorage.removeItem('sovereign_auth_token');
  };

  const switchProfile = (profileId: string) => {
    login(profileId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        activeRoleFilter,
        setActiveRoleFilter,
        login,
        logout,
        switchProfile,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
