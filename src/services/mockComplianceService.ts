import { ComplianceRequirement, MOCK_COMPLIANCE_REQUIREMENTS, MOCK_COMPLIANCE_SUMMARY, ComplianceSummary, MOCK_CHECKLIST_ITEMS, ChecklistItem } from '@/data/compliance';

export interface AnalysisProgress {
  step: number;
  label: string;
  done: boolean;
}

export const ANALYSIS_STEPS: AnalysisProgress[] = [
  { step: 1, label: 'Reading document', done: false },
  { step: 2, label: 'Extracting requirements', done: false },
  { step: 3, label: 'Matching standards', done: false },
  { step: 4, label: 'Checking compliance', done: false },
  { step: 5, label: 'Building evidence map', done: false },
];

export async function analyzeDocument(
  _file: File,
  onProgress: (step: number) => void
): Promise<{ requirements: ComplianceRequirement[]; summary: ComplianceSummary }> {
  // Simulate step-by-step analysis
  for (let i = 1; i <= 5; i++) {
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 400));
    onProgress(i);
  }

  return {
    requirements: MOCK_COMPLIANCE_REQUIREMENTS,
    summary: MOCK_COMPLIANCE_SUMMARY,
  };
}

export async function getComplianceChecklist(): Promise<ChecklistItem[]> {
  await new Promise((r) => setTimeout(r, 400));
  return MOCK_CHECKLIST_ITEMS;
}

export async function getBISServices() {
  const { MOCK_BIS_SERVICES } = await import('@/data/services');
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_BIS_SERVICES;
}
