import { Deliverable } from '../types';

export interface Scenario {
  id: string;
  badge: string;
  title: string;
  prompt: string;
  attachmentName: string;
  attachmentSize: string;
  attachmentType: string;
  agentId: string;
  agentName: string;
  model: string;
  knowledge: string;
  tools: string;
  verificationMethod: string;
  deliverableFile: string;
  deliverable: Deliverable;
}

export const SAMPLE_SCENARIOS: Scenario[] = [
  {
    id: 'inspection-approval',
    badge: 'Operations & Safety',
    title: 'Analyse an inspection report',
    prompt: 'Analyse this inspection report using our maintenance guidelines and prepare an approval note.',
    attachmentName: 'Inspection_report.pdf',
    attachmentSize: '2.4 MB',
    attachmentType: 'application/pdf',
    agentId: 'inspection-agent',
    agentName: 'Inspection Agent',
    model: 'Qwen Vision 72B (Local)',
    knowledge: 'Plant Maintenance SOP (v4.2)',
    tools: 'Local OCR + Document Reader',
    verificationMethod: 'OSHA & ISO-9001 Compliance Matrix Check',
    deliverableFile: 'Approval_Note.docx',
    deliverable: {
      id: 'deliv-insp-01',
      title: 'Structural Inspection Approval & Remediation Note',
      filename: 'Approval_Note.docx',
      type: 'docx',
      size: '148 KB',
      summary: 'Automated technical evaluation of Turbine Bay C ultrasonic thickness testing. Identified 1 minor cavitation alert within permissible tolerance; verified compliance with SOP-ENG-204.',
      metadata: {
        classification: 'TOP SECRET // LOCAL',
        generatedBy: 'Inspection Agent (Sovereign Orchestration)',
        model: 'Qwen Vision 72B (Local GPU Direct)',
        timeTaken: '1.84s',
        verificationHash: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        pages: 3,
        tables: 2
      },
      content: {
        heading: 'EXECUTIVE APPROVAL NOTE: TURBINE BAY C RE-CERTIFICATION',
        executiveSummary: 'Based on localized ultrasonic non-destructive testing (NDT) conducted on Unit 4 Main Steam Valve casing, wall thickness measures 24.2mm (exceeding minimum retirement limit of 21.0mm). No micro-fissures or stress-corrosion cracking were detected under optical magnification.',
        findings: [
          { item: 'Main Steam Valve Housing Wall Thickness', severity: 'Pass', note: '24.2mm observed vs 21.0mm ASME Section I limit. Residual operational lifespan estimated at 48,000 hrs.' },
          { item: 'Cavitation Erosion on Impeller Shroud', severity: 'Medium', note: 'Superficial 0.4mm pitting recorded on blade trailing edge. Scheduled for polymer cladding at next planned outage.' },
          { item: 'Flange Gasket Torque & Seal Integrity', severity: 'Pass', note: 'Hydrostatic pressure held at 320 bar for 45 min without delta-P drop.' },
          { item: 'Secondary Lubrication Line Vibration', severity: 'Low', note: 'Spectral peak at 42Hz within allowable ISO-10816 class III limits.' }
        ],
        recommendation: 'AUTHORIZATION GRANTED. The technical inspection verifies that Unit 4 complies with Plant Maintenance SOP (v4.2). Operational re-commissioning is cleared for immediate execution.'
      }
    }
  },
  {
    id: 'vendor-comparison',
    badge: 'Procurement & Finance',
    title: 'Compare vendor quotations',
    prompt: 'Compare vendor quotations for industrial pump replacement, evaluate total cost of ownership over 5 years, and recommend the best partner.',
    attachmentName: 'Vendor_Quotations_Batch_Q3.xlsx',
    attachmentSize: '4.1 MB',
    attachmentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    agentId: 'finance-assistant',
    agentName: 'Finance Assistant',
    model: 'Llama 3.3 70B Quantized',
    knowledge: 'Vendor Master DB & Enterprise Procurement Policy',
    tools: 'Spreadsheet Parser + TCO Calculator',
    verificationMethod: 'Dual Financial Audit Formula Recalculation',
    deliverableFile: 'Recommendation.pptx',
    deliverable: {
      id: 'deliv-vendor-02',
      title: 'Executive Vendor Selection & 5-Year TCO Evaluation',
      filename: 'Recommendation.pptx',
      type: 'pptx',
      size: '640 KB',
      summary: 'Comparative evaluation across 3 vetted industrial suppliers (Sulzer, Flowserve, KSB). Sulzer offers 14% lower energy consumption yielding $142,000 net 5-year savings despite a 6% higher initial CapEx.',
      metadata: {
        classification: 'CONFIDENTIAL',
        generatedBy: 'Finance Assistant & Presentation Agent',
        model: 'Llama 3.3 70B Quantized (Local GPU)',
        timeTaken: '2.12s',
        verificationHash: 'sha256:7b52009b64fd0a2a49e6d8a939753077792b0554',
        pages: 6,
        tables: 3
      },
      content: {
        heading: 'EXECUTIVE PROCUREMENT BRIEFING: HIGH-PRESSURE FEEDWATER PUMPS',
        executiveSummary: 'Evaluated RFP responses against 5-year Total Cost of Ownership (CapEx, energy efficiency at $0.09/kWh, scheduled PM costs, and downtime warranty SLAs).',
        presentationSlides: [
          { title: 'Slide 1: Executive Summary & Recommendation', bullets: ['Award to Supplier B (Sulzer Hydro)', 'Net 5-year TCO: $418,000 vs $492,000 baseline', 'Includes 36-month local spares stocking warranty'] },
          { title: 'Slide 2: CapEx vs OpEx Lifecycle Curve', bullets: ['Supplier A: CapEx $120k, 5-Yr OpEx $385k (Total: $505k)', 'Supplier B: CapEx $138k, 5-Yr OpEx $280k (Total: $418k) [BEST]', 'Supplier C: CapEx $115k, 5-Yr OpEx $377k (Total: $492k)'] },
          { title: 'Slide 3: Technical Compliance & Risk Register', bullets: ['ISO 13709 / API 610 11th Edition full compliance certified', 'Local field engineers available within 4-hour SLA in-region', 'Factory acceptance testing (FAT) scheduled at zero additional fee'] }
        ],
        recommendation: 'Execute standard purchase agreement with Supplier B with payment milestones tied to factory witness inspection.'
      }
    }
  },
  {
    id: 'code-debug',
    badge: 'Software Engineering',
    title: 'Debug this code',
    prompt: 'Debug this code: memory leak and lock contention in WebSocket connection pool under high concurrency stress test.',
    attachmentName: 'connection_pool.rs',
    attachmentSize: '24 KB',
    attachmentType: 'text/rust',
    agentId: 'software-engineer',
    agentName: 'Software Engineer',
    model: 'DeepSeek Coder V2.5 236B',
    knowledge: 'Private Systems Architecture Specs',
    tools: 'Isolated Rust Engine + Valgrind Memory Profiler',
    verificationMethod: '17 Unit & Stress Tests Executed in WASM Sandbox',
    deliverableFile: 'fixed_connection_pool.rs',
    deliverable: {
      id: 'deliv-code-03',
      title: 'Fixed Zero-Contention WebSocket Connection Pool',
      filename: 'fixed_connection_pool.rs',
      type: 'code',
      size: '28 KB',
      summary: 'Isolated deadlock caused by nested RwLock read-guard upgrade inside channel heartbeat loop. Replaced with lock-free dashmap and atomic cleanup epoch counters.',
      metadata: {
        classification: 'INTERNAL USE',
        generatedBy: 'Software Engineer Agent',
        model: 'DeepSeek Coder V2.5 (Local Dual L40S)',
        timeTaken: '1.45s',
        verificationHash: 'sha256:4f8e5b6140e7cfb919cfc1a2f6432e1966',
        codeLines: 142,
        testPassed: '17/17 tests passed (0 leaks, 0 deadlocks)'
      },
      content: {
        heading: 'RESOLVED: RACE CONDITION & ASYNC MEMORY PINNING IN SOCKET POOL',
        executiveSummary: 'The previous implementation captured an async Mutex guard across an `.await` suspension point in the heartbeater loop, causing pending dropped connections to remain pinned in memory indefinitely.',
        codeSnippet: `// Fixed: Lock-free atomic connection slot management
use std::sync::atomic::{AtomicUsize, Ordering};
use dashmap::DashMap;
use tokio::sync::mpsc;

pub struct SovereignConnectionPool {
    pool_id: &'static str,
    active_connections: DashMap<u64, mpsc::Sender<Frame>>,
    total_reaped: AtomicUsize,
}

impl SovereignConnectionPool {
    pub fn new(pool_id: &'static str) -> Self {
        Self {
            pool_id,
            active_connections: DashMap::with_capacity(16_384),
            total_reaped: AtomicUsize::new(0),
        }
    }

    /// Fast lock-free broadcast with automatic dropped client reaping
    pub async fn dispatch_frame(&self, frame: Frame) -> usize {
        let mut dispatched = 0;
        self.active_connections.retain(|id, tx| {
            match tx.try_send(frame.clone()) {
                Ok(_) => {
                    dispatched += 1;
                    true
                }
                Err(mpsc::error::TrySendError::Closed(_)) => {
                    self.total_reaped.fetch_add(1, Ordering::Relaxed);
                    false // Automatically reaped without holding lock!
                }
                Err(mpsc::error::TrySendError::Full(_)) => true,
            }
        });
        dispatched
    }
}`,
        recommendation: 'All 17 integration stress tests passed in local sandbox. P99 latency dropped from 420ms to 2.8ms under 50,000 concurrent client connections.'
      }
    }
  },
  {
    id: 'telemetry-excel',
    badge: 'Data Science',
    title: 'Analyse this Excel file',
    prompt: 'Analyse Q3 telemetry dataset and generate production financial analysis Excel with automated formulas and variance calculations.',
    attachmentName: 'Plant_Operations_Q3.xlsx',
    attachmentSize: '8.6 MB',
    attachmentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    agentId: 'data-analyst',
    agentName: 'Data Analyst',
    model: 'Llama 3.3 70B Quantized',
    knowledge: 'Financial Reporting Model Guidelines',
    tools: 'Local Python Sandbox + OpenPyXL Engine',
    verificationMethod: 'Double-Entry Reconciliation & Cell Hash Verification',
    deliverableFile: 'Analysis_Report.xlsx',
    deliverable: {
      id: 'deliv-data-04',
      title: 'Q3 Plant Operations & Financial Variance Analysis',
      filename: 'Analysis_Report.xlsx',
      type: 'xlsx',
      size: '1.2 MB',
      summary: 'Clean multi-tab Excel model with automated dynamic formulas, month-over-month variance analysis, fuel efficiency KPIs, and heat rate trends.',
      metadata: {
        classification: 'CONFIDENTIAL',
        generatedBy: 'Data Analyst Agent',
        model: 'Llama 3.3 70B Quantized (Local GPU)',
        timeTaken: '2.40s',
        verificationHash: 'sha256:1a84f509d3b074a3f12489c6',
        tables: 4
      },
      content: {
        heading: 'Q3 CONSOLIDATED PLANT EFFICIENCY & VARIANCE MODEL',
        executiveSummary: 'Heat rate improved 2.3% post-catalyst overhaul in August, saving $89,400 in feedstock costs against standard baseline budget.',
        spreadsheetPreview: [
          { 'Facility Unit': 'Unit 1 (Hydro)', 'Output (MWh)': 142800, 'Availability': '98.4%', 'Operating Cost': '$412,000', 'Budget Variance': '-$18,400 (Favorable)' },
          { 'Facility Unit': 'Unit 2 (Gas Combined)', 'Output (MWh)': 284100, 'Availability': '96.2%', 'Operating Cost': '$1,840,000', 'Budget Variance': '-$64,200 (Favorable)' },
          { 'Facility Unit': 'Unit 3 (Solar Array)', 'Output (MWh)': 68400, 'Availability': '99.8%', 'Operating Cost': '$48,000', 'Budget Variance': '+$2,100 (Unfavorable)' },
          { 'Facility Unit': 'Unit 4 (Aux Steam)', 'Output (MWh)': 91200, 'Availability': '94.1%', 'Operating Cost': '$620,000', 'Budget Variance': '-$8,900 (Favorable)' }
        ],
        recommendation: 'Model includes dynamic macros and validated cell ranges ready for Board Finance Committee review.'
      }
    }
  },
  {
    id: 'management-presentation',
    badge: 'Executive Strategy',
    title: 'Create a management presentation',
    prompt: 'Create a management presentation summarizing our air-gapped sovereign AI rollout, risk mitigation, and projected cost savings for the Board.',
    attachmentName: 'Infrastructure_Audit.pdf',
    attachmentSize: '3.8 MB',
    attachmentType: 'application/pdf',
    agentId: 'presentation-agent',
    agentName: 'Presentation Agent',
    model: 'Llama 3.3 70B Quantized',
    knowledge: 'Corporate IT Strategy & Governance Policy',
    tools: 'PPTX Engine + SVG Chart Compiler',
    verificationMethod: 'Board Deck Visual & Citation Validation',
    deliverableFile: 'Board_Sovereign_Rollout.pptx',
    deliverable: {
      id: 'deliv-pres-05',
      title: 'Sovereign AI Enterprise Infrastructure Rollout',
      filename: 'Board_Sovereign_Rollout.pptx',
      type: 'pptx',
      size: '890 KB',
      summary: 'Comprehensive 8-slide executive presentation detailing zero-cloud architecture, local GPU cluster economics, compliance alignment, and 300% ROI in year 1.',
      metadata: {
        classification: 'CONFIDENTIAL // BOARD LEVEL',
        generatedBy: 'Presentation Agent',
        model: 'Llama 3.3 70B Quantized',
        timeTaken: '1.92s',
        verificationHash: 'sha256:9f2c81a7b45',
        pages: 8,
        tables: 2
      },
      content: {
        heading: 'BOARD OF DIRECTORS: PRIVATE ENTERPRISE AI ARCHITECTURE',
        executiveSummary: 'Full transition from public cloud LLM APIs to on-premise air-gapped Sovereign AI eliminates IP leakage risks while reducing operating expenses by 68%.',
        presentationSlides: [
          { title: 'Slide 1: Strategic Imperative', bullets: ['100% intellectual property security guaranteed by physical air-gap', 'Zero data leaves enterprise firewalls', 'Eliminates recurring per-token cloud API costs'] },
          { title: 'Slide 2: System Architecture', bullets: ['Local GPU compute: 8x NVIDIA L40S cluster', 'Air-gapped vector search over internal SOPs and CAD drawings', 'Specialized autonomous workforce for 8 core departments'] },
          { title: 'Slide 3: Financial ROI & Break-even', bullets: ['Initial hardware investment: $185,000', 'Cloud API avoidance: $310,000 annually', 'Payback period: 7.2 months'] }
        ],
        recommendation: 'Formal approval requested to proceed with Phase 2 departmental rollout across Engineering and Legal divisions.'
      }
    }
  }
];
