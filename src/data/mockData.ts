import { KnowledgeDoc, LocalModelInfo, LocalToolInfo, AuditActivity, SecurityTelemetry, ChatSession } from '../types';

export const INITIAL_SECURITY_TELEMETRY: SecurityTelemetry = {
  internet: 'OFF',
  externalApiCalls: 0,
  dataLeaving: '0 KB',
  localProcessing: '100%',
  airGapped: true,
  activeGpu: 'NVIDIA L40S Cluster (x4)',
  vramUsed: '142.4 GB',
  vramTotal: '192.0 GB',
  encryptionMode: 'AES-256-GCM (Hardware Enclave)',
  zeroTrustFirewall: 'ACTIVE'
};

export const KNOWLEDGE_DOCS: KnowledgeDoc[] = [
  {
    id: 'kb-01',
    title: 'Plant Maintenance SOP (v4.2)',
    category: 'SOP',
    size: '14.2 MB',
    chunks: 1420,
    indexedAt: '2026-08-28',
    classification: 'TOP SECRET // LOCAL',
    accessCount: 428
  },
  {
    id: 'kb-02',
    title: 'Turbine Engineering & Stress Manuals',
    category: 'Engineering',
    size: '84.6 MB',
    chunks: 8940,
    indexedAt: '2026-08-15',
    classification: 'CONFIDENTIAL',
    accessCount: 1205
  },
  {
    id: 'kb-03',
    title: 'Facility Safety & OSHA Protocol 2026',
    category: 'Policy',
    size: '8.4 MB',
    chunks: 640,
    indexedAt: '2026-08-20',
    classification: 'INTERNAL USE',
    accessCount: 890
  },
  {
    id: 'kb-04',
    title: 'Master Vendor Procurement Register',
    category: 'Vendor',
    size: '22.1 MB',
    chunks: 2450,
    indexedAt: '2026-09-01',
    classification: 'CONFIDENTIAL',
    accessCount: 310
  },
  {
    id: 'kb-05',
    title: 'Historical Asset Inspection Audits (2022-2025)',
    category: 'Report',
    size: '112.0 MB',
    chunks: 12400,
    indexedAt: '2026-07-12',
    classification: 'TOP SECRET // LOCAL',
    accessCount: 780
  },
  {
    id: 'kb-06',
    title: 'Internal Executive Correspondence & Minutes',
    category: 'Correspondence',
    size: '6.8 MB',
    chunks: 710,
    indexedAt: '2026-09-02',
    classification: 'RESTRICTED',
    accessCount: 190
  }
];

export const LOCAL_MODELS: LocalModelInfo[] = [
  {
    id: 'qwen-vision-72b',
    name: 'Qwen 2.5 Vision 72B',
    role: 'Vision & Multimodal Inspection',
    parameterCount: '72B',
    quantization: 'AWQ 4-bit (TensorRT-LLM)',
    vramRequirement: '44.8 GB',
    contextWindow: '128,000 tokens',
    tps: 68,
    status: 'active',
    bestFor: 'Engineering drawings, scanned inspection PDFs, defect photos, OCR extraction'
  },
  {
    id: 'deepseek-coder-236b',
    name: 'DeepSeek Coder V2.5 236B',
    role: 'Code Synthesis & Sandboxed Debugging',
    parameterCount: '236B (21B active MoE)',
    quantization: 'FP8 Matrix Engine',
    vramRequirement: '52.0 GB',
    contextWindow: '128,000 tokens',
    tps: 84,
    status: 'active',
    bestFor: 'Zero-leakage code refactoring, AST audits, Rust/C++ compilation, unit test suites'
  },
  {
    id: 'llama-3-70b',
    name: 'Llama 3.3 70B Quantized',
    role: 'Reasoning, Synthesis & Strategy',
    parameterCount: '70B',
    quantization: 'EXL2 4.25 bpw',
    vramRequirement: '38.5 GB',
    contextWindow: '128,000 tokens',
    tps: 76,
    status: 'active',
    bestFor: 'Executive reports, quantitative analytics, spreadsheet formulas, structured notes'
  },
  {
    id: 'mistral-large-2',
    name: 'Mistral Large 2 (Air-Gapped)',
    role: 'Complex Contract & Legal Intelligence',
    parameterCount: '123B',
    quantization: 'GGUF Q5_K_M',
    vramRequirement: '48.0 GB',
    contextWindow: '128,000 tokens',
    tps: 58,
    status: 'cached',
    bestFor: 'Complex multi-document legal citations, dispute resolution, compliance cross-reference'
  },
  {
    id: 'sovereign-router-8b',
    name: 'Sovereign Meta-Router 8B',
    role: 'Microsecond Intent & Tool Dispatcher',
    parameterCount: '8B',
    quantization: 'FP16 Dedicated L1 Cache',
    vramRequirement: '16.0 GB',
    contextWindow: '32,000 tokens',
    tps: 180,
    status: 'active',
    bestFor: 'Sub-millisecond task triage, agent dispatching, security boundary enforcement'
  }
];

export const LOCAL_TOOLS: LocalToolInfo[] = [
  {
    id: 'tool-ocr',
    name: 'Air-Gapped Tesseract & Surya OCR',
    description: 'High-density optical character recognition specialized for scanned engineering blueprints, handwritten maintenance logs, and multi-lingual technical stamps.',
    sandbox: 'Isolated Enclave',
    safetyRating: '100% Air-Gapped',
    invocations: 14820
  },
  {
    id: 'tool-python',
    name: 'Isolated Python 3.12 WASM Sandbox',
    description: 'Stateless execution environment for NumPy, Pandas, Scipy, and SymPy. Strictly isolated from host filesystem and loopback sockets.',
    sandbox: 'Docker WASM',
    safetyRating: '100% Air-Gapped',
    invocations: 38940
  },
  {
    id: 'tool-vector',
    name: 'HNSW Local Vector Knowledge Store',
    description: 'On-device dense vector retriever running Qdrant in embedded mode with GPU-accelerated Cosine & Euclidean similarity.',
    sandbox: 'Local GPU Direct',
    safetyRating: 'Read Only',
    invocations: 94210
  },
  {
    id: 'tool-docgen',
    name: 'Enterprise Document & Office Compiler',
    description: 'Native compiled engine producing Microsoft Word (.docx), PowerPoint (.pptx), and Excel (.xlsx) files formatted to corporate typography standards.',
    sandbox: 'Isolated Enclave',
    safetyRating: 'Verified',
    invocations: 19430
  },
  {
    id: 'tool-cad',
    name: 'Vector CAD & DXF Geometric Analyzer',
    description: 'Extracts dimension layers, tolerance callouts, and structural bills of material from 2D and 3D architectural schematics.',
    sandbox: 'Isolated Enclave',
    safetyRating: '100% Air-Gapped',
    invocations: 6240
  }
];

export const INITIAL_AUDIT_LOG: AuditActivity[] = [
  {
    id: 'audit-08',
    timestamp: '10:26:08 AM',
    type: 'DELIVERABLE',
    title: 'Approval_Note.docx Generated',
    detail: 'SHA256:e3b0c442 compiled locally. 3 pages, 2 compliance matrices verified.',
    agent: 'Inspection Agent',
    latencyMs: 1840,
    status: 'verified'
  },
  {
    id: 'audit-07',
    timestamp: '10:25:52 AM',
    type: 'VERIFICATION',
    title: 'OSHA / ISO-9001 Compliance Verified',
    detail: 'Zero structural violations detected. Wall thickness 24.2mm clears 21.0mm retirement limit.',
    agent: 'Inspection Agent',
    latencyMs: 410,
    status: 'verified'
  },
  {
    id: 'audit-06',
    timestamp: '10:25:35 AM',
    type: 'TOOL',
    title: 'OCR + Document Reader Executed',
    detail: 'Parsed 2.4 MB multi-page ultrasonic NDT scan into tabular sensor vectors.',
    agent: 'Inspection Agent',
    latencyMs: 820,
    status: 'success'
  },
  {
    id: 'audit-05',
    timestamp: '10:25:18 AM',
    type: 'KNOWLEDGE',
    title: 'Internal SOP-ENG-204 Queried',
    detail: 'Retrieved 4 relevant policy chunks from on-premise encrypted vector index.',
    agent: 'Inspection Agent',
    latencyMs: 140,
    status: 'success'
  },
  {
    id: 'audit-04',
    timestamp: '10:25:01 AM',
    type: 'MODEL',
    title: 'Qwen 2.5 Vision 72B Activated',
    detail: 'Allocated 44.8 GB VRAM on Local GPU Enclave 1. Inference latency 14ms/tok.',
    agent: 'Inspection Agent',
    latencyMs: 95,
    status: 'success'
  },
  {
    id: 'audit-03',
    timestamp: '10:24:45 AM',
    type: 'AGENT',
    title: 'Inspection Agent Selected',
    detail: 'Intent classified with 99.8% confidence. Task requires operations compliance verification.',
    agent: 'Sovereign Router',
    latencyMs: 18,
    status: 'success'
  },
  {
    id: 'audit-02',
    timestamp: '10:24:30 AM',
    type: 'TASK',
    title: 'Inspection_report.pdf Attached',
    detail: 'File scanned by local antivirus. No outbound network requests initiated.',
    agent: 'Air-Gap Firewall',
    latencyMs: 42,
    status: 'success'
  },
  {
    id: 'audit-01',
    timestamp: '10:24:12 AM',
    type: 'TASK',
    title: 'Task Session Initialized',
    detail: 'Air-gapped session #SV-9024 created on isolated on-premise compute cluster.',
    agent: 'Sovereign Core',
    latencyMs: 8,
    status: 'success'
  }
];

export const INITIAL_PROJECTS = [
  {
    id: 'proj-01',
    title: 'Unit 4 Turbine Bay Modernization',
    code: 'PRJ-TURB-2026',
    department: 'Heavy Machinery & Operations',
    lastActive: '12 mins ago',
    deliverables: 14,
    status: 'In Progress',
    assignedAgents: ['Inspection Agent', 'Engineering Assistant', 'Data Analyst']
  },
  {
    id: 'proj-02',
    title: 'High-Pressure Feedwater Tender RFP',
    code: 'PRJ-PROC-8812',
    department: 'Procurement & Finance',
    lastActive: '2 hours ago',
    deliverables: 8,
    status: 'Under Review',
    assignedAgents: ['Finance Assistant', 'Presentation Agent']
  },
  {
    id: 'proj-03',
    title: 'SCADA Core WebSocket Engine Refactor',
    code: 'PRJ-CODE-0041',
    department: 'Autonomous Infrastructure',
    lastActive: 'Yesterday',
    deliverables: 23,
    status: 'Completed',
    assignedAgents: ['Software Engineer']
  },
  {
    id: 'proj-04',
    title: 'Air-Gap Zero-Trust Defense Certification',
    code: 'PRJ-SEC-0914',
    department: 'Cybersecurity & Governance',
    lastActive: '3 days ago',
    deliverables: 19,
    status: 'Audited & Sealed',
    assignedAgents: ['Document Analyst', 'HR Assistant']
  }
];

export const INITIAL_CHAT_SESSIONS: ChatSession[] = [
  {
    id: 'session-01',
    title: 'Unit 4 Turbine Ultrasonic Survey',
    preview: 'Ultrasonic thickness analysis and compliance sign-off note...',
    dateGroup: 'Today',
    timestamp: '10:24 AM',
    agentId: 'inspection-agent',
    agentName: 'Inspection Agent',
    isPinned: true,
    scenarioId: 'inspection-approval'
  },
  {
    id: 'session-02',
    title: 'Sulzer vs Flowserve TCO Evaluation',
    preview: '5-year life-cycle CapEx/OpEx financial comparison model...',
    dateGroup: 'Today',
    timestamp: '08:45 AM',
    agentId: 'finance-assistant',
    agentName: 'Finance Assistant',
    isPinned: true,
    scenarioId: 'vendor-comparison'
  },
  {
    id: 'session-03',
    title: 'WebSocket Connection Pool Bugfix',
    preview: 'Lock-free atomic dispatching in Rust WASM sandbox...',
    dateGroup: 'Today',
    timestamp: '07:15 AM',
    agentId: 'software-engineer',
    agentName: 'Software Engineer',
    scenarioId: 'code-debug'
  },
  {
    id: 'session-04',
    title: 'Q3 Plant Operations Variance Excel',
    preview: 'Telemetry ingestion, heat rate calculations, dynamic formulas...',
    dateGroup: 'Yesterday',
    timestamp: '4:30 PM',
    agentId: 'data-analyst',
    agentName: 'Data Analyst',
    scenarioId: 'telemetry-excel'
  },
  {
    id: 'session-05',
    title: 'Executive Air-Gap Sovereign Rollout',
    preview: 'Board of directors deck, ROI modeling, NIST compliance...',
    dateGroup: 'Yesterday',
    timestamp: '2:15 PM',
    agentId: 'presentation-agent',
    agentName: 'Presentation Agent',
    scenarioId: 'management-presentation'
  },
  {
    id: 'session-06',
    title: 'OSHA 1910 Substation Safety Protocol',
    preview: 'High-voltage lockout procedures & compliance verification...',
    dateGroup: 'Previous 7 Days',
    timestamp: 'Sep 2',
    agentId: 'document-analyst',
    agentName: 'Document Analyst'
  },
  {
    id: 'session-07',
    title: 'High-Pressure Steam Flange Tolerances',
    preview: 'CAD cross-section layer extraction and bolt torque audits...',
    dateGroup: 'Previous 7 Days',
    timestamp: 'Aug 30',
    agentId: 'engineering-assistant',
    agentName: 'Engineering Assistant'
  },
  {
    id: 'session-08',
    title: 'Confidential Engineering Grievance Policy',
    preview: 'Cross-referencing internal governance manuals and SOPs...',
    dateGroup: 'Previous 7 Days',
    timestamp: 'Aug 28',
    agentId: 'hr-assistant',
    agentName: 'HR Assistant'
  }
];
