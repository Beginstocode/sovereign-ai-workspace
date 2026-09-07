import React, { useState } from 'react';
import { WorkspaceLayout } from '../components/workspace/WorkspaceLayout';
import { AGENTS } from '../data/agents';
import { 
  Search, 
  RefreshCw,
  FileText,
  Lock,
  CheckCircle2,
  Database,
  Filter,
  Download,
  UploadCloud,
  ShieldCheck
} from 'lucide-react';

interface KnowledgeDoc {
  id: string;
  title: string;
  category: 'Engineering' | 'Maintenance' | 'Finance' | 'HR' | 'Procurement' | 'Policies' | 'Operations';
  filename: string;
  size: string;
  vectorChunks: number;
  lastUpdated: string;
  classification: 'Restricted' | 'Confidential' | 'Internal';
}

export const KnowledgePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [syncing, setSyncing] = useState(false);

  const categories = [
    'All',
    'Engineering',
    'Maintenance',
    'Finance',
    'HR',
    'Procurement',
    'Policies',
    'Operations'
  ];

  const officialDocuments: KnowledgeDoc[] = [
    {
      id: 'KB-ENG-01',
      title: 'Heavy Engineering Design & Safety Manual (Vol IV)',
      category: 'Engineering',
      filename: 'Engineering Manual.pdf',
      size: '14.2 MB',
      vectorChunks: 1420,
      lastUpdated: '05 Sep 2026',
      classification: 'Confidential'
    },
    {
      id: 'KB-MNT-02',
      title: 'Standard Operating Procedure for Gas & Steam Turbine Overhaul',
      category: 'Maintenance',
      filename: 'Maintenance SOP.pdf',
      size: '8.6 MB',
      vectorChunks: 890,
      lastUpdated: '01 Sep 2026',
      classification: 'Restricted'
    },
    {
      id: 'KB-PROC-03',
      title: 'Public Procurement Policy & General Financial Rules (GFR 2017)',
      category: 'Procurement',
      filename: 'Procurement Guidelines.pdf',
      size: '5.4 MB',
      vectorChunks: 640,
      lastUpdated: '28 Aug 2026',
      classification: 'Internal'
    },
    {
      id: 'KB-POL-04',
      title: 'Plant Safety Protocol, Hazardous Material Handling & Disaster SOP',
      category: 'Policies',
      filename: 'Safety Protocol.pdf',
      size: '4.8 MB',
      vectorChunks: 512,
      lastUpdated: '22 Aug 2026',
      classification: 'Restricted'
    },
    {
      id: 'KB-FIN-05',
      title: 'PSU Financial Powers Delegation & Capex Sanction Matrix',
      category: 'Finance',
      filename: 'Financial Delegation SOP.pdf',
      size: '3.9 MB',
      vectorChunks: 410,
      lastUpdated: '18 Aug 2026',
      classification: 'Confidential'
    },
    {
      id: 'KB-HR-06',
      title: 'Central Civil Services (CCS) Conduct & Disciplinary Rules 2024',
      category: 'HR',
      filename: 'Civil Services Conduct Manual.pdf',
      size: '7.1 MB',
      vectorChunks: 780,
      lastUpdated: '15 Aug 2026',
      classification: 'Internal'
    },
    {
      id: 'KB-OPS-07',
      title: 'Grid Synchronization & Regional Load Dispatch Directives',
      category: 'Operations',
      filename: 'Operations Grid Manual.pdf',
      size: '11.5 MB',
      vectorChunks: 1210,
      lastUpdated: '10 Aug 2026',
      classification: 'Confidential'
    },
    {
      id: 'KB-MNT-08',
      title: 'Substation Transformer Bushing Diagnostic & Oil Testing SOP',
      category: 'Maintenance',
      filename: 'Transformer Maintenance Guide.pdf',
      size: '6.2 MB',
      vectorChunks: 620,
      lastUpdated: '04 Aug 2026',
      classification: 'Restricted'
    },
  ];

  const handleReindex = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 1200);
  };

  const filtered = officialDocuments.filter((doc) => {
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch = 
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.filename.toLowerCase().includes(search.toLowerCase()) ||
      doc.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <WorkspaceLayout
      activeAgent={AGENTS[2]}
      onSelectAgent={() => {}}
      currentTaskTitle="Authorized Knowledge Repositories"
    >
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-6xl mx-auto w-full font-sans text-xs">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-[#0E2A5C] dark:text-blue-400">ORGANIZATIONAL KNOWLEDGE ENCLAVE</span>
              <span>•</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-medium">LOCAL QDRANT VECTOR STORE</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Authorized Knowledge Repositories
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Internal manuals, standard operating procedures, circulars, and financial rules indexed for air-gapped agent citation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReindex}
              disabled={syncing}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1A1A1A] text-slate-800 dark:text-white font-medium hover:bg-slate-50 transition-colors shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin text-[#0E2A5C] dark:text-orange-400' : 'text-slate-500'}`} />
              <span>{syncing ? 'Reindexing HNSW...' : 'Reindex Local Corpus'}</span>
            </button>
          </div>
        </div>

        {/* Search and Category Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search authoritative documents by title, file name, or department..."
              className="w-full bg-white dark:bg-[#1A1A1A] border border-slate-300 dark:border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#0E2A5C]"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                  selectedCategory === cat
                    ? 'bg-[#0E2A5C] text-white border-[#0E2A5C] shadow-sm font-semibold'
                    : 'bg-white dark:bg-[#1A1A1A] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((doc) => (
            <div
              key={doc.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#141414] shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                {/* Metadata Badges: Private, Authorized Access, Indexed */}
                <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                  <span className="text-[10px] font-mono text-slate-500 font-bold">
                    {doc.id} • {doc.category}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {/* Badge: Private */}
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-medium border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5 text-slate-500" />
                      <span>Private</span>
                    </span>

                    {/* Badge: Authorized Access */}
                    <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-medium border border-blue-200 dark:border-blue-800 flex items-center gap-1">
                      <ShieldCheck className="w-2.5 h-2.5 text-blue-600 dark:text-blue-400" />
                      <span>Authorized Access</span>
                    </span>

                    {/* Badge: Indexed */}
                    <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-medium border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Indexed</span>
                    </span>
                  </div>
                </div>

                {/* Document Title & File Info */}
                <div className="flex items-start gap-3 mt-1">
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-slate-700 text-[#0E2A5C] dark:text-blue-400 flex-shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      {doc.title}
                    </h3>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-1">
                      {doc.filename} ({doc.size}) • {doc.vectorChunks.toLocaleString()} Vector Chunks
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Updated: {doc.lastUpdated}</span>
                <span className="text-[#0E2A5C] dark:text-blue-400 font-semibold hover:underline cursor-pointer">
                  Query with Specialist &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  );
};

export default KnowledgePage;
