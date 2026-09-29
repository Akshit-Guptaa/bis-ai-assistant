export interface Document {
  id: string;
  name: string;
  type: 'PDF' | 'DOCX' | 'XLSX' | 'Image';
  uploadDate: string;
  size: string;
  analysisStatus: 'analyzed' | 'pending' | 'analyzing' | 'not_analyzed';
  complianceStatus: 'compliant' | 'gaps_found' | 'pending' | 'not_analyzed';
  standards?: string[];
  requirementsChecked?: number;
  gapsFound?: number;
}

export const MOCK_DOCUMENTS: Document[] = [
  {
    id: 'doc-001',
    name: 'Product_Specification_WaterBottle_v1.2.pdf',
    type: 'PDF',
    uploadDate: '2026-09-28',
    size: '1.4 MB',
    analysisStatus: 'analyzed',
    complianceStatus: 'gaps_found',
    standards: ['IS 10987', 'IS 14543'],
    requirementsChecked: 18,
    gapsFound: 4,
  },
  {
    id: 'doc-002',
    name: 'Manufacturing_Process_SOP.pdf',
    type: 'PDF',
    uploadDate: '2026-09-27',
    size: '2.1 MB',
    analysisStatus: 'analyzed',
    complianceStatus: 'compliant',
    standards: ['IS 10987'],
    requirementsChecked: 12,
    gapsFound: 0,
  },
  {
    id: 'doc-003',
    name: 'Lab_Test_Report_Draft.pdf',
    type: 'PDF',
    uploadDate: '2026-09-26',
    size: '890 KB',
    analysisStatus: 'analyzed',
    complianceStatus: 'gaps_found',
    standards: ['IS 10987'],
    requirementsChecked: 8,
    gapsFound: 2,
  },
  {
    id: 'doc-004',
    name: 'Quality_Control_Manual_v3.docx',
    type: 'DOCX',
    uploadDate: '2026-09-25',
    size: '450 KB',
    analysisStatus: 'pending',
    complianceStatus: 'pending',
    standards: [],
    requirementsChecked: 0,
    gapsFound: 0,
  },
  {
    id: 'doc-005',
    name: 'BIS_License_Application_Draft.docx',
    type: 'DOCX',
    uploadDate: '2026-09-24',
    size: '320 KB',
    analysisStatus: 'pending',
    complianceStatus: 'pending',
    standards: [],
    requirementsChecked: 0,
    gapsFound: 0,
  },
  {
    id: 'doc-006',
    name: 'Packaging_Design_Specifications.pdf',
    type: 'PDF',
    uploadDate: '2026-09-20',
    size: '5.6 MB',
    analysisStatus: 'not_analyzed',
    complianceStatus: 'not_analyzed',
    standards: [],
    requirementsChecked: 0,
    gapsFound: 0,
  },
];

export const MOCK_RECENT_ACTIVITY = [
  { id: 1, action: 'Compliance analysis completed', document: 'Product_Specification_WaterBottle_v1.2.pdf', time: '2 hours ago', type: 'analysis' },
  { id: 2, action: 'Standard identified', document: 'IS 10987 — Stainless Steel Kitchenware', time: '3 hours ago', type: 'standard' },
  { id: 3, action: 'Checklist updated', document: '12/18 items completed', time: '5 hours ago', type: 'checklist' },
  { id: 4, action: 'Document uploaded', document: 'Manufacturing_Process_SOP.pdf', time: '1 day ago', type: 'upload' },
  { id: 5, action: 'Certification roadmap started', document: 'Water Bottle — IS 10987', time: '2 days ago', type: 'roadmap' },
];
