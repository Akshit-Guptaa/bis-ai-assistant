'use client';

import { useState } from 'react';
import Link from 'next/link';
import { findApplicableStandards, FIND_STANDARD_STEPS } from '@/services/mockStandardService';
import { Standard } from '@/data/standards';
import { PageShell, PageHeader, DemoBadge, EmptyState, InfoBanner, Spinner } from '@/components/ui';

const EXAMPLE_QUERIES = [
  'Stainless steel water bottle used for drinking water',
  'LED lighting fixture for indoor use',
  'Electrical extension cord for household use',
  'Pressure cooker for domestic cooking',
];

function RelevancePill({ label }: { label: string }) {
  const map = {
    High:   { bg: '#dcfce7', color: '#15803d' },
    Medium: { bg: '#fef3c7', color: '#b45309' },
    Low:    { bg: '#f1f5f9', color: '#64748b' },
  } as Record<string, { bg: string; color: string }>;
  const s = map[label] ?? map.Low;
  return (
    <span style={{ padding: '3px 9px', borderRadius: 100, fontSize: 11, fontWeight: 700, background: s.bg, color: s.color }}>
      {label === 'High' ? '●' : label === 'Medium' ? '◎' : '○'} {label} Relevance
    </span>
  );
}

function StandardResult({ std, onViewEvidence }: { std: Standard; onViewEvidence: (s: Standard) => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bis-card" style={{ padding: 22, marginBottom: 14 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 800, color: '#0f2d6b', background: '#eff6ff', padding: '3px 9px', borderRadius: 5, border: '1px solid #bfdbfe' }}>
            {std.id}
          </span>
          <RelevancePill label={std.relevanceLabel} />
          <span className={`badge ${std.status === 'Active' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: 10 }}>{std.status}</span>
          <DemoBadge />
        </div>
        <span style={{ fontSize: 11, color: '#94a3b8', flexShrink: 0 }}>Updated {std.lastUpdated}</span>
      </div>

      <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 4, lineHeight: 1.4 }}>{std.title}</h3>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#0a7ea4', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>{std.category}</div>

      {/* Relevance bar */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b', marginBottom: 4 }}>
          <span style={{ fontWeight: 600 }}>AI Relevance Score</span>
          <span style={{ fontWeight: 800, color: '#0f172a' }}>{std.relevanceScore}%</span>
        </div>
        <div style={{ height: 5, background: '#f1f5f9', borderRadius: 100 }}>
          <div style={{
            height: '100%', borderRadius: 100,
            width: `${std.relevanceScore}%`,
            background: std.relevanceScore > 70 ? '#15803d' : std.relevanceScore > 40 ? '#d97706' : '#94a3b8',
          }} />
        </div>
      </div>

      <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, marginBottom: 14 }}>{std.whyRelevant}</p>

      {/* Evidence ref */}
      <div className="evidence-card" style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', marginBottom: 3 }}>Source Reference (Demo)</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>{std.evidenceRef}</div>
        <div style={{ fontSize: 11, color: '#0a7ea4', fontWeight: 600, marginTop: 2 }}>§ {std.clause}</div>
      </div>

      {/* Requirements toggle */}
      <button onClick={() => setExpanded(!expanded)} className="btn btn-ghost btn-sm" style={{ marginBottom: expanded ? 10 : 0 }}>
        {expanded ? '▾ Hide' : '▸ View'} Key Requirements ({std.keyRequirements.length})
      </button>

      {expanded && (
        <ul style={{ margin: '0 0 14px', padding: '0 0 0 18px', display: 'grid', gap: 6 }}>
          {std.keyRequirements.map((req) => (
            <li key={req} style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>{req}</li>
          ))}
        </ul>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', borderTop: '1px solid #f8f9fb', paddingTop: 14, marginTop: 4 }}>
        <button className="btn btn-outline btn-sm" onClick={() => onViewEvidence(std)}>🔍 View Evidence</button>
        <Link href="/dashboard/compliance"><button className="btn btn-outline btn-sm">⚡ Analyze Compliance</button></Link>
        <Link href="/dashboard/roadmap"><button className="btn btn-primary btn-sm">Start Certification →</button></Link>
      </div>
    </div>
  );
}

function EvidencePanel({ std, onClose }: { std: Standard; onClose: () => void }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex' }} onClick={onClose}>
      <div style={{ flex: 1, background: 'rgba(15,23,42,0.4)' }} />
      <div
        style={{ width: 440, background: 'white', boxShadow: '-4px 0 24px rgba(0,0,0,0.12)', overflowY: 'auto', animation: 'slideInRight 0.25s ease' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid #f1f5f9', position: 'sticky', top: 0, background: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="page-eyebrow">Evidence Detail</div>
              <h2 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a' }}>{std.id}</h2>
            </div>
            <button onClick={onClose} style={{ background: '#f1f5f9', border: 'none', borderRadius: 7, width: 34, height: 34, cursor: 'pointer', fontSize: 18, color: '#64748b' }}>×</button>
          </div>
        </div>

        <div style={{ padding: 24, display: 'grid', gap: 16 }}>
          <DemoBadge />

          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 3 }}>{std.title}</div>
            <div style={{ fontSize: 12, color: '#0a7ea4' }}>{std.category}</div>
          </div>

          <div className="evidence-card">
            <div style={{ fontSize: 12, fontWeight: 800, color: '#0f2d6b', marginBottom: 4 }}>{std.evidenceRef}</div>
            <div style={{ fontSize: 11, color: '#0a7ea4', fontWeight: 700, marginBottom: 10 }}>§ {std.clause}</div>
            <div style={{ fontSize: 12, color: '#374151', fontStyle: 'italic', lineHeight: 1.7, background: 'white', padding: '10px 12px', borderRadius: 6 }}>
              "The material used shall be of food-contact grade stainless steel conforming to the applicable grade requirements of IS 6911, with surface finish, dimensional accuracy and mechanical performance as specified in this standard." <span style={{ fontStyle: 'normal', color: '#94a3b8' }}>[Demo — Simulated Clause]</span>
            </div>
          </div>

          <div style={{ background: '#f8f9fb', border: '1px solid #e2e8f0', borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>Key Requirements</div>
            {std.keyRequirements.map((r) => (
              <div key={r} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
                <span style={{ color: '#15803d', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 13, color: '#475569', lineHeight: 1.4 }}>{r}</span>
              </div>
            ))}
          </div>

          <InfoBanner variant="warning">Demo reference only. Always consult the official BIS standard document.</InfoBanner>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Link href="/dashboard/checklist"><button className="btn btn-primary btn-full" style={{ justifyContent: 'center' }}>✅ Add to Checklist</button></Link>
            <Link href="/dashboard/roadmap"><button className="btn btn-outline btn-full" style={{ justifyContent: 'center' }}>📍 View Certification Roadmap</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalysisLoader({ step }: { step: number }) {
  return (
    <div className="bis-card" style={{ padding: '32px 28px', textAlign: 'center' }}>
      <Spinner size={32} />
      <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginTop: 16, marginBottom: 6 }}>Analyzing product description…</div>
      <div style={{ fontSize: 13, color: '#64748b', marginBottom: 24 }}>Matching against BIS standards catalog</div>
      <div style={{ display: 'inline-grid', gap: 10, textAlign: 'left' }}>
        {FIND_STANDARD_STEPS.map((s, i) => {
          const done   = step > i + 1;
          const active = step === i + 1;
          return (
            <div key={s} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}
                className={done ? 'analysis-step-done' : active ? 'analysis-step-active' : 'analysis-step-idle'}>
                {done ? '✓' : active ? <Spinner size={11} /> : i + 1}
              </div>
              <span style={{ fontSize: 13, color: done ? '#15803d' : active ? '#0f172a' : '#94a3b8', fontWeight: active ? 600 : 400 }}>{s}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function FindStandardPage() {
  const [query,   setQuery]   = useState('');
  const [loading, setLoading] = useState(false);
  const [step,    setStep]    = useState(0);
  const [results, setResults] = useState<Standard[]>([]);
  const [searched, setSearched] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<Standard | null>(null);

  const handleFind = async (q?: string) => {
    const text = (q ?? query).trim();
    if (!text) return;
    setQuery(text);
    setLoading(true);
    setStep(0);
    setSearched(true);
    setResults([]);
    const res = await findApplicableStandards(text, (s) => setStep(s));
    setResults(res);
    setLoading(false);
  };

  return (
    <PageShell maxWidth={880}>
      <PageHeader
        eyebrow="Standard Discovery"
        title="Find the Applicable Standard"
        subtitle="Describe your product in plain language. The AI identifies relevant Indian Standards with clause-level evidence."
      />

      {/* Input */}
      <div className="bis-card" style={{ padding: 20, marginBottom: 24 }}>
        <label className="field-label" htmlFor="product-desc">Product Description</label>
        <textarea
          id="product-desc" className="input"
          style={{ minHeight: 88, marginTop: 6, marginBottom: 14 }}
          placeholder="e.g. Stainless steel water bottle for drinking water, 750ml capacity, screw lid"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleFind(); } }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Try an example:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {EXAMPLE_QUERIES.map((ex) => (
                <button key={ex} onClick={() => handleFind(ex)}
                  style={{ background: '#f8f9fb', border: '1px solid #e2e8f0', borderRadius: 100, padding: '4px 11px', fontSize: 11, color: '#475569', cursor: 'pointer' }}>
                  {ex}
                </button>
              ))}
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => handleFind()} disabled={loading || !query.trim()} style={{ flexShrink: 0 }}>
            {loading ? <><Spinner size={14} /> Analyzing…</> : '🔍 Find Standards'}
          </button>
        </div>
      </div>

      {/* States */}
      {loading && <AnalysisLoader step={step} />}

      {!loading && searched && results.length === 0 && (
        <div className="bis-card">
          <EmptyState
            icon="🔍"
            title="No standards matched"
            description="No standards matched this description in the demo dataset. Try 'stainless steel water bottle' or 'LED lighting fixture', or ask the AI Assistant."
            action={<Link href="/dashboard/assistant"><button className="btn btn-primary">Ask AI Assistant →</button></Link>}
          />
        </div>
      )}

      {!loading && results.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{results.length} standard{results.length !== 1 ? 's' : ''} found</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>For: "{query}"</div>
            </div>
            <DemoBadge />
          </div>
          {results.map((std) => <StandardResult key={std.id} std={std} onViewEvidence={setSelectedEvidence} />)}

          <InfoBanner variant="info">
            Standards shown are demo data. In production, this query is processed by the RAG pipeline against the official BIS standards corpus.
          </InfoBanner>
        </div>
      )}

      {selectedEvidence && <EvidencePanel std={selectedEvidence} onClose={() => setSelectedEvidence(null)} />}
    </PageShell>
  );
}
