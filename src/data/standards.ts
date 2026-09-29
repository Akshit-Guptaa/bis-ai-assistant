export interface Standard {
  id: string;
  title: string;
  category: string;
  relevanceScore: number;
  relevanceLabel: 'High' | 'Medium' | 'Low';
  whyRelevant: string;
  keyRequirements: string[];
  status: 'Active' | 'Under Revision' | 'Withdrawn';
  evidenceRef: string;
  clause: string;
  lastUpdated: string;
}

export const MOCK_STANDARDS: Standard[] = [
  {
    id: 'IS-14543',
    title: 'Specification for Stainless Steel Pressure Cookers',
    category: 'Household Appliances',
    relevanceScore: 92,
    relevanceLabel: 'High',
    whyRelevant: 'Covers stainless steel cookware including vessels used for food and drinking water storage. Material composition, finish, and safety requirements are directly applicable.',
    keyRequirements: [
      'Grade of stainless steel (304 / 316)',
      'Surface finish and food-grade compliance',
      'Capacity and dimensional tolerances',
      'Leakage and pressure tests',
      'Marking and labelling requirements',
    ],
    status: 'Active',
    evidenceRef: 'Demo Evidence — BIS Standard IS 14543',
    clause: 'Clause 4.1 — Material Requirements',
    lastUpdated: '2022-03',
  },
  {
    id: 'IS-10987',
    title: 'Stainless Steel Kitchenware and Utensils',
    category: 'Kitchenware',
    relevanceScore: 88,
    relevanceLabel: 'High',
    whyRelevant: 'Directly applicable to stainless steel water bottles and containers intended for food/beverage contact. Specifies acceptable grades, finishes, and tests.',
    keyRequirements: [
      'Stainless steel grade AISI 304 or higher',
      'Food-safe surface coating',
      'Capacity declaration accuracy (±2%)',
      'Drop and impact resistance',
      'Cleaning and corrosion resistance test',
    ],
    status: 'Active',
    evidenceRef: 'Demo Evidence — BIS Standard IS 10987',
    clause: 'Clause 5 — Performance Requirements',
    lastUpdated: '2021-07',
  },
  {
    id: 'IS-4736',
    title: 'Hot Dip Zinc Coatings on Iron and Steel Articles',
    category: 'Coatings & Surface Treatment',
    relevanceScore: 34,
    relevanceLabel: 'Low',
    whyRelevant: 'Tangentially relevant if the product involves coated components. Not directly applicable to pure stainless steel bottles.',
    keyRequirements: [
      'Minimum coating thickness',
      'Adhesion test methods',
      'Corrosion resistance',
    ],
    status: 'Active',
    evidenceRef: 'Demo Evidence — BIS Standard IS 4736',
    clause: 'Clause 3 — Coating Requirements',
    lastUpdated: '2019-11',
  },
];

export const MOCK_STANDARDS_ELECTRICAL: Standard[] = [
  {
    id: 'IS-302-1',
    title: 'Safety of Household and Similar Electrical Appliances — General Requirements',
    category: 'Electrical Safety',
    relevanceScore: 95,
    relevanceLabel: 'High',
    whyRelevant: 'Mandatory standard for all household electrical appliances sold in India. Covers insulation, earthing, overload protection and more.',
    keyRequirements: [
      'Insulation resistance ≥ 1 MΩ',
      'Dielectric strength test at 1250V',
      'Earthing continuity',
      'Temperature rise limits',
      'Mechanical strength',
    ],
    status: 'Active',
    evidenceRef: 'Demo Evidence — BIS Standard IS 302-1',
    clause: 'Clause 6 — Classification',
    lastUpdated: '2023-01',
  },
];
