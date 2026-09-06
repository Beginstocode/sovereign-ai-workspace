import React, { useState } from 'react';
import { WorkspaceLayout } from '../components/workspace/WorkspaceLayout';
import { AGENTS } from '../data/agents';
import { KNOWLEDGE_DOCS } from '../data/mockData';
import { 
  Search, 
  Terminal,
  RefreshCw
} from 'lucide-react';

export const KnowledgePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [syncing, setSyncing] = useState(false);

  const handleReindex = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 1200);
  };

  const filtered = KNOWLEDGE_DOCS.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase()) ||
    doc.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <WorkspaceLayout
      activeAgent={AGENTS[2]}
      onSelectAgent={() => {}}
      currentTaskTitle="Organizational Brain & Vector Store"
    >
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-5xl mx-auto w-full font-mono text-xs">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#262626] dark:border-[#262626] light:border-[#E5E5E5]">
          <div>
            <div className="flex items-center gap-2 mb-1.5 text-xs text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373]">
              <Terminal className="w-3.5 h-3.5 text-[#F97316]" />
              <span>// 03 ORGANIZATIONAL BRAIN</span>
              <span>·</span>
              <span className="text-emerald-400 dark:text-emerald-400 light:text-emerald-700">26,710 VECTOR CHUNKS</span>
            </div>
            <h1 className="text-2xl font-bold text-white dark:text-white light:text-black font-sans tracking-tight">
              Private Knowledge Vector Store
            </h1>
            <p className="text-xs text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#525252] mt-1 font-sans">
              Local Qdrant vector database providing grounded context citations without cloud API calls.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReindex}
              disabled={syncing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#141414] dark:bg-[#141414] light:bg-[#FAFAFA] text-white dark:text-white light:text-black hover:border-[#525252] transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${syncing ? 'animate-spin text-[#F97316]' : ''}`} />
              <span>{syncing ? 'Syncing HNSW...' : 'Reindex Local Corpus'}</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#737373] absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search indexed knowledge documents..."
            className="w-full bg-[#141414] dark:bg-[#141414] light:bg-[#FAFAFA] border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] rounded pl-8 pr-3 py-1.5 text-xs text-white dark:text-white light:text-black placeholder-[#737373] focus:outline-none focus:border-[#525252]"
          />
        </div>

        {/* Knowledge Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((doc, idx) => (
            <div
              key={doc.id}
              className="p-4 rounded-lg border border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] bg-[#141414] dark:bg-[#141414] light:bg-[#FFFFFF] flex flex-col justify-between hover:border-[#404040] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5 text-[11px]">
                  <span className="text-[#A3A3A3] dark:text-[#A3A3A3] light:text-[#737373]">
                    <span className="text-[#F97316] font-bold">// {doc.id}</span> · {doc.category}
                  </span>
                  <span className="text-[10px] text-emerald-400 dark:text-emerald-400 light:text-emerald-700 bg-emerald-950/60 dark:bg-emerald-950/60 light:bg-emerald-50 px-2 py-0.5 rounded border border-emerald-800/40 dark:border-emerald-800/40 light:border-emerald-200">
                    {doc.classification}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white dark:text-white light:text-black font-sans mb-1">
                  {doc.title}
                </h3>
              </div>

              <div className="pt-3 mt-3 border-t border-[#262626] dark:border-[#262626] light:border-[#E5E5E5] flex items-center justify-between text-[10px] text-[#737373]">
                <span>{doc.chunks} vectors · {doc.size}</span>
                <span>Indexed: {doc.indexedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  );
};
