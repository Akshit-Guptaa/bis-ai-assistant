export interface BISService {
  id: string;
  name: string;
  icon: string;
  description: string;
  whenToUse: string;
  nextAction: string;
  category: string;
  color: string;
}

export const MOCK_BIS_SERVICES: BISService[] = [
  {
    id: 'svc-001',
    name: 'Indian Standards',
    icon: '📋',
    description: 'Access the complete catalog of Indian Standards (IS) published by BIS. Search, browse, and purchase standards relevant to your product category.',
    whenToUse: 'Use this when you need to identify, read, or purchase the official text of an Indian Standard applicable to your product.',
    nextAction: 'Search Standards Catalog',
    category: 'Standards',
    color: '#1e3a5f',
  },
  {
    id: 'svc-002',
    name: 'Product Certification',
    icon: '✅',
    description: 'Apply for the ISI Mark (Scheme I) for products under mandatory or voluntary certification. Covers testing, factory audit, and license grant process.',
    whenToUse: 'Use this when your product requires ISI marking — either mandatorily (under CGPDTM/BIS orders) or voluntarily for market confidence.',
    nextAction: 'Apply for ISI Mark',
    category: 'Certification',
    color: '#0f5132',
  },
  {
    id: 'svc-003',
    name: 'Licensing',
    icon: '📜',
    description: 'Manage your BIS license — check renewal dates, update factory information, add new products under existing license, or view license history.',
    whenToUse: 'Use this when you already hold a BIS license and need to renew, update, or expand your existing certification.',
    nextAction: 'Manage Licenses',
    category: 'Licensing',
    color: '#5a1e91',
  },
  {
    id: 'svc-004',
    name: 'Testing & Laboratories',
    icon: '🔬',
    description: 'Find BIS-recognized and NABL-accredited laboratories for product testing. Locate labs near you, check scope of accreditation, and understand test requirements.',
    whenToUse: 'Use this when you need to identify a laboratory for mandatory product testing before applying for BIS certification.',
    nextAction: 'Find Testing Lab',
    category: 'Testing',
    color: '#8b4513',
  },
  {
    id: 'svc-005',
    name: 'Hallmarking',
    icon: '🥇',
    description: 'Information about BIS Hallmarking for gold and silver jewellery. Find hallmarking centres, understand the process, and verify hallmarked articles.',
    whenToUse: 'Use this if you manufacture, sell, or want to verify gold/silver jewellery. Hallmarking is mandatory for certain gold/silver jewellery in India.',
    nextAction: 'Explore Hallmarking',
    category: 'Hallmarking',
    color: '#7b5c00',
  },
  {
    id: 'svc-006',
    name: 'Consumer Services',
    icon: '👤',
    description: 'For consumers to verify product certifications, file complaints about non-compliant products, and check if a product is genuinely ISI-marked.',
    whenToUse: 'Use this to verify if a product\'s ISI mark is genuine, or to report products that claim certification but may not be compliant.',
    nextAction: 'Verify Product',
    category: 'Consumer',
    color: '#1a5276',
  },
];
