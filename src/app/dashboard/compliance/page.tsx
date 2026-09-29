'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { analyzeDocument, ANALYSIS_STEPS } from '@/services/mockComplianceService';
import { ComplianceRequirement, ComplianceSummary } from '@/data/compliance';

type Phase = 'upload' | 'analyzing' | 'results';

function StatusIcon({ status }: { status: string }) {
  if (status === 'supported') return <span style={{ color: '#15803d', fontWeight: 700 }}>✓ Supported</span>;
  if (status === 'gap') return <span style={{ color: '#b45309', fontWeight: 700 }}>⚠ Potential Gap</span>;
  return <span style={{ color: '#1d4ed8', fontWeight: 700 }}>? Needs Verification</span>;
}

function DetailDrawer({ req, onClose, onAddChecklist }: { req: ComplianceRequirement; onClose: () => void; onAddChecklist: () => void }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200 }} onClick={onClose}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
      <div
        style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 480, background: 'white', overflowY: 'auto', animation: 'slideInRight 0.3s ease', boxShadow: '-8px 0 32px rgba(0,0,0,0.15)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: '24px', borderBottom: '1px solid #f1f5f9', position: 'sticky', top: 0, background: 'white', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="page-eyebrow" style={{ marginBottom: 4 }}>Requirement Detail</div>
              <h2 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', maxWidth: 360, lineHeight: 1.3 }}>{req.requirement}</h2>
            </div>
            <button onClick={onClose} style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, width: 36, height: 36, cursor: 'pointer', fontSize: 18, color: '#475569', flexShrink: 0 }}>×</button>
          </div>
        </div>

        <div style={{ padding: 24, display: 'grid', gap: 20 }}>
          {/* Status */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>Status</div>
            <div style={{ fontSize: 18 }}><StatusIcon status={req.status} /></div>
          </div>

          {/* Evidence */}
          <div className="evidence-card">
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>Document Evidence</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{req.evidence}</div>
            <div style={{ fontSize: 12, color: '#0a7ea4', fontWeight: 600 }}>§ {req.evidenceClause}</div>
            <span className="demo-badge" style={{ marginTop: 8, display: 'inline-block' }}>Demo Reference</span>
          </div>

          {/* Standard */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>Applicable Standard</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0f2d6b' }}>{req.applicableStandard}</div>
          </div>

          {/* Explanation */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>Explanation</div>
            <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>{req.explanation}</p>
          </div>

          {/* Recommended action */}
          <div style={{ background: req.status === 'gap' ? '#fffbeb' : req.status === 'needs_verification' ? '#eff6ff' : '#f0fdf4', border: `1px solid ${req.status === 'gap' ? '#fde68a' : req.status === 'needs_verification' ? '#bfdbfe' : '#bbf7d0'}`, borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>Recommended Action</div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: '#1e293b' }}>{req.recommendedAction}</p>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-outline btn-sm" onClick={() => alert('Demo mode: Source view not available. Refer to official BIS document.')}>
              View Source
            </button>
            <button className="btn btn-primary btn-sm" onClick={onAddChecklist}>
              ✓ Add to Checklist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CompliancePage() {
  const [phase, setPhase] = useState<Phase>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [results, setResults] = useState<ComplianceRequirement[]>([]);
  const [summary, setSummary] = useState<ComplianceSummary | null>(null);
  const [selectedReq, setSelectedReq] = useState<ComplianceRequirement | null>(null);
  const [filter, setFilter] = useState<'all' | 'gap' | 'needs_verification' | 'supported'>('all');
  const [checklistAdded, setChecklistAdded] = useState<Set<string>>(new Set());
  const [showEvidenceMap, setShowEvidenceMap] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
  };

  const handleAnalyze = async (demoFile?: File) => {
    const f = demoFile ?? file;
    if (!f) return;
    setFile(f);
    setPhase('analyzing');
    setAnalysisStep(0);
    const { requirements, summary } = await analyzeDocument(f, (step) => setAnalysisStep(step));
    setResults(requirements);
    setSummary(summary);
    setPhase('results');
  };

  const handleDemoAnalysis = () => {
    // Create a mock File object for demo purposes
    const demoContent = 'Demo product specification document for stainless steel water bottle.';
    const demoBlob = new Blob([demoContent], { type: 'application/pdf' });
    const demoFile = new File([demoBlob], 'Product_Specification_WaterBottle_v1.2.pdf', { type: 'application/pdf' });
    handleAnalyze(demoFile);
  };

  const filteredResults = results.filter((r) => filter === 'all' || r.status === filter);

  const addToChecklist = (id: string) => {
    setChecklistAdded((prev) => new Set([...prev, id]));
    setSelectedReq(null);
    alert('Added to checklist! View in Compliance Checklist.');
  };

  if (phase === 'upload') {
    return (
      <div style={{ padding: '32px 32px', maxWidth: 820, margin: '0 auto' }}>
        <div className="page-eyebrow" style={{ marginBottom: 6 }}>Document Analysis</div>
        <h1 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, color: '#0f172a', letterSpacing: -0.5, marginBottom: 8 }}>
          Compliance Gap Analyzer
        </h1>
        <p style={{ color: '#64748b', fontSize: 15, marginBottom: 36, lineHeight: 1.6 }}>
          Upload a product specification document and identify potential compliance gaps against applicable Indian Standards.
        </p>

        <span className="demo-badge" style={{ display: 'inline-block', marginBottom: 24 }}>DEMO — Mock analysis will run on any uploaded file</span>

        {/* Upload area */}
        <div
          style={{
            border: `2px dashed ${dragging || file ? '#0a7ea4' : '#cbd5e1'}`,
            borderRadius: 16,
            padding: '56px 40px',
            textAlign: 'center',
            background: dragging || file ? '#f0f9ff' : 'white',
            transition: 'all 0.2s',
            cursor: 'pointer',
            marginBottom: 24,
          }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault(); setDragging(false);
            const f = e.dataTransfer.files[0];
            if (f) handleFile(f);
          }}
          onClick={() => fileRef.current?.click()}
        >
          <input ref={fileRef} type="file" accept=".pdf,.docx,.doc" style={{ display: 'none' }} onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />

          {file ? (
            <>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📄</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0f2d6b', marginBottom: 6 }}>{file.name}</div>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>{(file.size / 1024).toFixed(1)} KB</div>
              <button className="btn btn-ghost btn-sm" onClick={(e) => { e.stopPropagation(); setFile(null); }}>Remove</button>
            </>
          ) : (
            <>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📁</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
                Drag & drop your document here
              </div>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 20 }}>
                Supports PDF, DOCX · Max 25 MB
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-outline btn-sm" onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}>Browse Files</button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={(e) => { e.stopPropagation(); handleDemoAnalysis(); }}
                >
                  ⚡ Try Demo File →
                </button>
              </div>
            </>
          )}
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            className="btn btn-primary btn-full"
            style={{ padding: '14px', fontSize: 15, justifyContent: 'center' }}
            disabled={!file}
            onClick={() => handleAnalyze()}
          >
            ⚡ Analyze for Compliance Gaps
          </button>
          {!file && (
            <button
              className="btn btn-teal"
              style={{ padding: '14px 24px', fontSize: 15, flexShrink: 0 }}
              onClick={handleDemoAnalysis}
            >
              ⚡ Demo Analysis
            </button>
          )}
        </div>

        {/* What to expect */}
        <div className="bis-card" style={{ padding: 24, marginTop: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>What the analyzer checks:</div>
          <div style={{ display: 'grid', gap: 10 }}>
            {['Material requirements against applicable IS', 'Surface finish and food-grade compliance', 'Dimensional tolerances and capacity', 'Performance test requirements', 'Certification and labelling requirements', 'Documentation completeness'].map((i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ color: '#0a7ea4', fontSize: 14 }}>→</span>
                <span style={{ fontSize: 13, color: '#475569' }}>{i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'analyzing') {
    return (
      <div style={{ padding: '32px 32px', maxWidth: 600, margin: '80px auto 0', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 24 }}>⚡</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Analyzing Document</h2>
        <p style={{ color: '#64748b', marginBottom: 40 }}>{file?.name}</p>

        <div className="bis-card" style={{ padding: 32, textAlign: 'left' }}>
          {ANALYSIS_STEPS.map((step, i) => {
            const done = analysisStep > step.step;
            const active = analysisStep === step.step;
            return (
              <div key={step.step} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '12px 0', borderTop: i === 0 ? 'none' : '1px solid #f8f9fb' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: done ? '#dcfce7' : active ? '#dbeafe' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: done ? '#15803d' : active ? '#1d4ed8' : '#94a3b8', flexShrink: 0 }}>
                  {done ? '✓' : active ? <span className="spinner" style={{ width: 14, height: 14 }} /> : step.step}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: done ? 600 : active ? 700 : 400, color: done ? '#15803d' : active ? '#0f172a' : '#94a3b8' }}>
                    {step.label}
                    {done && ' ✓'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Results phase
  return (
    <div style={{ padding: '32px 32px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div className="page-eyebrow" style={{ marginBottom: 4 }}>Analysis Complete</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', letterSpacing: -0.3 }}>Compliance Gap Report</h1>
          <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>{file?.name}</div>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="demo-badge">MOCK DATA</span>
          <button className="btn btn-ghost btn-sm" onClick={() => { setPhase('upload'); setFile(null); setResults([]); }}>New Analysis</button>
          <button className="btn btn-outline btn-sm" onClick={() => setShowEvidenceMap(true)}>Evidence Map (Preview)</button>
          <Link href="/dashboard/compliance/evidence-map">
            <button className="btn btn-outline btn-sm">🗺 Full Evidence Map →</button>
          </Link>
          <Link href="/dashboard/checklist">
            <button className="btn btn-primary btn-sm">Generate Checklist →</button>
          </Link>
        </div>
      </div>

      {/* Summary cards */}
      {summary && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { n: summary.total, l: 'Requirements Checked', b: '#f8f9fb', c: '#0f172a' },
            { n: summary.supported, l: 'Supported', b: '#f0fdf4', c: '#15803d' },
            { n: summary.gaps, l: 'Potential Gaps', b: '#fffbeb', c: '#b45309' },
            { n: summary.needsVerification, l: 'Needs Verification', b: '#eff6ff', c: '#1d4ed8' },
          ].map((s) => (
            <div key={s.l} className="bis-card" style={{ padding: 20, background: s.b, textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: s.c, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 6, fontWeight: 600, lineHeight: 1.3 }}>{s.l}</div>
            </div>
          ))}
        </div>
      )}

      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { k: 'all', l: 'All Requirements' },
          { k: 'gap', l: '⚠ Potential Gaps' },
          { k: 'needs_verification', l: '? Needs Verification' },
          { k: 'supported', l: '✓ Supported' },
        ].map((f) => (
          <button key={f.k} onClick={() => setFilter(f.k as typeof filter)}
            className={`btn btn-sm ${filter === f.k ? 'btn-primary' : 'btn-ghost'}`}>
            {f.l}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bis-card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                {['Requirement', 'Category', 'Status', 'Evidence', 'Action'].map((h) => (
                  <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.8, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((req, i) => (
                <tr key={req.id}
                  style={{ borderTop: i === 0 ? 'none' : '1px solid #f8f9fb', cursor: 'pointer', transition: 'background 0.1s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#fafbff')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  onClick={() => setSelectedReq(req)}
                >
                  <td style={{ padding: '14px 16px', maxWidth: 300 }}>
                    <div style={{ fontWeight: 600, color: '#0f172a', lineHeight: 1.3 }}>{req.requirement}</div>
                  </td>
                  <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                    <span className="badge badge-neutral" style={{ fontSize: 10 }}>{req.category}</span>
                  </td>
                  <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                    <StatusIcon status={req.status} />
                  </td>
                  <td style={{ padding: '14px 16px', maxWidth: 200 }}>
                    <div style={{ fontSize: 12, color: '#0a7ea4', fontWeight: 600 }}>{req.applicableStandard}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{req.evidenceClause}</div>
                  </td>
                  <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-ghost btn-sm" onClick={(e) => { e.stopPropagation(); setSelectedReq(req); }} style={{ fontSize: 11 }}>Details</button>
                      {!checklistAdded.has(req.id) ? (
                        <button className="btn btn-outline btn-sm" onClick={(e) => { e.stopPropagation(); addToChecklist(req.id); }} style={{ fontSize: 11 }}>+ Checklist</button>
                      ) : (
                        <span className="badge badge-success" style={{ fontSize: 10 }}>✓ Added</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedReq && (
        <DetailDrawer req={selectedReq} onClose={() => setSelectedReq(null)} onAddChecklist={() => addToChecklist(selectedReq.id)} />
      )}

      {/* Evidence Map Modal */}
      {showEvidenceMap && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={() => setShowEvidenceMap(false)}>
          <div style={{ background: 'white', borderRadius: 16, padding: 40, maxWidth: 600, width: '100%', animation: 'fadeIn 0.3s ease' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>Evidence Map</h2>
              <button onClick={() => setShowEvidenceMap(false)} style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, width: 36, height: 36, cursor: 'pointer', fontSize: 18 }}>×</button>
            </div>

            {/* Visual flow */}
            {[
              { label: 'Product Document', icon: '📄', desc: 'Product_Specification_WaterBottle_v1.2.pdf', color: '#0f2d6b' },
              { label: 'Extracted Requirement', icon: '📋', desc: 'Material grade, surface finish, capacity, tests', color: '#0a7ea4' },
              { label: 'Applicable Standard', icon: '⚖️', desc: 'IS 10987 — Stainless Steel Kitchenware', color: '#15803d' },
              { label: 'Source Evidence', icon: '🔍', desc: 'Clause 5.1, 5.3, 6.2 — Demo Reference', color: '#7c3aed' },
              { label: 'Compliance Status', icon: '📊', desc: '12 Supported · 4 Gaps · 2 Needs Verification', color: '#b45309' },
              { label: 'Recommended Action', icon: '✅', desc: 'Conduct drop test, salt spray test, update labelling', color: '#0f2d6b' },
            ].map((node, i) => (
              <div key={node.label}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '10px 0' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: node.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0, color: 'white' }}>{node.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.8 }}>{node.label}</div>
                    <div style={{ fontSize: 13, color: '#0f172a', marginTop: 2 }}>{node.desc}</div>
                  </div>
                </div>
                {i < 5 && <div className="roadmap-connector" style={{ marginLeft: 20 }} />}
              </div>
            ))}

            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
              <span className="demo-badge">MOCK DATA — Demo Evidence Map</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
