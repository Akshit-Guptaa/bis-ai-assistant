'use client';

import { useState } from 'react';

const ROADMAP_STEPS = [
  {
    n: '01',
    title: 'Understand Your Product',
    status: 'completed',
    desc: 'Define the product category, intended use, materials, and specifications.',
    details: [
      'Prepare complete product description',
      'Define product specifications (dimensions, materials, capacity)',
      'Identify product category and end-use',
      'Understand market and regulatory context',
    ],
    timeframe: 'Week 1',
    evidence: 'Internal product documentation',
  },
  {
    n: '02',
    title: 'Identify Applicable Standard',
    status: 'completed',
    desc: 'Find the relevant Indian Standard (IS) that applies to your product.',
    details: [
      'Use BIS AI Assistant to identify applicable IS',
      'Review standard scope and applicability',
      'Purchase official standard document from BIS',
      'Identify if certification is mandatory or voluntary',
    ],
    timeframe: 'Week 1-2',
    evidence: 'IS 10987 — Stainless Steel Kitchenware (Demo Reference)',
  },
  {
    n: '03',
    title: 'Review Requirements',
    status: 'active',
    desc: 'Thoroughly review material, performance, testing and documentation requirements.',
    details: [
      'Read all clauses of the applicable standard',
      'Identify mandatory requirements vs. optional',
      'Conduct preliminary compliance gap analysis',
      'Note testing requirements and laboratory specifications',
    ],
    timeframe: 'Week 2-3',
    evidence: 'IS 10987 Clauses 4-10 (Demo Reference)',
  },
  {
    n: '04',
    title: 'Prepare Documentation',
    status: 'pending',
    desc: 'Prepare all technical documentation required for certification application.',
    details: [
      'Technical specification document',
      'Manufacturing process documentation',
      'Quality control plan',
      'Factory layout and equipment list',
      'Undertaking as per BIS requirements',
    ],
    timeframe: 'Week 3-4',
    evidence: 'BIS Scheme I Documentation Checklist (Demo Reference)',
  },
  {
    n: '05',
    title: 'Testing & Laboratory',
    status: 'pending',
    desc: 'Conduct required tests at a BIS-recognized, NABL-accredited laboratory.',
    details: [
      'Identify NABL-accredited BIS-recognized laboratory',
      'Submit product samples for testing',
      'Obtain test report covering all applicable requirements',
      'Verify test report format meets BIS specifications',
    ],
    timeframe: 'Week 4-7',
    evidence: 'BIS Laboratory Recognition List (Demo Reference)',
  },
  {
    n: '06',
    title: 'BIS Application & Audit',
    status: 'pending',
    desc: 'Submit the certification application and undergo factory audit by BIS.',
    details: [
      'Submit application on BIS online portal (bis.gov.in)',
      'Pay prescribed application fees',
      'Facilitate factory audit by BIS officer',
      'Address any non-conformities raised',
    ],
    timeframe: 'Week 7-12',
    evidence: 'BIS Act 2016, Section 17 (Demo Reference)',
  },
];

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  completed: { bg: '#f0fdf4', text: '#15803d', label: '✓ Completed' },
  active:    { bg: '#eff6ff', text: '#1d4ed8', label: '→ In Progress' },
  pending:   { bg: '#f8f9fb', text: '#94a3b8', label: '○ Pending' },
};

export default function RoadmapPage() {
  const [selected, setSelected] = useState<(typeof ROADMAP_STEPS)[0] | null>(null);

  return (
    <div style={{ padding: '32px 32px', maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <div className="page-eyebrow" style={{ marginBottom: 4 }}>Certification</div>
        <h1 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, color: '#0f172a', letterSpacing: -0.5, marginBottom: 8 }}>
          Certification Roadmap
        </h1>
        <p style={{ color: '#64748b', fontSize: 15, lineHeight: 1.6, maxWidth: 640 }}>
          Step-by-step guidance for BIS certification. This roadmap provides general orientation — always verify current requirements with BIS.
        </p>

        <div style={{ marginTop: 12, padding: '10px 16px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#92400e' }}>
          ⚠ This assistant provides guidance only. It does not provide official BIS approval or certification.
        </div>
      </div>

      {/* Progress */}
      <div className="bis-card" style={{ padding: 20, marginBottom: 32, display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>Overall Progress</div>
          <div style={{ height: 8, background: '#f1f5f9', borderRadius: 100 }}>
            <div style={{ height: '100%', width: '33.3%', background: 'linear-gradient(90deg, #0f2d6b, #0a7ea4)', borderRadius: 100 }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {[{ n: 2, l: 'Completed', c: '#15803d' }, { n: 1, l: 'Active', c: '#1d4ed8' }, { n: 3, l: 'Pending', c: '#94a3b8' }].map((s) => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: s.c }}>{s.n}</div>
              <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div>
          <span className="demo-badge">DEMO ROADMAP</span>
        </div>
      </div>

      {/* Roadmap steps */}
      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: 0 }}>
        <div>
          {ROADMAP_STEPS.map((step, i) => {
            const sc = STATUS_COLORS[step.status];
            const isSelected = selected?.n === step.n;
            return (
              <div key={step.n}>
                <div
                  onClick={() => setSelected(isSelected ? null : step)}
                  style={{
                    display: 'flex', gap: 20, alignItems: 'flex-start', padding: '20px 20px',
                    background: isSelected ? '#f0f4ff' : sc.bg,
                    border: `1px solid ${isSelected ? '#c7d7ff' : '#e2e8f0'}`,
                    borderRadius: 12, marginBottom: 4,
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}
                >
                  {/* Step number */}
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: step.status === 'completed' ? '#0f2d6b' : step.status === 'active' ? '#dbeafe' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: step.status === 'completed' ? 'white' : step.status === 'active' ? '#1d4ed8' : '#94a3b8', flexShrink: 0 }}>
                    {step.status === 'completed' ? '✓' : step.n}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', lineHeight: 1.3 }}>{step.title}</h3>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: 11, background: sc.bg, color: sc.text, padding: '3px 10px', borderRadius: 100, fontWeight: 700, border: `1px solid ${sc.text}30` }}>{sc.label}</span>
                        <span style={{ fontSize: 11, color: '#94a3b8' }}>{step.timeframe}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>{step.desc}</p>
                  </div>

                  <div style={{ color: '#94a3b8', fontSize: 16, flexShrink: 0 }}>{isSelected ? '▾' : '▸'}</div>
                </div>

                {/* Connector */}
                {i < ROADMAP_STEPS.length - 1 && (
                  <div style={{ width: 2, height: 8, background: 'linear-gradient(to bottom, #0f2d6b40, #0a7ea440)', margin: '0 0 4px 43px' }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="bis-card animate-slide-right" style={{ padding: 28, marginLeft: 24, alignSelf: 'start', position: 'sticky', top: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div className="page-eyebrow" style={{ marginBottom: 4 }}>Step {selected.n}</div>
                <h2 style={{ fontSize: 17, fontWeight: 800, color: '#0f172a' }}>{selected.title}</h2>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', fontSize: 16, color: '#475569' }}>×</button>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>Tasks</div>
              {selected.details.map((d) => (
                <div key={d} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: '#0a7ea4', fontWeight: 700, fontSize: 12, flexShrink: 0, marginTop: 1 }}>→</span>
                  <span style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>{d}</span>
                </div>
              ))}
            </div>

            <div className="evidence-card" style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>Reference</div>
              <div style={{ fontSize: 12, color: '#0f172a' }}>{selected.evidence}</div>
              <span className="demo-badge" style={{ marginTop: 6, display: 'inline-block' }}>Demo Reference</span>
            </div>

            <div style={{ fontSize: 11, color: '#94a3b8', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 6, padding: 10, marginBottom: 16, lineHeight: 1.5 }}>
              This roadmap is for guidance only. Always verify requirements with official BIS documentation.
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1, justifyContent: 'center' }}>← Prev</button>
              <button className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Next →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
