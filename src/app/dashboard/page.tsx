'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { PageShell, StatTile, ProgressBar, InfoBanner } from '@/components/ui';
import { MOCK_DOCUMENTS } from '@/data/documents';

const QUICK_ACTIONS = [
  { icon: '💬', title: 'Ask BIS AI', desc: 'Natural language queries on Indian Standards', href: '/dashboard/assistant', primary: true },
  { icon: '📋', title: 'Find Standard', desc: 'Identify IS standards from product description', href: '/dashboard/find-standard', primary: false },
  { icon: '⚡', title: 'Analyze Document', desc: 'Upload spec to detect compliance gaps', href: '/dashboard/compliance', primary: false },
  { icon: '✅', title: 'Compliance Checklist', desc: 'Track and update compliance requirements', href: '/dashboard/checklist', primary: false },
  { icon: '📍', title: 'Certification Roadmap', desc: 'Step-by-step BIS certification guidance', href: '/dashboard/roadmap', primary: false },
];

const SUGGESTED = [
  'Which standard applies to stainless steel water bottles?',
  'What documents are required for BIS ISI certification?',
  'How do I apply for a BIS license for a pressure cooker?',
  'What testing is required for LED indoor lighting fixtures?',
];

const RECENT_ACTIVITY = [
  { icon: '⚡', action: 'Compliance analysis completed', detail: 'Product_Specification_WaterBottle_v1.2.pdf', time: '14 min ago', href: '/dashboard/compliance' },
  { icon: '📋', action: 'Standard identified', detail: 'IS 10987 — Stainless Steel Kitchenware', time: '22 min ago', href: '/dashboard/find-standard' },
  { icon: '✅', action: 'Checklist updated', detail: '12 / 18 requirements marked complete', time: '1 hr ago', href: '/dashboard/checklist' },
  { icon: '💬', action: 'AI query answered', detail: 'Stainless steel certification requirements', time: '2 hr ago', href: '/dashboard/assistant' },
  { icon: '📁', action: 'Document uploaded', detail: 'Product_Specification_WaterBottle_v1.2.pdf', time: 'Yesterday', href: '/dashboard/documents' },
];

const PENDING_REQUIREMENTS = [
  { req: 'Drop resistance test (IS 10987 § 8.4)', priority: 'High', std: 'IS 10987' },
  { req: 'Corrosion resistance test (IS 10987 § 8.5)', priority: 'High', std: 'IS 10987' },
  { req: 'BIS license application submission', priority: 'Medium', std: 'BIS Scheme I' },
  { req: 'Mandatory product marking (IS 10987 § 10)', priority: 'Medium', std: 'IS 10987' },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState('');

  const askAssistant = (q: string) => router.push(`/dashboard/assistant?q=${encodeURIComponent(q)}`);

  return (
    <PageShell maxWidth={1080}>
      {/* Welcome header */}
      <div style={{ marginBottom: 24 }}>
        <div className="page-eyebrow">Dashboard</div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', letterSpacing: -0.4, marginTop: 4, marginBottom: 4 }}>
          {getGreeting()}{user?.name ? `, ${user.name.split(' ')[0]}` : ''}.
        </h1>
        <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>
          Active project: <strong style={{ color: '#0f172a' }}>IS 10987 — Stainless Steel Water Bottle</strong>
          <span style={{ color: '#94a3b8', margin: '0 6px' }}>·</span>
          <span style={{ color: '#b45309', fontWeight: 600 }}>4 gaps identified</span>
        </p>
      </div>

      {/* Quick Ask */}
      <div className="bis-card" style={{ padding: '20px 20px 16px', marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>
          Ask BIS AI Assistant
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <textarea
              ref={inputRef}
              className="input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about Indian Standards, certification requirements, testing procedures…"
              style={{ minHeight: 48, maxHeight: 120, resize: 'none', paddingRight: 40, fontSize: 14 }}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (inputValue.trim()) askAssistant(inputValue.trim()); } }}
            />
            <button
              title="Voice input (Demo mode)"
              style={{ position: 'absolute', right: 10, bottom: 10, background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#94a3b8' }}
              onClick={() => alert('Voice input: Demo mode — type your question to proceed.')}
            >🎤</button>
          </div>
          <button className="btn btn-primary" style={{ alignSelf: 'flex-end', padding: '10px 18px' }}
            disabled={!inputValue.trim()}
            onClick={() => askAssistant(inputValue.trim())}>
            Ask →
          </button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
          {SUGGESTED.map((q) => (
            <button key={q} onClick={() => askAssistant(q)}
              style={{ background: '#f8f9fb', border: '1px solid #e2e8f0', borderRadius: 100, padding: '4px 12px', fontSize: 11, color: '#475569', cursor: 'pointer' }}>
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Compliance Health + Stat row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 14, marginBottom: 24 }}>
        {/* Compliance health */}
        <div className="bis-card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.8 }}>Compliance Health</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginTop: 2 }}>67%</div>
            </div>
            <span style={{ padding: '4px 10px', background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 100, fontSize: 11, fontWeight: 700, color: '#b45309' }}>⚠ In Progress</span>
          </div>
          <ProgressBar value={12} max={18} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b', marginTop: 8 }}>
            <span>12 of 18 requirements met</span>
            <Link href="/dashboard/checklist"><span style={{ color: '#0a7ea4', cursor: 'pointer', fontWeight: 600 }}>View →</span></Link>
          </div>
        </div>

        <StatTile value={2} label="Active Standards" color="#0f2d6b" bg="#eff6ff" />
        <StatTile value={4} label="Open Gaps" color="#b45309" bg="#fffbeb" />
        <StatTile value={MOCK_DOCUMENTS.length} label="Documents" color="#15803d" bg="#f0fdf4" />
      </div>

      {/* Main content grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Quick Actions */}
        <div className="bis-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 14 }}>Quick Actions</div>
          <div style={{ display: 'grid', gap: 6 }}>
            {QUICK_ACTIONS.map((a) => (
              <Link key={a.href} href={a.href} style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: 8, cursor: 'pointer', transition: 'background 0.15s, border-color 0.15s' }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.background = '#f8f9fb'; el.style.borderColor = '#93c5fd'; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'white'; el.style.borderColor = '#e2e8f0'; }}>
                  <span style={{ fontSize: 18, width: 28, textAlign: 'center', flexShrink: 0 }}>{a.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{a.title}</div>
                    <div style={{ fontSize: 11, color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.desc}</div>
                  </div>
                  <span style={{ color: '#94a3b8', fontSize: 12 }}>›</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Pending Requirements */}
        <div className="bis-card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.8 }}>Open Compliance Gaps</div>
            <Link href="/dashboard/compliance"><span style={{ fontSize: 11, color: '#0a7ea4', fontWeight: 600, cursor: 'pointer' }}>View Report →</span></Link>
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            {PENDING_REQUIREMENTS.map((p) => (
              <div key={p.req} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8 }}>
                <span style={{ color: '#b45309', fontWeight: 700, fontSize: 12, flexShrink: 0, marginTop: 1 }}>⚠</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#0f172a', lineHeight: 1.3 }}>{p.req}</div>
                  <div style={{ fontSize: 11, color: '#92400e', marginTop: 2 }}>{p.priority} Priority</div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/dashboard/compliance/evidence-map">
            <button className="btn btn-outline btn-sm btn-full" style={{ marginTop: 12, justifyContent: 'center', fontSize: 12 }}>
              🗺 View Evidence Map
            </button>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bis-card" style={{ padding: 20, marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 14 }}>Recent Activity</div>
        <div>
          {RECENT_ACTIVITY.map((a, i) => (
            <Link key={a.action} href={a.href} style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: i === 0 ? 'none' : '1px solid #f8f9fb', cursor: 'pointer' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
                  {a.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{a.action}</div>
                  <div style={{ fontSize: 11, color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.detail}</div>
                </div>
                <div style={{ fontSize: 11, color: '#94a3b8', flexShrink: 0 }}>{a.time}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <InfoBanner variant="warning">
        This is a demonstration prototype using mock data. All standards, requirements and evidence references are simulated. Not for official use.
      </InfoBanner>
    </PageShell>
  );
}
