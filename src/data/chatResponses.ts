export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  standardCards?: StandardCard[];
  evidenceCards?: EvidenceCard[];
  actionButtons?: ActionButton[];
  followUpQuestions?: string[];
}

export interface StandardCard {
  id: string;
  title: string;
  relevance: string;
  explanation: string;
}

export interface EvidenceCard {
  document: string;
  section: string;
  excerpt: string;
  label: string;
}

export interface ActionButton {
  label: string;
  action: string;
  variant: 'primary' | 'outline';
}

export const MOCK_CHAT_RESPONSES: Record<string, Omit<ChatMessage, 'id' | 'role' | 'timestamp'>> = {
  water_bottle: {
    content:
      'Based on your product description — stainless steel water bottles for drinking water — the following Indian Standards should be reviewed. These are **demo/mock references** to illustrate how the system identifies applicable standards.',
    standardCards: [
      {
        id: 'IS-10987',
        title: 'Stainless Steel Kitchenware and Utensils',
        relevance: 'High (88%)',
        explanation:
          'Directly applicable to stainless steel containers intended for food/beverage contact. Specifies acceptable grades, finishes, and performance tests.',
      },
      {
        id: 'IS-14543',
        title: 'Specification for Stainless Steel Pressure Cookers',
        relevance: 'High (92%)',
        explanation:
          'Covers material composition and safety requirements for stainless steel vessels including water storage applications.',
      },
    ],
    evidenceCards: [
      {
        document: 'BIS Standard IS 10987 (Demo Reference)',
        section: 'Clause 5 — Performance Requirements',
        excerpt: 'The material used shall be of grade AISI 304 or higher, suitable for food contact...',
        label: 'Demo Evidence',
      },
      {
        document: 'BIS Standard IS 14543 (Demo Reference)',
        section: 'Clause 4.1 — Material Requirements',
        excerpt: 'Stainless steel used shall conform to the requirements of IS 6911 for food-grade applications...',
        label: 'Demo Evidence',
      },
    ],
    actionButtons: [
      { label: 'View Evidence', action: 'view_evidence', variant: 'outline' },
      { label: 'Start Compliance Roadmap', action: 'start_roadmap', variant: 'primary' },
      { label: 'Generate Checklist', action: 'generate_checklist', variant: 'outline' },
    ],
    followUpQuestions: [
      'What testing is required for IS 10987?',
      'How do I apply for BIS certification for kitchenware?',
      'What documentation is needed for the ISI mark?',
      'Are there any exemptions for small manufacturers?',
    ],
  },
  certification_docs: {
    content:
      'For BIS certification of most consumer products, the following documents are typically required. **These are general guidance references — always verify with the official BIS portal.**',
    standardCards: [],
    evidenceCards: [
      {
        document: 'BIS Certification Scheme I — General Guidance (Demo Reference)',
        section: 'Section 3 — Application Requirements',
        excerpt: 'The manufacturer shall furnish a valid test report from a BIS-recognized laboratory along with the application...',
        label: 'Demo Reference',
      },
    ],
    actionButtons: [
      { label: 'Open BIS Services', action: 'bis_services', variant: 'primary' },
      { label: 'Start Certification Roadmap', action: 'start_roadmap', variant: 'outline' },
    ],
    followUpQuestions: [
      'Which laboratories are recognized by BIS?',
      'How long does the certification process take?',
      'What are the fees for BIS certification?',
    ],
  },
  isi_mark: {
    content:
      'The ISI mark is mandatory for certain products under the BIS Compulsory Registration Scheme (CRS) or Mandatory Certification Scheme (ISI). To check if your product requires it:\n\n1. **Check the Product Manuals:** BIS publishes product manuals for all items under mandatory certification.\n2. **Search the BIS Portal:** The official BIS website maintains a list of products under mandatory certification.\n\n**Note: This is a demo environment.** For this demo, you can use our Find Standard tool to explore mock data.',
    standardCards: [],
    evidenceCards: [
      {
        document: 'BIS Compulsory Certification Guidelines (Demo Reference)',
        section: 'Annexure 1 — Mandatory List',
        excerpt: 'Products falling under the mandatory list must obtain a valid BIS license before manufacturing, importing, or selling in the Indian market...',
        label: 'Demo Reference',
      },
    ],
    actionButtons: [
      { label: 'Find a Standard', action: 'find_standard', variant: 'primary' },
      { label: 'Start Compliance Roadmap', action: 'start_roadmap', variant: 'outline' },
    ],
    followUpQuestions: [
      'What happens if I sell without an ISI mark?',
      'How long is the ISI mark license valid?',
    ],
  },
  indian_standards: {
    content:
      'Indian Standards (IS) are formulated by the Bureau of Indian Standards (BIS) to ensure the quality, safety, and reliability of products and services. There are over 21,000+ standards across various sectors.\n\nSince "Indian standards" is a broad topic, how would you like to proceed? You can search for a specific product, or ask about the certification process.\n\n**Note: This is a demo environment using sample data.**',
    standardCards: [],
    evidenceCards: [],
    actionButtons: [
      { label: 'Search for a Product Standard', action: 'find_standard', variant: 'primary' },
      { label: 'Explore BIS Services', action: 'bis_services', variant: 'outline' },
    ],
    followUpQuestions: [
      'Which standard applies to stainless steel water bottles?',
      'How do I check if my product needs ISI mark?',
      'What documents are required for certification?',
    ],
  },
  compliance: {
    content:
      'Compliance with Indian Standards typically involves product testing at a BIS-recognized laboratory, submitting an application with necessary documents, and a possible factory inspection.\n\nWould you like to analyze a specific compliance document or generate a checklist for your product?\n\n**Note: This is a demo environment.**',
    standardCards: [],
    evidenceCards: [],
    actionButtons: [
      { label: 'Open Compliance Analyzer', action: 'analyze_compliance', variant: 'primary' },
      { label: 'Generate Checklist', action: 'generate_checklist', variant: 'outline' },
    ],
    followUpQuestions: [
      'What documents are required for certification?',
      'How do I get an ISI mark for my product?',
    ],
  },
  default: {
    content:
      'I can help you find applicable Indian Standards, analyze compliance requirements, and guide you through certification processes. Please describe your product or ask a specific question about BIS standards. **Note: This is a demo environment — all responses use mock data.**',
    standardCards: [],
    evidenceCards: [],
    actionButtons: [
      { label: 'Find a Standard', action: 'find_standard', variant: 'primary' },
      { label: 'Browse BIS Services', action: 'bis_services', variant: 'outline' },
    ],
    followUpQuestions: [
      'Which standard applies to stainless steel water bottles?',
      'What documents are required for certification?',
      'How do I check if my product needs ISI mark?',
    ],
  },
};
