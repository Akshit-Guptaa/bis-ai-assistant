export type ComplianceStatus = 'supported' | 'gap' | 'needs_verification';

export interface ComplianceRequirement {
  id: string;
  requirement: string;
  category: string;
  status: ComplianceStatus;
  evidence: string;
  evidenceClause: string;
  applicableStandard: string;
  explanation: string;
  recommendedAction: string;
}

export interface ComplianceSummary {
  total: number;
  supported: number;
  gaps: number;
  needsVerification: number;
}

export interface ChecklistItem {
  id: string;
  requirement: string;
  category: string;
  completed: boolean;
  evidence: string;
  notes: string;
  priority: 'High' | 'Medium' | 'Low';
}

export const MOCK_COMPLIANCE_REQUIREMENTS: ComplianceRequirement[] = [
  {
    id: 'req-001',
    requirement: 'Stainless steel grade specified (AISI 304 minimum)',
    category: 'Material Requirements',
    status: 'supported',
    evidence: 'IS 10987 (Demo Reference)',
    evidenceClause: 'Clause 5.1',
    applicableStandard: 'IS 10987',
    explanation: 'The product specification mentions "grade 304 stainless steel" which aligns with the minimum material requirement.',
    recommendedAction: 'Obtain mill certificate confirming AISI 304 grade from steel supplier.',
  },
  {
    id: 'req-002',
    requirement: 'Food-safe surface finish documented',
    category: 'Surface Requirements',
    status: 'supported',
    evidence: 'IS 10987 (Demo Reference)',
    evidenceClause: 'Clause 5.3',
    applicableStandard: 'IS 10987',
    explanation: 'Specification references mirror-polished interior surface which meets food-safe surface requirements.',
    recommendedAction: 'Document surface roughness measurements (Ra ≤ 0.8 μm recommended).',
  },
  {
    id: 'req-003',
    requirement: 'Capacity declaration with tolerance (±2%)',
    category: 'Dimensional Requirements',
    status: 'supported',
    evidence: 'IS 10987 (Demo Reference)',
    evidenceClause: 'Clause 6.2',
    applicableStandard: 'IS 10987',
    explanation: 'Capacity of 750ml is declared. Tolerance specification found in document.',
    recommendedAction: 'Ensure production QC measures maintain ±2% capacity tolerance.',
  },
  {
    id: 'req-004',
    requirement: 'Drop and impact resistance test data',
    category: 'Performance Testing',
    status: 'gap',
    evidence: 'IS 10987 (Demo Reference)',
    evidenceClause: 'Clause 8.4',
    applicableStandard: 'IS 10987',
    explanation: 'No test data found for drop resistance in the uploaded specification document.',
    recommendedAction: 'Commission drop test at BIS-recognized laboratory. Product must survive 1m drop on concrete without leakage.',
  },
  {
    id: 'req-005',
    requirement: 'Corrosion resistance test results',
    category: 'Performance Testing',
    status: 'gap',
    evidence: 'IS 10987 (Demo Reference)',
    evidenceClause: 'Clause 8.5',
    applicableStandard: 'IS 10987',
    explanation: 'Salt spray test results not present in the specification. Required for food-contact vessels.',
    recommendedAction: 'Conduct 48-hour salt spray test (ASTM B117 equivalent) and document results.',
  },
  {
    id: 'req-006',
    requirement: 'Leakage test at operating pressure',
    category: 'Performance Testing',
    status: 'gap',
    evidence: 'IS 14543 (Demo Reference)',
    evidenceClause: 'Clause 9.1',
    applicableStandard: 'IS 14543',
    explanation: 'Leakage test protocol not documented. Required for sealed containers.',
    recommendedAction: 'Conduct leakage test at 1.5x nominal pressure for 15 minutes and document.',
  },
  {
    id: 'req-007',
    requirement: 'Marking and labelling requirements',
    category: 'Labelling',
    status: 'gap',
    evidence: 'IS 10987 (Demo Reference)',
    evidenceClause: 'Clause 10',
    applicableStandard: 'IS 10987',
    explanation: 'Product specification does not include mandatory marking details (manufacturer name, capacity, grade, BIS license number).',
    recommendedAction: 'Design product label to include all mandatory markings per IS 10987 Clause 10.',
  },
  {
    id: 'req-008',
    requirement: 'BIS license number on product',
    category: 'Certification',
    status: 'needs_verification',
    evidence: 'BIS Certification Scheme I (Demo Reference)',
    evidenceClause: 'Section 5',
    applicableStandard: 'BIS Scheme I',
    explanation: 'Cannot verify BIS license status from specification alone. License number must appear on all products.',
    recommendedAction: 'Verify current BIS license validity. Apply if not yet certified.',
  },
  {
    id: 'req-009',
    requirement: 'Factory audit and quality control documentation',
    category: 'Quality Management',
    status: 'needs_verification',
    evidence: 'BIS Certification Scheme I (Demo Reference)',
    evidenceClause: 'Section 7',
    applicableStandard: 'BIS Scheme I',
    explanation: 'QMS documentation not included in uploaded specification. BIS requires factory audit records.',
    recommendedAction: 'Prepare quality control manual and factory audit records for BIS inspector.',
  },
  {
    id: 'req-010',
    requirement: 'Third-party test report from BIS-recognized lab',
    category: 'Testing',
    status: 'needs_verification',
    evidence: 'BIS Certification Scheme I (Demo Reference)',
    evidenceClause: 'Section 4.2',
    applicableStandard: 'BIS Scheme I',
    explanation: 'No test report found in specification. Valid test report from recognized lab required for certification.',
    recommendedAction: 'Obtain test report from NABL-accredited, BIS-recognized laboratory.',
  },
  {
    id: 'req-011',
    requirement: 'Wall thickness specification',
    category: 'Dimensional Requirements',
    status: 'supported',
    evidence: 'IS 10987 (Demo Reference)',
    evidenceClause: 'Clause 6.1',
    applicableStandard: 'IS 10987',
    explanation: 'Wall thickness of 0.8mm documented in specification, meeting minimum requirement.',
    recommendedAction: 'Maintain production tolerance on wall thickness (±0.1mm).',
  },
  {
    id: 'req-012',
    requirement: 'Welding quality and inspection',
    category: 'Manufacturing',
    status: 'supported',
    evidence: 'IS 10987 (Demo Reference)',
    evidenceClause: 'Clause 7.2',
    applicableStandard: 'IS 10987',
    explanation: 'Specification references TIG welding process for seams — acceptable method per standard.',
    recommendedAction: 'Maintain weld inspection records and ensure all welds are tested.',
  },
  {
    id: 'req-013',
    requirement: 'Handle and lid attachment strength',
    category: 'Safety',
    status: 'supported',
    evidence: 'IS 10987 (Demo Reference)',
    evidenceClause: 'Clause 8.1',
    applicableStandard: 'IS 10987',
    explanation: 'Lid attachment mechanism described. Torque specification documented.',
    recommendedAction: 'Include pull-force test for handle in QC protocol.',
  },
  {
    id: 'req-014',
    requirement: 'Material declaration for lid/seal components',
    category: 'Material Requirements',
    status: 'supported',
    evidence: 'IS 10987 (Demo Reference)',
    evidenceClause: 'Clause 5.4',
    applicableStandard: 'IS 10987',
    explanation: 'Silicone seal material declared as food-grade silicone — acceptable.',
    recommendedAction: 'Obtain food-grade certification for silicone seal from supplier.',
  },
  {
    id: 'req-015',
    requirement: 'Thermal insulation performance (if double-wall)',
    category: 'Performance',
    status: 'supported',
    evidence: 'IS 10987 (Demo Reference)',
    evidenceClause: 'Clause 8.7',
    applicableStandard: 'IS 10987',
    explanation: 'Double-wall vacuum insulation documented. Performance data present.',
    recommendedAction: 'Conduct thermal retention test and document results.',
  },
  {
    id: 'req-016',
    requirement: 'Packaging and storage requirements',
    category: 'Packaging',
    status: 'supported',
    evidence: 'IS 10987 (Demo Reference)',
    evidenceClause: 'Clause 11',
    applicableStandard: 'IS 10987',
    explanation: 'Packaging specifications documented and meet requirements.',
    recommendedAction: 'Ensure packaging label includes all required information.',
  },
  {
    id: 'req-017',
    requirement: 'Product drawing and dimensions',
    category: 'Technical Documentation',
    status: 'supported',
    evidence: 'IS 10987 (Demo Reference)',
    evidenceClause: 'Annex A',
    applicableStandard: 'IS 10987',
    explanation: 'Dimensional drawings present in specification document.',
    recommendedAction: 'Keep drawings updated with production tolerances.',
  },
  {
    id: 'req-018',
    requirement: 'ISI Mark license application submitted',
    category: 'Certification',
    status: 'needs_verification',
    evidence: 'BIS Act 2016 (Demo Reference)',
    evidenceClause: 'Section 17',
    applicableStandard: 'BIS Act 2016',
    explanation: 'Cannot determine if certification application has been submitted. Mandatory for products under compulsory certification.',
    recommendedAction: 'Submit application through BIS online portal (www.bis.gov.in) with all required documents.',
  },
];

export const MOCK_COMPLIANCE_SUMMARY: ComplianceSummary = {
  total: 18,
  supported: 12,
  gaps: 4,
  needsVerification: 2,
};

export const MOCK_CHECKLIST_ITEMS: ChecklistItem[] = [
  { id: 'cl-001', requirement: 'Product specification document prepared', category: 'Documentation', completed: true, evidence: 'Internal Spec v1.2 (Demo)', notes: 'Complete technical specification available', priority: 'High' },
  { id: 'cl-002', requirement: 'Applicable Indian Standard identified', category: 'Standards', completed: true, evidence: 'IS 10987 (Demo Reference)', notes: 'IS 10987 identified as primary applicable standard', priority: 'High' },
  { id: 'cl-003', requirement: 'Stainless steel grade certified by supplier', category: 'Material', completed: true, evidence: 'Supplier Mill Certificate (Demo)', notes: 'Mill certificate for AISI 304 obtained', priority: 'High' },
  { id: 'cl-004', requirement: 'Food-grade surface finish confirmed', category: 'Material', completed: true, evidence: 'IS 10987 Clause 5.3 (Demo)', notes: 'Mirror polish interior — Ra ≤ 0.8μm verified', priority: 'High' },
  { id: 'cl-005', requirement: 'Product drawing and dimensional tolerance defined', category: 'Documentation', completed: true, evidence: 'Engineering Drawing Rev 3 (Demo)', notes: 'Drawings completed and reviewed', priority: 'Medium' },
  { id: 'cl-006', requirement: 'Welding process and inspection defined', category: 'Manufacturing', completed: true, evidence: 'IS 10987 Clause 7.2 (Demo)', notes: 'TIG welding process documented', priority: 'Medium' },
  { id: 'cl-007', requirement: 'Lid and seal material declared (food-grade)', category: 'Material', completed: true, evidence: 'IS 10987 Clause 5.4 (Demo)', notes: 'Food-grade silicone seal — supplier certificate obtained', priority: 'High' },
  { id: 'cl-008', requirement: 'Thermal insulation performance test conducted', category: 'Testing', completed: true, evidence: 'Internal Test Report (Demo)', notes: 'Thermal retention: 6 hrs ≥ 60°C — PASS', priority: 'Medium' },
  { id: 'cl-009', requirement: 'Wall thickness measurement and tolerance defined', category: 'Manufacturing', completed: true, evidence: 'IS 10987 Clause 6.1 (Demo)', notes: '0.8mm ± 0.1mm — in spec', priority: 'Medium' },
  { id: 'cl-010', requirement: 'Packaging specification and labelling designed', category: 'Packaging', completed: true, evidence: 'IS 10987 Clause 11 (Demo)', notes: 'Packaging design drafted, pending legal review', priority: 'Low' },
  { id: 'cl-011', requirement: 'Handle and lid attachment torque test', category: 'Testing', completed: true, evidence: 'IS 10987 Clause 8.1 (Demo)', notes: 'Torque test: 5 Nm — PASS', priority: 'Medium' },
  { id: 'cl-012', requirement: 'Capacity accuracy measurement (±2% tolerance)', category: 'Testing', completed: true, evidence: 'IS 10987 Clause 6.2 (Demo)', notes: 'Measured 748ml for 750ml product — within tolerance', priority: 'Medium' },
  { id: 'cl-013', requirement: 'Drop test at BIS-recognized laboratory', category: 'Testing', completed: false, evidence: 'IS 10987 Clause 8.4 (Demo)', notes: 'Not yet conducted — lab appointment required', priority: 'High' },
  { id: 'cl-014', requirement: 'Corrosion/salt spray test report obtained', category: 'Testing', completed: false, evidence: 'IS 10987 Clause 8.5 (Demo)', notes: '48-hour salt spray test required', priority: 'High' },
  { id: 'cl-015', requirement: 'Leakage test at 1.5x nominal pressure', category: 'Testing', completed: false, evidence: 'IS 14543 Clause 9.1 (Demo)', notes: 'Pending — schedule with testing lab', priority: 'High' },
  { id: 'cl-016', requirement: 'Mandatory markings designed on product label', category: 'Labelling', completed: false, evidence: 'IS 10987 Clause 10 (Demo)', notes: 'BIS license number, capacity, grade, manufacturer details required', priority: 'High' },
  { id: 'cl-017', requirement: 'Third-party test report from BIS-recognized lab obtained', category: 'Certification', completed: false, evidence: 'BIS Scheme I Section 4.2 (Demo)', notes: 'Identify NABL-accredited lab and schedule testing', priority: 'High' },
  { id: 'cl-018', requirement: 'BIS ISI Mark certification application submitted', category: 'Certification', completed: false, evidence: 'BIS Act 2016 Section 17 (Demo)', notes: 'Apply at bis.gov.in after obtaining test report', priority: 'High' },
];
