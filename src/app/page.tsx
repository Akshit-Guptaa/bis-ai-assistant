import Link from 'next/link';

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fb', fontFamily: "'Inter', sans-serif" }}>

      {/* Top nav */}
      <nav style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 40px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, background: '#0f2d6b', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 11, fontWeight: 800, letterSpacing: 0.5 }}>BIS</div>
          <div>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>BIS AI Assistant</span>
            <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 8 }}>SIH26107</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#94a3b8', padding: '3px 8px', background: '#fefce8', border: '1px solid #fde68a', borderRadius: 4, fontWeight: 600 }}>PROTOTYPE</span>
          <Link href="/login">
            <button style={{ padding: '7px 18px', background: '#0f2d6b', color: 'white', border: 'none', borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              Try Demo →
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: '#0f2d6b', color: 'white', padding: '80px 40px 72px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.20)', borderRadius: 100, padding: '5px 14px', fontSize: 11, fontWeight: 600, marginBottom: 24, letterSpacing: 0.5 }}>
            ✦ Smart India Hackathon 2026 · Problem SIH26107
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: -0.5, marginBottom: 18, maxWidth: 740 }}>
            AI-Powered Intelligent Assistant for
            <span style={{ color: '#93c5fd' }}> Indian Standards & BIS Services</span>
          </h1>
          <p style={{ fontSize: 17, color: '#bfdbfe', lineHeight: 1.7, maxWidth: 620, marginBottom: 36 }}>
            Manufacturers and compliance teams struggle to find applicable Indian Standards, interpret certification requirements, and track compliance gaps. BIS AI Assistant solves this with evidence-first AI guidance.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/login">
              <button style={{ padding: '13px 28px', background: 'white', color: '#0f2d6b', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                ⚡ Try the Demo
              </button>
            </Link>
            <Link href="/login">
              <button style={{ padding: '13px 24px', background: 'rgba(255,255,255,0.10)', color: 'white', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                View Demo Walkthrough →
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 32, marginTop: 52, flexWrap: 'wrap' }}>
            {[
              { n: '20,000+', label: 'Indian Standards indexed' },
              { n: '< 3s', label: 'Standard discovery time' },
              { n: '6-step', label: 'Certification roadmap' },
              { n: 'Offline', label: 'Demo-ready, no internet needed' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>{s.n}</div>
                <div style={{ fontSize: 12, color: '#93c5fd', marginTop: 3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section style={{ padding: '64px 40px', background: 'white', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#0a7ea4', marginBottom: 8 }}>The Problem</div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, color: '#0f172a', letterSpacing: -0.3, lineHeight: 1.2, maxWidth: 560, margin: '0 auto' }}>
              BIS certification is complex, time-consuming, and opaque
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {[
              { icon: '🔎', t: 'Hard to find', d: 'Thousands of Indian Standards with no intelligent search or relevance matching for products.' },
              { icon: '📄', t: 'Manual analysis', d: 'Compliance teams manually compare product specs against standard clauses — slow and error-prone.' },
              { icon: '🧩', t: 'Scattered guidance', d: 'Certification steps, testing labs, document requirements and timelines are fragmented across BIS portals.' },
              { icon: '🌐', t: 'Language barrier', d: 'Most guidance is in English only, limiting access for regional manufacturers and SMEs.' },
            ].map((p) => (
              <div key={p.t} style={{ padding: 20, border: '1px solid #e2e8f0', borderRadius: 10, background: '#fafbff' }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>{p.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{p.t}</div>
                <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features / Solution */}
      <section style={{ padding: '64px 40px', background: '#f8f9fb' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#0a7ea4', marginBottom: 8 }}>The Solution</div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, color: '#0f172a', letterSpacing: -0.3, lineHeight: 1.2 }}>
              Evidence-first AI for Indian Standards compliance
            </h2>
          </div>

          {/* Primary workflow */}
          <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, padding: '28px 28px', marginBottom: 32 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 18, textTransform: 'uppercase', letterSpacing: 0.8 }}>Core Compliance Workflow</div>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
              {[
                { s: 'Describe Product', c: '#0f2d6b' },
                { s: '→' },
                { s: 'AI Finds Standard', c: '#0a7ea4' },
                { s: '→' },
                { s: 'Evidence Mapped', c: '#7c3aed' },
                { s: '→' },
                { s: 'Gaps Identified', c: '#b45309' },
                { s: '→' },
                { s: 'Checklist Generated', c: '#15803d' },
                { s: '→' },
                { s: 'Certified', c: '#0f2d6b' },
              ].map((item, i) => (
                item.s === '→'
                  ? <span key={i} style={{ color: '#94a3b8', fontWeight: 600, fontSize: 15 }}>→</span>
                  : <span key={i} style={{ padding: '6px 12px', background: `${item.c}15`, border: `1px solid ${item.c}30`, borderRadius: 6, fontSize: 12, fontWeight: 700, color: item.c }}>{item.s}</span>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              { icon: '💬', t: 'AI Standards Assistant', d: 'Ask questions in plain English (or Hindi) and get standard references with clause-level evidence.', href: '/dashboard/assistant', lbl: 'Ask BIS AI' },
              { icon: '📋', t: 'Standard Discovery', d: 'Describe your product and instantly find applicable Indian Standards with relevance scores.', href: '/dashboard/find-standard', lbl: 'Find Standards' },
              { icon: '⚡', t: 'Compliance Analyzer', d: 'Upload product specs and auto-identify compliance gaps against applicable standards.', href: '/dashboard/compliance', lbl: 'Analyze Document' },
              { icon: '🗺', t: 'Evidence Map', d: 'Trace every requirement back to the exact standard clause — no black-box AI decisions.', href: '/dashboard/compliance/evidence-map', lbl: 'View Evidence Map' },
              { icon: '✅', t: 'Compliance Checklist', d: 'Auto-generated, trackable checklists from analysis results with export capability.', href: '/dashboard/checklist', lbl: 'Open Checklist' },
              { icon: '📍', t: 'Certification Roadmap', d: '6-step guided certification journey from document preparation to BIS approval.', href: '/dashboard/roadmap', lbl: 'View Roadmap' },
            ].map((f) => (
              <div key={f.t} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 10, padding: 20 }}>
                <div style={{ fontSize: 26, marginBottom: 12 }}>{f.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{f.t}</div>
                <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, marginBottom: 14 }}>{f.d}</div>
                <Link href={f.href}>
                  <span style={{ fontSize: 12, color: '#0a7ea4', fontWeight: 600, cursor: 'pointer' }}>
                    {f.lbl} →
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '64px 40px', background: '#0f2d6b', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, color: 'white', letterSpacing: -0.3, marginBottom: 14 }}>
            See it in action — start the demo
          </h2>
          <p style={{ color: '#bfdbfe', marginBottom: 28, lineHeight: 1.6 }}>
            No login credentials, no API keys required. Runs entirely on local mock data.
          </p>
          <Link href="/login">
            <button style={{ padding: '14px 36px', background: 'white', color: '#0f2d6b', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
              ⚡ Start Demo →
            </button>
          </Link>
          <div style={{ marginTop: 20, fontSize: 12, color: '#93c5fd' }}>
            Login → Dashboard → AI Assistant → Find Standard → Compliance Analyzer → Evidence Map
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'white', borderTop: '1px solid #e2e8f0', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ fontSize: 12, color: '#94a3b8' }}>
          BIS AI Assistant · Smart India Hackathon 2026 · Problem SIH26107 · Prototype / Demo Only
        </div>
        <div style={{ fontSize: 12, color: '#94a3b8' }}>
          Not official BIS software · Mock data only · Not for regulatory use
        </div>
      </footer>
    </div>
  );
}
