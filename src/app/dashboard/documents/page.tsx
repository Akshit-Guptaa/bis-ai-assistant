'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MOCK_DOCUMENTS, Document } from '@/data/documents';
import { PageShell, PageHeader, DemoBadge, EmptyState, InfoBanner, StatusBadge, Toast, Spinner } from '@/components/ui';

const TYPE_ICON: Record<string, string> = { PDF: '📄', DOCX: '📝', XLSX: '📊', Image: '🖼️' };

type FilterKey = 'all' | 'analyzed' | 'pending' | 'not_analyzed';

function ComplianceCell({ status }: { status: Document['complianceStatus'] }) {
  if (status === 'compliant')  return <span className="badge badge-success" style={{ fontSize: 10 }}>✓ Compliant</span>;
  if (status === 'gaps_found') return <span className="badge badge-warning" style={{ fontSize: 10 }}>⚠ Gaps Found</span>;
  if (status === 'pending')    return <span className="badge badge-neutral" style={{ fontSize: 10 }}>Pending</span>;
  return <span style={{ color: '#94a3b8', fontSize: 12 }}>—</span>;
}

function DocumentTable({ docs }: { docs: Document[] }) {
  const router_push = (path: string) => { window.location.href = path; };

  if (docs.length === 0) {
    return <div className="bis-card"><EmptyState icon="📂" title="No documents" description="No documents match the selected filter." /></div>;
  }

  return (
    <div className="bis-card" style={{ overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table className="data-table" style={{ minWidth: 720 }}>
          <thead>
            <tr>
              {['Document', 'Type', 'Uploaded', 'Analysis', 'Compliance', 'Action'].map((h) => <th key={h}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {docs.map((doc) => (
              <tr key={doc.id}>
                <td>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 20, flexShrink: 0 }}>{TYPE_ICON[doc.type] ?? '📄'}</span>
                    <div>
                      <div style={{ fontWeight: 600, color: '#0f172a', fontSize: 13, maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {doc.name}
                      </div>
                      <div style={{ fontSize: 11, color: '#94a3b8' }}>{doc.size}</div>
                    </div>
                  </div>
                </td>
                <td><span className="badge badge-neutral" style={{ fontSize: 10 }}>{doc.type}</span></td>
                <td style={{ color: '#64748b', fontSize: 12, whiteSpace: 'nowrap' }}>
                  {new Date(doc.uploadDate).toLocaleDateString('en-IN')}
                </td>
                <td>
                  <StatusBadge status={doc.analysisStatus as any} />
                  {doc.requirementsChecked
                    ? <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>{doc.requirementsChecked} checked</div>
                    : null}
                </td>
                <td>
                  <ComplianceCell status={doc.complianceStatus} />
                  {doc.gapsFound
                    ? <div style={{ fontSize: 10, color: '#b45309', marginTop: 2 }}>{doc.gapsFound} gaps</div>
                    : null}
                </td>
                <td>
                  {doc.analysisStatus === 'analyzed'
                    ? <Link href="/dashboard/compliance"><button className="btn btn-outline btn-sm" style={{ fontSize: 11 }}>View Report</button></Link>
                    : <Link href="/dashboard/compliance"><button className="btn btn-ghost btn-sm" style={{ fontSize: 11 }}>Analyze →</button></Link>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function DocumentsPage() {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const handleUpload = async () => {
    setUploading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setUploading(false);
    showToast('Upload is a demo feature. Use Compliance Analyzer to process a document.');
  };

  const analyzed    = MOCK_DOCUMENTS.filter((d) => d.analysisStatus === 'analyzed');
  const pending     = MOCK_DOCUMENTS.filter((d) => d.analysisStatus === 'pending');
  const notAnalyzed = MOCK_DOCUMENTS.filter((d) => d.analysisStatus === 'not_analyzed');

  const filtered = filter === 'all'
    ? MOCK_DOCUMENTS
    : MOCK_DOCUMENTS.filter((d) => d.analysisStatus === filter);

  return (
    <PageShell maxWidth={960}>
      <PageHeader
        eyebrow="Document Management"
        title="Documents"
        subtitle={`${MOCK_DOCUMENTS.length} documents · ${analyzed.length} analyzed`}
        actions={
          <>
            <DemoBadge />
            <button className="btn btn-primary btn-sm" onClick={handleUpload} disabled={uploading}>
              {uploading ? <><Spinner size={13} /> Uploading…</> : '+ Upload Document'}
            </button>
          </>
        }
      />

      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { n: analyzed.length,    l: 'Analyzed',     c: '#15803d', b: '#f0fdf4' },
          { n: pending.length,     l: 'Pending',       c: '#b45309', b: '#fffbeb' },
          { n: notAnalyzed.length, l: 'Not Analyzed',  c: '#64748b', b: '#f8f9fb' },
        ].map((s) => (
          <div key={s.l} style={{ background: s.b, border: '1px solid #e2e8f0', borderRadius: 10, padding: '14px 18px', display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.c }}>{s.n}</div>
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {[
          { k: 'all',          l: `All (${MOCK_DOCUMENTS.length})` },
          { k: 'analyzed',     l: `Analyzed (${analyzed.length})` },
          { k: 'pending',      l: `Pending (${pending.length})` },
          { k: 'not_analyzed', l: `Not Analyzed (${notAnalyzed.length})` },
        ].map((f) => (
          <button key={f.k} onClick={() => setFilter(f.k as FilterKey)}
            className={`btn btn-sm ${filter === f.k ? 'btn-primary' : 'btn-ghost'}`}>
            {f.l}
          </button>
        ))}
        <Link href="/dashboard/compliance" style={{ marginLeft: 'auto' }}>
          <button className="btn btn-outline btn-sm">⚡ Analyze a Document</button>
        </Link>
      </div>

      <DocumentTable docs={filtered} />

      <div style={{ marginTop: 16 }}>
        <InfoBanner variant="info">
          Documents listed are mock data. In production, files would be stored in BIS-compliant secure storage and processed by the backend AI pipeline.
        </InfoBanner>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </PageShell>
  );
}
