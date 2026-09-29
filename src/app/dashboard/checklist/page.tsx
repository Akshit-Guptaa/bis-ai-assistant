'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getComplianceChecklist } from '@/services/mockComplianceService';
import { ChecklistItem } from '@/data/compliance';
import { PageShell, PageHeader, DemoBadge, Spinner, EmptyState, InfoBanner, ProgressBar, Toast } from '@/components/ui';

const PRIORITY_STYLE: Record<string, { bg: string; color: string }> = {
  High:   { bg: '#fee2e2', color: '#b91c1c' },
  Medium: { bg: '#fef3c7', color: '#b45309' },
  Low:    { bg: '#dcfce7', color: '#15803d' },
};

export default function ChecklistPage() {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [generating, setGenerating] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    getComplianceChecklist().then((data) => { setItems(data); setLoading(false); });
  }, []);

  const toggleItem = (id: string) => {
    setItems((prev) => {
      const next = prev.map((i) => i.id === id ? { ...i, completed: !i.completed } : i);
      const item = next.find((i) => i.id === id);
      if (item) setToast(item.completed ? `✓ Marked complete: ${item.requirement.slice(0, 40)}…` : `Unmarked: ${item.requirement.slice(0, 40)}…`);
      return next;
    });
    setTimeout(() => setToast(null), 2500);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 1600));
    setGenerating(false);
    setToast('Checklist refreshed from latest compliance analysis.');
    setTimeout(() => setToast(null), 2500);
  };

  const handleExport = () => {
    const lines = [
      'BIS AI Assistant — Compliance Checklist',
      'Project: IS 10987 — Stainless Steel Kitchenware — Water Bottle',
      'Generated: ' + new Date().toLocaleDateString('en-IN'),
      '— DEMO DATA — Not for official use —',
      '',
      ...items.map((i) => `[${i.completed ? 'X' : ' '}] [${i.priority}] ${i.requirement}  (${i.category})  Ref: ${i.evidence}`),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'BIS_Compliance_Checklist_DEMO.txt'; a.click();
    URL.revokeObjectURL(url);
    setToast('Checklist exported.');
    setTimeout(() => setToast(null), 2000);
  };

  const completed = items.filter((i) => i.completed).length;
  const total     = items.length;
  const progress  = total > 0 ? Math.round((completed / total) * 100) : 0;
  const filtered  = items.filter((i) => filter === 'all' ? true : filter === 'completed' ? i.completed : !i.completed);

  return (
    <PageShell maxWidth={860}>
      <PageHeader
        eyebrow="Compliance Checklist"
        title="Compliance Checklist"
        subtitle="IS 10987 · Stainless Steel Kitchenware — Water Bottle"
        actions={
          <>
            <DemoBadge />
            <button className="btn btn-ghost btn-sm" onClick={handleGenerate} disabled={generating}>
              {generating ? <><Spinner size={14} /> Generating…</> : '↻ Regenerate'}
            </button>
            <button className="btn btn-outline btn-sm" onClick={handleExport}>⬇ Export</button>
          </>
        }
      />

      {/* Progress */}
      <div className="bis-card" style={{ padding: 20, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Overall Compliance Progress</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#0f2d6b' }}>
            {completed}<span style={{ fontSize: 13, fontWeight: 400, color: '#64748b' }}> / {total}</span>
          </div>
        </div>
        <ProgressBar value={completed} max={total} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 14 }}>
          {[
            { n: completed, l: 'Completed', c: '#15803d', b: '#f0fdf4' },
            { n: total - completed, l: 'Remaining', c: '#b45309', b: '#fffbeb' },
            { n: `${progress}%`, l: 'Overall', c: '#0f2d6b', b: '#eff6ff' },
          ].map((s) => (
            <div key={s.l} style={{ background: s.b, border: '1px solid #e2e8f0', borderRadius: 8, padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: s.c }}>{s.n}</div>
              <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginTop: 3 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {[
          { k: 'all',       l: `All (${total})` },
          { k: 'pending',   l: `Pending (${total - completed})` },
          { k: 'completed', l: `Done (${completed})` },
        ].map((f) => (
          <button key={f.k} onClick={() => setFilter(f.k as typeof filter)}
            className={`btn btn-sm ${filter === f.k ? 'btn-primary' : 'btn-ghost'}`}>
            {f.l}
          </button>
        ))}
        <Link href="/dashboard/compliance" style={{ marginLeft: 'auto' }}>
          <button className="btn btn-outline btn-sm">⚡ Re-analyze Document</button>
        </Link>
      </div>

      {/* List */}
      {loading ? (
        <div className="bis-card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center', padding: '32px 0' }}>
            <Spinner size={24} />
            <span style={{ fontSize: 14, color: '#64748b' }}>Loading checklist…</span>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bis-card"><EmptyState icon="✅" title="No items in this view" description="Switch to 'All' or 'Pending' to see requirements." /></div>
      ) : (
        <div className="bis-card" style={{ overflow: 'hidden' }}>
          {filtered.map((item, i) => (
            <div
              key={item.id}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 14,
                padding: '15px 18px',
                borderTop: i === 0 ? 'none' : '1px solid #f8f9fb',
                background: item.completed ? '#fafffe' : 'white',
                transition: 'background 0.15s',
              }}>
              {/* Checkbox */}
              <button
                onClick={() => toggleItem(item.id)}
                aria-label={item.completed ? 'Mark incomplete' : 'Mark complete'}
                style={{
                  width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                  border: `2px solid ${item.completed ? '#15803d' : '#cbd5e1'}`,
                  background: item.completed ? '#15803d' : 'white',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, color: 'white', transition: 'all 0.15s', marginTop: 2,
                }}>
                {item.completed ? '✓' : ''}
              </button>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 13, fontWeight: 600, color: item.completed ? '#94a3b8' : '#0f172a',
                  textDecoration: item.completed ? 'line-through' : 'none', lineHeight: 1.4, marginBottom: 5,
                }}>
                  {item.requirement}
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span className="badge badge-neutral" style={{ fontSize: 10 }}>{item.category}</span>
                  <span style={{
                    padding: '2px 7px', borderRadius: 4, fontSize: 10, fontWeight: 700,
                    background: PRIORITY_STYLE[item.priority]?.bg ?? '#f1f5f9',
                    color: PRIORITY_STYLE[item.priority]?.color ?? '#64748b',
                  }}>{item.priority}</span>
                  <span style={{ fontSize: 11, color: '#0a7ea4', fontWeight: 600 }}>{item.evidence}</span>
                </div>
                {item.notes && <div style={{ fontSize: 12, color: '#64748b', marginTop: 6, lineHeight: 1.5 }}>{item.notes}</div>}
              </div>

              {/* Status */}
              <div style={{ flexShrink: 0 }}>
                {item.completed
                  ? <span className="badge badge-success" style={{ fontSize: 10 }}>Done</span>
                  : <span className="badge badge-warning" style={{ fontSize: 10 }}>Pending</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        <InfoBanner variant="warning">
          Checklist items are auto-generated from mock compliance analysis of Product_Specification_WaterBottle_v1.2.pdf. Demo data only — not official BIS requirements.
        </InfoBanner>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </PageShell>
  );
}
