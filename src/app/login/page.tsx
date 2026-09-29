'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const { login, loginAsDemo } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please enter email and password.'); return; }
    setError('');
    setLoading(true);
    try { await login(email, password); } catch { setError('Authentication failed. Please try again.'); }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(300px, 0.8fr)', background: '#f8f9fb' }}>
      {/* Left: Form */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(32px, 6vw, 80px)', maxWidth: 560, margin: '0 auto', width: '100%' }}>
        {/* Brand */}
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 48 }}>
          <div style={{ width: 38, height: 38, background: '#0f2d6b', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 14, fontWeight: 800, letterSpacing: 1 }}>BIS</div>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>BIS AI Assistant</span>
        </Link>

        <div className="page-eyebrow">Sign In</div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#0f172a', letterSpacing: -1, margin: '8px 0 8px' }}>
          Welcome back
        </h1>
        <p style={{ color: '#64748b', fontSize: 15, marginBottom: 36, lineHeight: 1.6 }}>
          Access the AI-powered compliance assistant for Indian Standards and BIS Services.
        </p>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '12px 16px', color: '#b91c1c', fontSize: 13, marginBottom: 20 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 20 }}>
          <div>
            <label className="field-label" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div>
            <label className="field-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            style={{ marginTop: 4, padding: '13px 24px', fontSize: 15, justifyContent: 'center' }}
            disabled={loading}
          >
            {loading ? (
              <><span className="spinner" style={{ width: 16, height: 16 }} /> Signing in…</>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
          <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #e2e8f0' }} />
          <span style={{ fontSize: 12, color: '#94a3b8', flexShrink: 0 }}>or</span>
          <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #e2e8f0' }} />
        </div>

        <button
          className="btn btn-outline btn-full"
          style={{ padding: '13px 24px', fontSize: 15, justifyContent: 'center' }}
          onClick={loginAsDemo}
        >
          ⚡ Continue as Demo User
        </button>

        <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 20, lineHeight: 1.6, textAlign: 'center' }}>
          <span className="demo-badge">DEMO</span>
          {' '}No credentials are sent to any server. This is a local demo environment.
        </p>
      </div>

      {/* Right: Visual */}
      <div style={{ background: 'linear-gradient(160deg, #0f2d6b 0%, #1564a5 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(32px, 6vw, 64px)', color: 'white', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', top: 40, right: -20, width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 350, height: 350, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: '#7dd3fc', textTransform: 'uppercase', marginBottom: 16 }}>
            Evidence-First AI
          </div>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: -1, color: 'white', marginBottom: 20 }}>
            Compliance guidance backed by source evidence
          </h2>
          <p style={{ color: '#bfdbfe', fontSize: 15, lineHeight: 1.7, maxWidth: 380, marginBottom: 36 }}>
            Every answer cites the specific standard, clause, and document — not AI hallucination.
          </p>

          {/* Feature list */}
          {[
            'Product-to-Standard Discovery',
            'Clause-Level Evidence Linking',
            'Automated Compliance Gap Analysis',
            'Step-by-Step Certification Roadmap',
          ].map((f) => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, flexShrink: 0 }}>✓</div>
              <span style={{ fontSize: 13, color: '#e0f2fe' }}>{f}</span>
            </div>
          ))}

          <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.15)', fontSize: 12, color: '#7dd3fc' }}>
            SIH26107 · Smart India Hackathon 2026 · Team BIS AI
          </div>
        </div>
      </div>
    </div>
  );
}
