import { Agent } from '../types';

export const AGENTS: Agent[] = [
  {
    id: 'inspection-agent',
    name: 'Inspection Agent',
    role: 'Compliance & Asset Diagnostics',
    category: 'Operations',
    description: 'Analyse inspection reports, non-destructive testing findings, safety violations, and operational compliance.',
    iconName: 'ShieldCheck',
    accentColor: '#10B981', // Emerald
    defaultModel: 'Qwen Vision 72B (Local)',
    capabilities: ['Visual defect detection', 'NDT report extraction', 'Compliance check vs ISO/OSHA', 'Approval note generation'],
    tools: ['OCR + Document Reader', 'Vector Knowledge Search', 'Approval Docx Generator'],
    status: 'online',
    localEngine: 'RTX 4090 Enclave 1'
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    role: 'Quantitative Analytics & BI',
    category: 'Analytics',
    description: 'Analyse datasets, extract statistical trends, build localized charts and generate production Excel models.',
    iconName: 'BarChart3',
    accentColor: '#06B6D4', // Cyan
    defaultModel: 'Llama 3.3 70B Quantized',
    capabilities: ['Statistical anomaly detection', 'Financial trend modeling', 'Automated formulas', 'Clean Excel generation'],
    tools: ['Local Python Sandbox', 'Parquet & CSV Parser', 'Excel Spreadsheet Engine'],
    status: 'online',
    localEngine: 'RTX 4090 Enclave 2'
  },
  {
    id: 'software-engineer',
    name: 'Software Engineer',
    role: 'Autonomous Systems & Code',
    category: 'Engineering',
    description: 'Write, debug, refactor, and rigorously test code within private air-gapped sandboxes without network access.',
    iconName: 'Code2',
    accentColor: '#8B5CF6', // Violet
    defaultModel: 'DeepSeek Coder V2.5 236B',
    capabilities: ['Zero-leakage code review', 'Unit test generation', 'Memory leak triage', 'AST refactoring'],
    tools: ['Isolated Clang/Node Runner', 'Git Local Committer', 'Static Analysis Engine'],
    status: 'online',
    localEngine: 'Dual L40S Cluster'
  },
  {
    id: 'document-analyst',
    name: 'Document Analyst',
    role: 'Deep Semantic Document Intelligence',
    category: 'Analysis',
    description: 'Understand multi-hundred page contracts, legal briefs, technical specifications, and cross-reference citations.',
    iconName: 'FileText',
    accentColor: '#F59E0B', // Amber
    defaultModel: 'Mistral Large 2 (Air-Gapped)',
    capabilities: ['Redline comparison', 'Multi-document synthesis', 'Citation verification', 'Confidential summarization'],
    tools: ['Local OCR Engine', 'Chunked Vector Store', 'Metadata Extractor'],
    status: 'online',
    localEngine: 'Dual L40S Cluster'
  },
  {
    id: 'engineering-assistant',
    name: 'Engineering Assistant',
    role: 'CAD, Structural & Physical Systems',
    category: 'Engineering',
    description: 'Support with engineering drawings, schematics, tolerance verification, stress calculations, and equipment specifications.',
    iconName: 'Compass',
    accentColor: '#EC4899', // Pink
    defaultModel: 'Qwen Vision 72B',
    capabilities: ['DWG/DXF schematic inspection', 'Tolerance limits check', 'HVAC & electrical validation', 'BOM generation'],
    tools: ['CAD Vector Parser', 'Formula Solver', 'Engineering Specs RAG'],
    status: 'online',
    localEngine: 'Dual L40S Cluster'
  },
  {
    id: 'finance-assistant',
    name: 'Finance Assistant',
    role: 'Corporate Finance & Procurement',
    category: 'Finance',
    description: 'Financial analysis, audit trails, vendor invoice reconciliation, quotation scoring, and balance sheet validation.',
    iconName: 'Coins',
    accentColor: '#6366F1', // Indigo
    defaultModel: 'Llama 3.3 70B Quantized',
    capabilities: ['Multi-currency audit', 'Tender RFP scoring', 'Cashflow modeling', 'Discrepancy detection'],
    tools: ['Spreadsheet Engine', 'Vendor DB Connector', 'Calculated Table Generator'],
    status: 'online',
    localEngine: 'RTX 4090 Enclave 1'
  },
  {
    id: 'hr-assistant',
    name: 'HR Assistant',
    role: 'People Operations & Workplace Compliance',
    category: 'Governance',
    description: 'Enterprise policies, employee onboarding documentation, training material generation, and labor law compliance.',
    iconName: 'Users',
    accentColor: '#F97316', // Orange
    defaultModel: 'Mistral Large 2 (Air-Gapped)',
    capabilities: ['Confidential grievance analysis', 'Policy alignment check', 'Role description drafting', 'Internal FAQ synthesis'],
    tools: ['HR Knowledge Base', 'Redaction Anonymizer', 'Template Generator'],
    status: 'online',
    localEngine: 'RTX 4090 Enclave 2'
  },
  {
    id: 'presentation-agent',
    name: 'Presentation Agent',
    role: 'Executive Briefs & Strategic Slides',
    category: 'Executive',
    description: 'Synthesize messy datasets, operational findings, and roadmaps into crisp, C-level PowerPoint slide decks.',
    iconName: 'Presentation',
    accentColor: '#14B8A6', // Teal
    defaultModel: 'Llama 3.3 70B Quantized',
    capabilities: ['Executive synthesis', 'Slide storyboarding', 'Chart generation', 'Direct PPTX compilation'],
    tools: ['PPTX Slide Builder', 'Chart SVG Render', 'Executive Style Guide'],
    status: 'online',
    localEngine: 'Dual L40S Cluster'
  }
];

export const AUTO_AGENT: Agent = {
  id: 'auto',
  name: 'Autonomous Router',
  role: 'Dynamic Task Orchestrator',
  category: 'System',
  description: 'Let Sovereign dynamically inspect your prompt and attachments to route to the optimal specialist agent and model.',
  iconName: 'Sparkles',
  accentColor: '#8B5CF6',
  defaultModel: 'Sovereign Meta-Router (0ms overhead)',
  capabilities: ['Intent classification', 'Model capability matching', 'Tool chaining', 'Verification enforcement'],
  tools: ['Dynamic Router', 'Air-Gap Sandbox', 'Enclave Manager'],
  status: 'online',
  localEngine: 'Local Sovereign Controller'
};
