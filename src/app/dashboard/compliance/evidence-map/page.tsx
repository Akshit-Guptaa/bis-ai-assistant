'use client';

import Link from 'next/link';

const FLOW_NODES = [
  {
    label: 'Product Document',
    icon: '📄',
    desc: 'Product_Specification_WaterBottle_v1.2.pdf',
    detail: 'Uploaded specification document analyzed for compliance requirements.',
    color: '#0f2d6b',
    bg: '#eff6ff',
  },
  {
    label: 'Extracted Requirements',
    icon: '📋',
    desc: '18 requirements extracted across 7 categories',
    detail: 'Material grade, surface finish, capacity tolerance, performance tests, labelling, certification, QMS.',
    color: '#0a7ea4',
    bg: '#f0f9ff',
  },
  {
    label: 'Applicable Standard',
    icon: '⚖️',
    desc: 'IS 10987 — Stainless Steel Kitchenware and Utensils',
    detail: 'Primary standard matched. Secondary standard IS 14543 also identified for sealed vessels.',
    color: '#15803d',
    bg: '#f0fdf4',
  },
  {
    label: 'Source Evidence',
    icon: '🔍',
    desc: 'Clause 5.1, 5.3, 6.2, 7.2, 8.4, 8.5, 10 — Demo Reference',
    detail: 'Specific clauses from IS 10987 and IS 14543 matched to each extracted requirement.',
    color: '#7c3aed',
    bg: '#f5f3ff',
  },
  {
    label: 'Compliance Status',
    icon: '📊',
    desc: '12 Supported · 4 Potential Gaps · 2 Needs Verification',
    detail: 'Gaps identified in: drop test, corrosion test, leakage test, and labelling requirements.',
    color: '#b45309',
    bg: '#fffbeb',
  },
  {
    label: 'Recommended Actions',
    icon: '✅',
    desc: 'Conduct drop test, salt spray test, update labelling, apply for ISI mark',
    detail: 'Prioritized action list generated from gap analysis. High-priority items require laboratory testing.',
    color: '#0f2d6b',
    bg: '#eff6ff',
  },
];

const EVIDENCE_LINKS = [
  { req: 'Material grade specification', standard: 'IS 10987', clause: '§ 5.1', status: 'supported' },
  { req: 'Food-safe surface finish', standard: 'IS 10987', clause: '§ 5.3', status: 'supported' },
  { req: 'Capacity declaration (±2%)', standard: 'IS 10987', clause: '§ 6.2', status: 'supported' },
  { req: 'Drop resistance test', standard: 'IS 10987', clause: '§ 8.4', status: 'gap' },
  { req: 'Corrosion resistance test', standard: 'IS 10987', clause: '§ 8.5', status: 'gap' },
  { req: 'Leakage test at 1.5x pressure', standard: 'IS 14543', clause: '§ 9.1', status: 'gap' },
  { req: 'Mandatory marking on product', standard: 'IS 10987', clause: '§ 10', status: 'gap' },
  { req: 'BIS license verification', standard: 'BIS Scheme I', clause: '§ 5', status: 'needs_verification' },
  { req: 'Third-party test report', standard: 'BIS Scheme I', clause: '§ 4.2', status: 'needs_verification' },
];

const STATUS_MAP = {
  supported: { label: '✓ Supported', color: '#15803d', bg: '#dcfce7' },
  gap: { label: '⚠ Gap', color: '#b45309', bg: '#fef3c7' },
  needs_verification: { label: '? Verify', color: '#1d4ed8', bg: '#dbeafe' },
};

export default function EvidenceMapPage() {
  return (
    <div style={{ padding: '32px 32px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div className="page-eyebrow" style={{ marginBottom: 4 }}>Evidence Map</div>
          <h1 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, color: '#0f172a', letterSpacing: -0.5, marginBottom: 8 }}>
            Compliance Evidence Map
          </h1>
          <p style={{ color: '#64748b', fontSize: 15, lineHeight: 1.6, maxWidth: 600 }}>
            Visual trace from uploaded document through extracted requirements, applicable standards, source evidence, compliance status, and recommended actions.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <span className="demo-badge">MOCK DATA</span>
          <Link href="/dashboard/compliance">
            <button className="btn btn-ghost btn-sm">← Back to Analyzer</button>
          </Link>
          <Link href="/dashboard/checklist">
            <button className="btn btn-primary btn-sm">Generate Checklist →</button>
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 32, alignItems: 'start' }}>
        {/* Flow diagram */}
        <div>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>Evidence Flow</h2>
          {FLOW_NODES.map((node, i) => (
            <div key={node.label}>
              <div style={{
                display: 'flex', gap: 16, alignItems: 'flex-start',
                background: node.bg, border: `1px solid ${node.color}22`,
                borderLeft: `4px solid ${node.color}`,
                borderRadius: '0 12px 12px 0',
                padding: '16px 20px',
                transition: 'transform 0.15s',
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 10, background: node.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, flexShrink: 0, color: 'white',
                }}>
                  {node.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: node.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
                    {node.label}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 4, lineHeight: 1.3 }}>
                    {node.desc}
                  </div>
                  <div style={{ fontSize: 11, color: '#64748b', lineHeight: 1.5 }}>{node.detail}</div>
                </div>
              </div>
              {i < FLOW_NODES.length - 1 && (
                <div style={{
                  width: 2, height: 24, marginLeft: 37,
                  background: `linear-gradient(to bottom, ${node.color}, ${FLOW_NODES[i + 1].color})`,
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Evidence table */}
        <div>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>
            Requirement → Evidence Mapping
            <span className="demo-badge" style={{ marginLeft: 10, verticalAlign: 'middle' }}>Demo Reference</span>
          </h2>

          <div className="bis-card" style={{ overflow: 'hidden', marginBottom: 24 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                  {['Requirement', 'Standard', 'Clause', 'Status'].map((h) => (
                    <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.8, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EVIDENCE_LINKS.map((row, i) => {
                  const s = STATUS_MAP[row.status as keyof typeof STATUS_MAP];
                  return (
                    <tr key={row.req}
                      style={{ borderTop: i === 0 ? 'none' : '1px solid #f8f9fb' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#fafbff')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={{ padding: '12px 14px', fontWeight: 500, color: '#0f172a', lineHeight: 1.3 }}>{row.req}</td>
                      <td style={{ padding: '12px 14px', color: '#0a7ea4', fontWeight: 600, whiteSpace: 'nowrap' }}>{row.standard}</td>
                      <td style={{ padding: '12px 14px', color: '#7c3aed', fontWeight: 600, whiteSpace: 'nowrap', fontFamily: 'monospace' }}>{row.clause}</td>
                      <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                        <span style={{ padding: '3px 8px', borderRadius: 100, fontSize: 10, fontWeight: 700, background: s.bg, color: s.color }}>
                          {s.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="bis-card" style={{ padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 14 }}>Evidence Summary</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
              {[
                { n: 9, l: 'Requirements Mapped', c: '#0f2d6b', b: '#eff6ff' },
                { n: 2, l: 'Standards Referenced', c: '#15803d', b: '#f0fdf4' },
                { n: 7, l: 'Clauses Cited', c: '#7c3aed', b: '#f5f3ff' },
              ].map((s) => (
                <div key={s.l} style={{ background: s.b, borderRadius: 8, padding: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: s.c }}>{s.n}</div>
                  <div style={{ fontSize: 10, color: '#64748b', marginTop: 3, fontWeight: 600, lineHeight: 1.3 }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: 12, background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, fontSize: 11, color: '#92400e', lineHeight: 1.5 }}>
              ⚠ All evidence is mock/demo data. In the full system, each clause reference links to the official BIS standard document. This map demonstrates the evidence-first compliance workflow.
            </div>
          </div>

          {/* Actions */}
          <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/dashboard/checklist">
              <button className="btn btn-primary">✅ Generate Checklist</button>
            </Link>
            <Link href="/dashboard/roadmap">
              <button className="btn btn-outline">🗺️ Certification Roadmap</button>
            </Link>
            <Link href="/dashboard/assistant">
              <button className="btn btn-ghost">💬 Ask AI Assistant</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
