import { MOCK_STANDARDS, MOCK_STANDARDS_ELECTRICAL, Standard } from '@/data/standards';

// ─── Category Detection ───────────────────────────────────────────────────────
const KEYWORD_MAP: Record<string, string[]> = {
  water_bottle: ['water bottle', 'water flask', 'stainless steel bottle', 'drinking vessel', 'thermos', 'vacuum bottle', 'flask'],
  electrical:   ['electrical', 'electric', 'appliance', 'wiring', 'circuit', 'motor', 'plug', 'socket', 'led', 'light', 'lighting', 'lamp', 'bulb', 'fixture', 'extension cord'],
  food:         ['food', 'beverage', 'drink', 'edible', 'kitchen', 'utensil', 'cookware', 'cooker', 'pressure'],
  steel:        ['steel', 'stainless', 'metal', 'iron', 'alloy', 'bottle'],
};

function detectCategory(query: string): string {
  const lower = query.toLowerCase();
  for (const [category, keywords] of Object.entries(KEYWORD_MAP)) {
    if (keywords.some((kw) => lower.includes(kw))) return category;
  }
  return 'general';
}

// ─── Analysis Steps (exported for the loading UI) ─────────────────────────────
export const FIND_STANDARD_STEPS = [
  'Parsing product description',
  'Identifying product category',
  'Matching applicable standards',
  'Ranking by relevance',
] as const;

// ─── Service ──────────────────────────────────────────────────────────────────

/**
 * Simulates an AI-powered standard discovery.
 * In production, this would call the RAG backend.
 * @param query   Plain-language product description
 * @param onStep  Callback called as each analysis step completes (0-indexed)
 */
export async function findApplicableStandards(
  query: string,
  onStep?: (step: number) => void,
): Promise<Standard[]> {
  if (!query.trim()) return [];

  // Simulate step-by-step analysis
  for (let i = 0; i < FIND_STANDARD_STEPS.length; i++) {
    await new Promise((r) => setTimeout(r, 420));
    onStep?.(i + 1);
  }

  // Brief final pause
  await new Promise((r) => setTimeout(r, 300));

  const category = detectCategory(query);

  if (category === 'electrical') return MOCK_STANDARDS_ELECTRICAL;
  if (category === 'water_bottle' || category === 'steel' || category === 'food') return MOCK_STANDARDS;

  // For truly unknown queries, return no results (demo: realistic "no match" state)
  return [];
}

export async function getStandardById(id: string): Promise<Standard | null> {
  await new Promise((r) => setTimeout(r, 200));
  return [...MOCK_STANDARDS, ...MOCK_STANDARDS_ELECTRICAL].find((s) => s.id === id) ?? null;
}
