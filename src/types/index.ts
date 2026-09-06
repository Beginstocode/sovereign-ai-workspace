export type AgentId = 
  | 'data-analyst'
  | 'software-engineer'
  | 'document-analyst'
  | 'engineering-assistant'
  | 'finance-assistant'
  | 'hr-assistant'
  | 'inspection-agent'
  | 'presentation-agent'
  | 'auto';

export interface Agent {
  id: AgentId;
  name: string;
  role: string;
  category: string;
  description: string;
  iconName: string;
  accentColor: string;
  defaultModel: string;
  capabilities: string[];
  tools: string[];
  status: 'online' | 'ready' | 'busy';
  localEngine: string;
}

export type DeliverableType = 'docx' | 'xlsx' | 'pptx' | 'code' | 'pdf';

export interface DeliverableMetadata {
  classification: string;
  generatedBy: string;
  model: string;
  timeTaken: string;
  verificationHash: string;
  pages?: number;
  tables?: number;
  codeLines?: number;
  testPassed?: string;
}

export interface Deliverable {
  id: string;
  title: string;
  filename: string;
  type: DeliverableType;
  size: string;
  summary: string;
  metadata: DeliverableMetadata;
  content: {
    heading?: string;
    executiveSummary?: string;
    findings?: Array<{ item: string; severity: 'High' | 'Medium' | 'Low' | 'Pass'; note: string }>;
    codeSnippet?: string;
    spreadsheetPreview?: Array<{ [key: string]: string | number }>;
    presentationSlides?: Array<{ title: string; bullets: string[] }>;
    recommendation?: string;
  };
}

export interface ExecutionStep {
  id: string;
  title: string;
  detail: string;
  status: 'pending' | 'running' | 'completed';
  timestamp?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  agent?: Agent;
  model?: string;
  attachments?: Array<{
    name: string;
    size: string;
    type: string;
  }>;
  executionSteps?: ExecutionStep[];
  deliverable?: Deliverable;
}

export interface SecurityTelemetry {
  internet: 'OFF' | 'CONNECTED';
  externalApiCalls: number;
  dataLeaving: string;
  localProcessing: string;
  airGapped: boolean;
  activeGpu: string;
  vramUsed: string;
  vramTotal: string;
  encryptionMode: string;
  zeroTrustFirewall: 'ACTIVE' | 'AUDIT';
}

export interface AuditActivity {
  id: string;
  timestamp: string;
  type: 'TASK' | 'AGENT' | 'MODEL' | 'KNOWLEDGE' | 'TOOL' | 'VERIFICATION' | 'DELIVERABLE';
  title: string;
  detail: string;
  agent: string;
  latencyMs: number;
  status: 'success' | 'verified' | 'blocked_leak';
}

export interface KnowledgeDoc {
  id: string;
  title: string;
  category: 'SOP' | 'Engineering' | 'Policy' | 'Report' | 'Vendor' | 'Correspondence';
  size: string;
  chunks: number;
  indexedAt: string;
  classification: string;
  accessCount: number;
}

export interface LocalModelInfo {
  id: string;
  name: string;
  role: string;
  parameterCount: string;
  quantization: string;
  vramRequirement: string;
  contextWindow: string;
  tps: number;
  status: 'active' | 'standby' | 'cached';
  bestFor: string;
}

export interface LocalToolInfo {
  id: string;
  name: string;
  description: string;
  sandbox: 'Isolated Enclave' | 'Docker WASM' | 'Local GPU Direct';
  safetyRating: '100% Air-Gapped' | 'Read Only' | 'Verified';
  invocations: number;
}

export interface ChatSession {
  id: string;
  title: string;
  preview: string;
  dateGroup: 'Pinned' | 'Today' | 'Yesterday' | 'Previous 7 Days';
  timestamp: string;
  agentId: string;
  agentName: string;
  isPinned?: boolean;
  scenarioId?: string;
}
