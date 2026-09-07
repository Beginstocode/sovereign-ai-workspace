import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Users, Bot, FileText, Cpu, Activity, HardDrive, Lock,
  CheckCircle2, AlertTriangle, Search, Download, Server,
  Database, Clock, RefreshCw, Settings, LogOut, Plus,
  Trash2, Eye, EyeOff, Edit2, ToggleLeft, ToggleRight,
  ChevronDown, ChevronUp, X, Save, ShieldCheck, Zap, BarChart2,
  ArrowUp, ArrowDown
} from 'lucide-react';

/* ─── Static Data ─── */
type EmployeeStatus = 'Active' | 'Offline' | 'Suspended';

interface Employee {
  id: string; name: string; designation: string;
  department: string; clearance: string;
  status: EmployeeStatus; sessions: number; lastLogin: string;
}

const INIT_EMPLOYEES: Employee[] = [
  { id: 'EMP-0001', name: 'Egzai', designation: 'Chief Infrastructure Administrator', department: 'Enterprise Security & AI', clearance: 'Level 5', status: 'Active', sessions: 2, lastLogin: 'Just now' },
  { id: 'EMP-0002', name: 'Prem', designation: 'Lead Security Officer', department: 'Core Infrastructure', clearance: 'Level 5', status: 'Active', sessions: 1, lastLogin: '5 mins ago' },
  { id: 'EMP-0003', name: 'Satyam', designation: 'Senior Operations Engineer', department: 'Operations & Engineering', clearance: 'Level 3', status: 'Active', sessions: 1, lastLogin: '20 mins ago' },
  { id: 'EMP-0004', name: 'Shreyansh', designation: 'Lead Analyst & Procurement', department: 'Strategic Sourcing & Finance', clearance: 'Level 3', status: 'Active', sessions: 1, lastLogin: '1 hour ago' },
  { id: 'EMP-0005', name: 'Rohit Kumar', designation: 'Systems Administrator', department: 'IT Infrastructure', clearance: 'Level 4', status: 'Offline', sessions: 0, lastLogin: 'Yesterday' },
  { id: 'EMP-0006', name: 'Priya Singh', designation: 'QA Analyst', department: 'Quality Assurance', clearance: 'Level 2', status: 'Active', sessions: 1, lastLogin: '2 hours ago' },
];

const AGENTS = [
  { name: 'Document Assistant', model: 'Llama 3.3 70B', vram: '18 GB', tasks: 1240, status: true },
  { name: 'Engineering Assistant', model: 'DeepSeek R1', vram: '24 GB', tasks: 890, status: true },
  { name: 'Data Analyst', model: 'Qwen 2.5 72B', vram: '20 GB', tasks: 560, status: true },
  { name: 'Software Engineer', model: 'DeepSeek Coder V2', vram: '16 GB', tasks: 430, status: true },
  { name: 'Inspection Assistant', model: 'Qwen Vision 72B', vram: '22 GB', tasks: 310, status: false },
  { name: 'Finance Analyst', model: 'Llama 3.3 70B', vram: '18 GB', tasks: 280, status: true },
  { name: 'HR Assistant', model: 'Mistral Large 2', vram: '14 GB', tasks: 110, status: true },
  { name: 'Presentation Builder', model: 'Llama 3.3 70B', vram: '12 GB', tasks: 92, status: false },
];

const MODELS = [
  { name: 'DeepSeek R1', quant: 'Q4_K_M', vram: '24.2 GB', context: '64k', speed: '32 t/s', gpu: 'GPU #0', loaded: true },
  { name: 'Llama 3.3 70B', quant: 'Q5_K_M', vram: '22.8 GB', context: '128k', speed: '28 t/s', gpu: 'GPU #1', loaded: true },
  { name: 'Qwen 2.5 72B', quant: 'EXL2 4.5bpw', vram: '21.0 GB', context: '32k', speed: '36 t/s', gpu: 'GPU #2', loaded: true },
  { name: 'Qwen VL 72B', quant: 'AWQ 4-bit', vram: '23.4 GB', context: '16k', speed: '22 t/s', gpu: 'GPU #3', loaded: false },
];

const KNOWLEDGE = [
  { name: 'Engineering Standards & SOPs', code: 'KB-ENG-01', docs: 480, chunks: '42k', access: 'Level 2+', sync: 'Today 04:30', active: true },
  { name: 'Procurement & Finance Rules', code: 'KB-FIN-02', docs: 210, chunks: '18.5k', access: 'Level 2+', sync: 'Yesterday', active: true },
  { name: 'Vigilance & Compliance Manuals', code: 'KB-VIG-03', docs: 95, chunks: '9.2k', access: 'Level 3+', sync: '3 days ago', active: true },
  { name: 'Standard Operating Procedures', code: 'KB-OPS-04', docs: 540, chunks: '68.4k', access: 'Level 2+', sync: 'Today 01:15', active: true },
  { name: 'Service & Conduct Rules', code: 'KB-HR-05', docs: 155, chunks: '14.1k', access: 'Level 1+', sync: '1 week ago', active: false },
];

const AUDIT_LOG = [
  { time: '00:14:22', user: 'Egzai', action: 'Admin Login', resource: 'Admin Console', level: 'info' },
  { time: '00:12:05', user: 'Satyam', action: 'Agent Dispatch', resource: 'Document Assistant', level: 'info' },
  { time: '00:09:33', user: 'Shreyansh', action: 'File Upload', resource: 'Knowledge Base KB-FIN-02', level: 'info' },
  { time: '00:08:10', user: 'System', action: 'Model Loaded', resource: 'DeepSeek R1 → GPU #0', level: 'success' },
  { time: '00:05:44', user: 'Prem', action: 'Security Scan', resource: 'All Endpoints', level: 'success' },
  { time: '23:58:02', user: 'System', action: 'Knowledge Sync', resource: 'KB-ENG-01', level: 'info' },
  { time: '23:50:11', user: 'Rohit Kumar', action: 'Login Attempt Failed', resource: 'Auth Gate', level: 'warn' },
  { time: '23:45:19', user: 'Priya Singh', action: 'Document Export', resource: 'QA Report #2024', level: 'info' },
];

/* ─── Subcomponents ─── */
const Badge = ({ children, color }: { children: React.ReactNode; color: string }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${color}`}>
    {children}
  </span>
);

const StatCard = ({ icon: Icon, label, value, sub, color }: any) => (
  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
    <div className="flex items-start justify-between mb-3">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
    </div>
    <div className="text-2xl font-bold text-slate-900">{value}</div>
    <div className="text-xs font-medium text-slate-500 mt-0.5">{label}</div>
    {sub && <div className="text-[10px] text-slate-400 mt-1">{sub}</div>}
  </div>
);

/* ─── Main Component ─── */
export const AdminPortalPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  type Tab = 'overview' | 'employees' | 'agents' | 'models' | 'knowledge' | 'audit' | 'settings';
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [employees, setEmployees] = useState<Employee[]>(INIT_EMPLOYEES);
  const [agents, setAgents] = useState(AGENTS);
  const [models, setModels] = useState(MODELS);
  const [knowledge, setKnowledge] = useState(KNOWLEDGE);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [newEmpName, setNewEmpName] = useState('');
  const [newEmpRole, setNewEmpRole] = useState('');
  const [newEmpDept, setNewEmpDept] = useState('');
  const [gpuLoad] = useState(28);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'employees', label: 'Users', icon: Users },
    { id: 'agents', label: 'AI Agents', icon: Bot },
    { id: 'models', label: 'Models', icon: Cpu },
    { id: 'knowledge', label: 'Knowledge', icon: Database },
    { id: 'audit', label: 'Audit Log', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const filteredEmployees = useMemo(() =>
    employees.filter(e =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.designation.toLowerCase().includes(searchQuery.toLowerCase())
    ), [employees, searchQuery]);

  const toggleEmployeeStatus = (id: string) => {
    setEmployees(prev => prev.map(e =>
      e.id === id
        ? { ...e, status: e.status === 'Active' ? 'Suspended' : 'Active' }
        : e
    ));
  };

  const deleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
    setSelectedEmployee(null);
  };

  const addEmployee = () => {
    if (!newEmpName.trim()) return;
    const newEmp: Employee = {
      id: `EMP-${String(employees.length + 100).padStart(4, '0')}`,
      name: newEmpName,
      designation: newEmpRole || 'Staff',
      department: newEmpDept || 'General',
      clearance: 'Level 1',
      status: 'Active',
      sessions: 0,
      lastLogin: 'Never',
    };
    setEmployees(prev => [newEmp, ...prev]);
    setNewEmpName(''); setNewEmpRole(''); setNewEmpDept('');
    setIsAddingEmployee(false);
  };

  const toggleAgent = (idx: number) => {
    setAgents(prev => prev.map((a, i) => i === idx ? { ...a, status: !a.status } : a));
  };

  const toggleModel = (idx: number) => {
    setModels(prev => prev.map((m, i) => i === idx ? { ...m, loaded: !m.loaded } : m));
  };

  const toggleKnowledge = (idx: number) => {
    setKnowledge(prev => prev.map((k, i) => i === idx ? { ...k, active: !k.active } : k));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1200);
  };

  const activeAgents = agents.filter(a => a.status).length;
  const activeEmp = employees.filter(e => e.status === 'Active').length;
  const loadedModels = models.filter(m => m.loaded).length;
  const activeKB = knowledge.filter(k => k.active).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0E2A5C] flex items-center justify-center text-sm">🏛️</div>
            <div>
              <span className="font-bold text-slate-900 text-sm">Admin Console</span>
              <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold border border-emerald-200">LIVE</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleRefresh} className={`p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all ${isRefreshing ? 'animate-spin text-[#0E2A5C]' : ''}`}>
              <RefreshCw className="w-4 h-4" />
            </button>
            <div className="text-xs text-slate-500 hidden sm:block">
              Signed in as <span className="font-semibold text-slate-800">{user?.name || 'Admin'}</span>
            </div>
            <Link to="/workspace" className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors">
              Workspace →
            </Link>
            <button onClick={logout} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 transition-colors" title="Logout">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Tab Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-14 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto scrollbar-none">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#EE7027] text-[#0E2A5C]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">

        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">System Overview</h2>
              <p className="text-xs text-slate-500">Real-time status of your Sovereign AI deployment.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard icon={Users} label="Active Users" value={activeEmp} sub={`of ${employees.length} total`} color="bg-blue-50 text-blue-600" />
              <StatCard icon={Bot} label="Active Agents" value={activeAgents} sub={`of ${agents.length} deployed`} color="bg-[#EE7027]/10 text-[#EE7027]" />
              <StatCard icon={Cpu} label="Models Loaded" value={loadedModels} sub={`${gpuLoad}% GPU load`} color="bg-purple-50 text-purple-600" />
              <StatCard icon={Database} label="Knowledge Bases" value={activeKB} sub={`of ${knowledge.length} total`} color="bg-emerald-50 text-emerald-600" />
            </div>

            {/* System Health */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* GPU Monitor */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2"><Cpu className="w-4 h-4 text-purple-500" /> GPU Cluster</h3>
                  <Badge color="bg-emerald-100 text-emerald-700">All Online</Badge>
                </div>
                <div className="space-y-3">
                  {models.map((m, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-700 font-medium">{m.gpu} — {m.name}</span>
                        <span className="text-slate-500">{m.vram}</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${m.loaded ? 'bg-purple-400' : 'bg-slate-200'}`}
                          style={{ width: m.loaded ? `${60 + i * 8}%` : '5%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-500" /> Recent Activity
                </h3>
                <div className="space-y-2.5">
                  {AUDIT_LOG.slice(0, 5).map((log, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs">
                      <span className="text-slate-400 font-mono w-16 flex-shrink-0">{log.time}</span>
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${log.level === 'warn' ? 'bg-amber-400' : log.level === 'success' ? 'bg-emerald-400' : 'bg-blue-400'}`} />
                      <span className="text-slate-800 font-medium truncate">{log.action}</span>
                      <span className="text-slate-400 truncate hidden sm:block">— {log.user}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setActiveTab('audit')} className="mt-3 text-xs text-[#EE7027] hover:underline font-medium">
                  View full audit log →
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Add User', icon: Plus, tab: 'employees' as Tab },
                  { label: 'Manage Agents', icon: Bot, tab: 'agents' as Tab },
                  { label: 'Load Model', icon: Cpu, tab: 'models' as Tab },
                  { label: 'Sync Knowledge', icon: Database, tab: 'knowledge' as Tab },
                  { label: 'View Logs', icon: Activity, tab: 'audit' as Tab },
                ].map(({ label, icon: Icon, tab }) => (
                  <button key={label} onClick={() => setActiveTab(tab)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 hover:border-[#0E2A5C] hover:bg-blue-50 text-xs font-medium text-slate-700 hover:text-[#0E2A5C] transition-all">
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── EMPLOYEES / USERS ── */}
        {activeTab === 'employees' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Users</h2>
                <p className="text-xs text-slate-500">{activeEmp} active · {employees.length} total</p>
              </div>
              <button onClick={() => setIsAddingEmployee(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0E2A5C] text-white text-xs font-semibold hover:bg-[#13397B] transition-colors shadow-sm">
                <Plus className="w-3.5 h-3.5" /> Add User
              </button>
            </div>

            {/* Add User Form */}
            {isAddingEmployee && (
              <div className="bg-white border border-[#0E2A5C]/20 rounded-xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold text-slate-900">New User</h3>
                  <button onClick={() => setIsAddingEmployee(false)} className="text-slate-400 hover:text-slate-700"><X className="w-4 h-4" /></button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input value={newEmpName} onChange={e => setNewEmpName(e.target.value)} placeholder="Full Name *"
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0E2A5C] text-slate-800" />
                  <input value={newEmpRole} onChange={e => setNewEmpRole(e.target.value)} placeholder="Designation"
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0E2A5C] text-slate-800" />
                  <input value={newEmpDept} onChange={e => setNewEmpDept(e.target.value)} placeholder="Department"
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0E2A5C] text-slate-800" />
                </div>
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setIsAddingEmployee(false)} className="px-4 py-2 rounded-lg border border-slate-200 text-xs text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                  <button onClick={addEmployee} className="px-4 py-2 rounded-lg bg-[#EE7027] text-white text-xs font-semibold hover:bg-[#D65F18] transition-colors flex items-center gap-1.5">
                    <Save className="w-3.5 h-3.5" /> Save
                  </button>
                </div>
              </div>
            )}

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search users..."
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-xs focus:outline-none focus:border-[#0E2A5C] text-slate-800 shadow-sm" />
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {['ID', 'Name', 'Department', 'Clearance', 'Status', 'Last Login', 'Actions'].map(h => (
                      <th key={h} className="text-left py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEmployees.map(emp => (
                    <tr key={emp.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="py-3 px-4 font-mono text-slate-400">{emp.id}</td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800">{emp.name}</div>
                        <div className="text-slate-400 truncate max-w-[160px]">{emp.designation}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{emp.department}</td>
                      <td className="py-3 px-4">
                        <Badge color={emp.clearance.includes('5') ? 'bg-red-100 text-red-700' : emp.clearance.includes('4') ? 'bg-amber-100 text-amber-700' : emp.clearance.includes('3') ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}>
                          {emp.clearance}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge color={emp.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : emp.status === 'Suspended' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'}>
                          {emp.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-slate-500">{emp.lastLogin}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => toggleEmployeeStatus(emp.id)}
                            className={`p-1.5 rounded-lg transition-colors ${emp.status === 'Active' ? 'text-emerald-600 hover:bg-emerald-50' : 'text-red-500 hover:bg-red-50'}`}
                            title={emp.status === 'Active' ? 'Suspend' : 'Activate'}>
                            {emp.status === 'Active' ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                          </button>
                          <button onClick={() => setSelectedEmployee(emp)}
                            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors" title="View">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteEmployee(emp.id)}
                            className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors" title="Remove">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredEmployees.length === 0 && (
                <div className="py-10 text-center text-slate-400 text-sm">No users found</div>
              )}
            </div>
          </div>
        )}

        {/* ── AGENTS ── */}
        {activeTab === 'agents' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">AI Agents</h2>
              <p className="text-xs text-slate-500">{activeAgents} running · {agents.length - activeAgents} stopped</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {agents.map((agent, idx) => (
                <div key={idx} className={`bg-white border rounded-xl p-4 shadow-sm transition-all ${agent.status ? 'border-slate-200' : 'border-slate-100 opacity-60'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${agent.status ? 'bg-[#EE7027]/10' : 'bg-slate-100'}`}>
                        <Bot className={`w-4 h-4 ${agent.status ? 'text-[#EE7027]' : 'text-slate-400'}`} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{agent.name}</div>
                        <div className="text-[10px] text-slate-500">{agent.model}</div>
                      </div>
                    </div>
                    <button onClick={() => toggleAgent(idx)}
                      className={`relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent transition-colors cursor-pointer ${agent.status ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                      <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform ${agent.status ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-3 border-t border-slate-100">
                    <span>VRAM: <span className="font-semibold text-slate-700">{agent.vram}</span></span>
                    <span>{agent.tasks.toLocaleString()} tasks run</span>
                    <Badge color={agent.status ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}>
                      {agent.status ? 'Running' : 'Stopped'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── MODELS ── */}
        {activeTab === 'models' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Local AI Models</h2>
              <p className="text-xs text-slate-500">{loadedModels} loaded · GPU utilization {gpuLoad}%</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {['Model', 'Quantization', 'VRAM', 'Context', 'Speed', 'GPU', 'Status', ''].map(h => (
                      <th key={h} className="text-left py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {models.map((m, idx) => (
                    <tr key={idx} className={`transition-colors hover:bg-slate-50 ${!m.loaded ? 'opacity-50' : ''}`}>
                      <td className="py-3 px-4 font-semibold text-slate-800">{m.name}</td>
                      <td className="py-3 px-4 font-mono text-slate-500">{m.quant}</td>
                      <td className="py-3 px-4 text-slate-600">{m.vram}</td>
                      <td className="py-3 px-4 text-slate-600">{m.context}</td>
                      <td className="py-3 px-4 text-slate-600">{m.speed}</td>
                      <td className="py-3 px-4 text-slate-600 font-mono">{m.gpu}</td>
                      <td className="py-3 px-4">
                        <Badge color={m.loaded ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}>
                          {m.loaded ? 'Loaded' : 'Unloaded'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <button onClick={() => toggleModel(idx)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-colors ${
                            m.loaded ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                          }`}>
                          {m.loaded ? 'Unload' : 'Load'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── KNOWLEDGE ── */}
        {activeTab === 'knowledge' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Knowledge Bases</h2>
              <p className="text-xs text-slate-500">{activeKB} active repositories</p>
            </div>
            <div className="space-y-3">
              {knowledge.map((kb, idx) => (
                <div key={idx} className={`bg-white border rounded-xl p-4 shadow-sm flex items-center justify-between gap-4 transition-all ${kb.active ? 'border-slate-200' : 'border-slate-100 opacity-60'}`}>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${kb.active ? 'bg-emerald-50' : 'bg-slate-100'}`}>
                      <Database className={`w-4 h-4 ${kb.active ? 'text-emerald-600' : 'text-slate-400'}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-slate-800 truncate">{kb.name}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {kb.docs} docs · {kb.chunks} chunks · Access: {kb.access} · Last sync: {kb.sync}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-[10px] font-mono text-slate-400 hidden sm:block">{kb.code}</span>
                    <button onClick={() => toggleKnowledge(idx)}
                      className={`relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent transition-colors cursor-pointer ${kb.active ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                      <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform ${kb.active ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── AUDIT LOG ── */}
        {activeTab === 'audit' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Audit Log</h2>
                <p className="text-xs text-slate-500">All system events — tamper-proof local ledger</p>
              </div>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                <Download className="w-3.5 h-3.5" /> Export CSV
              </button>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {['Time', 'User', 'Action', 'Resource', 'Level'].map(h => (
                      <th key={h} className="text-left py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {AUDIT_LOG.map((log, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-4 font-mono text-slate-400">{log.time}</td>
                      <td className="py-2.5 px-4 font-semibold text-slate-700">{log.user}</td>
                      <td className="py-2.5 px-4 text-slate-800">{log.action}</td>
                      <td className="py-2.5 px-4 text-slate-500 truncate max-w-[200px]">{log.resource}</td>
                      <td className="py-2.5 px-4">
                        <Badge color={
                          log.level === 'warn' ? 'bg-amber-100 text-amber-700' :
                          log.level === 'success' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-blue-100 text-blue-700'
                        }>
                          {log.level}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── SETTINGS ── */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-lg font-bold text-slate-900">System Settings</h2>
              <p className="text-xs text-slate-500">Configure the Sovereign AI workspace.</p>
            </div>
            {[
              { label: 'Workspace Name', value: 'Sovereign AI Workspace', type: 'text' },
              { label: 'Admin Email', value: user?.email || 'admin@sovereign.local', type: 'email' },
              { label: 'Max Concurrent Sessions', value: '10', type: 'number' },
            ].map((setting, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <label className="block text-xs font-semibold text-slate-700 mb-2">{setting.label}</label>
                <input type={setting.type} defaultValue={setting.value}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-[#0E2A5C] transition-colors" />
              </div>
            ))}
            {[
              { label: 'Require 2-Factor Authentication', defaultOn: true },
              { label: 'Session Timeout (30 min)', defaultOn: true },
              { label: 'Audit All Agent Queries', defaultOn: true },
              { label: 'Auto-sync Knowledge Bases', defaultOn: false },
            ].map((toggle, i) => {
              const [on, setOn] = useState(toggle.defaultOn);
              return (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-800">{toggle.label}</span>
                  <button onClick={() => setOn(!on)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors cursor-pointer ${on ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                    <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform ${on ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              );
            })}
            <button className="px-6 py-2.5 rounded-xl bg-[#0E2A5C] text-white text-sm font-semibold hover:bg-[#13397B] transition-colors shadow-sm flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Settings
            </button>
          </div>
        )}
      </main>

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedEmployee(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0E2A5C] text-white flex items-center justify-center font-bold text-sm">
                  {selectedEmployee.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{selectedEmployee.name}</div>
                  <div className="text-xs text-slate-500">{selectedEmployee.id}</div>
                </div>
              </div>
              <button onClick={() => setSelectedEmployee(null)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-3 text-sm">
              {[
                ['Designation', selectedEmployee.designation],
                ['Department', selectedEmployee.department],
                ['Clearance', selectedEmployee.clearance],
                ['Status', selectedEmployee.status],
                ['Active Sessions', String(selectedEmployee.sessions)],
                ['Last Login', selectedEmployee.lastLogin],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-slate-500 text-xs">{label}</span>
                  <span className="font-medium text-slate-800 text-xs">{val}</span>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-100 flex gap-2 justify-end">
              <button onClick={() => toggleEmployeeStatus(selectedEmployee.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${selectedEmployee.status === 'Active' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}>
                {selectedEmployee.status === 'Active' ? 'Suspend User' : 'Activate User'}
              </button>
              <button onClick={() => deleteEmployee(selectedEmployee.id)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-colors">
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-white border-t border-slate-200 py-3 text-center text-[11px] text-slate-400">
        © 2026 Sovereign AI Workspace
      </footer>
    </div>
  );
};

export default AdminPortalPage;
