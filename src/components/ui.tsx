/**
 * Shared UI primitives for BIS AI Assistant
 * Import these in page components for consistent design.
 */
'use client';

import { ReactNode } from 'react';

// ─── Page Shell ──────────────────────────────────────────────────────────────

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  badge?: ReactNode;
}

export function PageHeader({ eyebrow, title, subtitle, actions, badge }: PageHeaderProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
      <div style={{ minWidth: 0 }}>
        <div className="page-eyebrow" style={{ marginBottom: 4 }}>{eyebrow}</div>
        <h1 style={{ fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 800, color: '#0f172a', letterSpacing: -0.4, lineHeight: 1.2, marginBottom: subtitle ? 6 : 0 }}>
          {title}
        </h1>
        {subtitle && <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, maxWidth: 600, margin: 0 }}>{subtitle}</p>}
        {badge && <div style={{ marginTop: 8 }}>{badge}</div>}
      </div>
      {actions && <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', flexShrink: 0 }}>{actions}</div>}
    </div>
  );
}

export function PageShell({ children, maxWidth = 960 }: { children: ReactNode; maxWidth?: number }) {
  return (
    <div style={{ padding: '28px 28px', maxWidth, margin: '0 auto', width: '100%' }}>
      {children}
    </div>
  );
}

// ─── Status Badges ────────────────────────────────────────────────────────────

export function DemoBadge() {
  return <span className="demo-badge">DEMO DATA</span>;
}

export function StatusBadge({ status }: { status: 'supported' | 'gap' | 'needs_verification' | 'analyzed' | 'pending' | 'not_analyzed' | 'compliant' | 'gaps_found' }) {
  const map = {
    supported:        { label: '✓ Supported',       cls: 'badge-success' },
    compliant:        { label: '✓ Compliant',        cls: 'badge-success' },
    analyzed:         { label: 'Analyzed',           cls: 'badge-success' },
    gap:              { label: '⚠ Potential Gap',    cls: 'badge-warning' },
    gaps_found:       { label: '⚠ Gaps Found',       cls: 'badge-warning' },
    pending:          { label: 'Pending',             cls: 'badge-warning' },
    needs_verification: { label: '? Needs Verify',  cls: 'badge-info' },
    not_analyzed:     { label: 'Not Analyzed',       cls: 'badge-neutral' },
  } as const;
  const s = map[status] ?? { label: status, cls: 'badge-neutral' };
  return <span className={`badge ${s.cls}`} style={{ fontSize: 11 }}>{s.label}</span>;
}

// ─── Spinner / Loading ────────────────────────────────────────────────────────

export function Spinner({ size = 20 }: { size?: number }) {
  return <span className="spinner" style={{ width: size, height: size, flexShrink: 0 }} />;
}

export function LoadingBlock({ label = 'Loading…' }: { label?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '56px 24px', gap: 14 }}>
      <Spinner size={32} />
      <span style={{ fontSize: 14, color: '#64748b', fontWeight: 500 }}>{label}</span>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon = '📭', title, description, action }: EmptyStateProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '56px 24px', textAlign: 'center', gap: 10 }}>
      <div style={{ fontSize: 40, marginBottom: 4 }}>{icon}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{title}</div>
      {description && <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, maxWidth: 380 }}>{description}</div>}
      {action && <div style={{ marginTop: 8 }}>{action}</div>}
    </div>
  );
}

// ─── Info Banner ──────────────────────────────────────────────────────────────

type BannerVariant = 'warning' | 'info' | 'success' | 'error';

const BANNER_STYLES: Record<BannerVariant, { bg: string; border: string; color: string; icon: string }> = {
  warning: { bg: '#fffbeb', border: '#fde68a', color: '#92400e', icon: '⚠' },
  info:    { bg: '#eff6ff', border: '#bfdbfe', color: '#1e40af', icon: 'ℹ' },
  success: { bg: '#f0fdf4', border: '#bbf7d0', color: '#14532d', icon: '✓' },
  error:   { bg: '#fef2f2', border: '#fecaca', color: '#991b1b', icon: '✗' },
};

export function InfoBanner({ variant = 'warning', children }: { variant?: BannerVariant; children: ReactNode }) {
  const s = BANNER_STYLES[variant];
  return (
    <div style={{ padding: '10px 14px', background: s.bg, border: `1px solid ${s.border}`, borderRadius: 8, fontSize: 12, color: s.color, lineHeight: 1.6, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
      <span style={{ flexShrink: 0, fontWeight: 700 }}>{s.icon}</span>
      <span>{children}</span>
    </div>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────

export function SectionCard({ title, children, action }: { title?: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="bis-card" style={{ padding: 20, marginBottom: 20 }}>
      {(title || action) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          {title && <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{title}</div>}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

// ─── Stat Tile ────────────────────────────────────────────────────────────────

export function StatTile({ value, label, color = '#0f2d6b', bg = '#f8f9fb' }: { value: string | number; label: string; color?: string; bg?: string }) {
  return (
    <div style={{ background: bg, border: '1px solid #e2e8f0', borderRadius: 10, padding: '16px', textAlign: 'center' }}>
      <div style={{ fontSize: 28, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginTop: 5, lineHeight: 1.3 }}>{label}</div>
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

export function ProgressBar({ value, max, color = 'linear-gradient(90deg, #0f2d6b, #0a7ea4)' }: { value: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div style={{ height: 8, background: '#f1f5f9', borderRadius: 100, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 100, transition: 'width 0.5s ease' }} />
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 300, background: '#0f172a', color: 'white', borderRadius: 10, padding: '12px 20px', fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.2)', animation: 'fadeIn 0.3s ease' }}>
      <span style={{ color: '#4ade80' }}>✓</span>
      {message}
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 16, lineHeight: 1, marginLeft: 4 }}>×</button>
    </div>
  );
}
