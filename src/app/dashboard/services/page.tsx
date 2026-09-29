'use client';

import { useEffect, useState } from 'react';
import { getBISServices } from '@/services/mockComplianceService';
import { BISService } from '@/data/services';

export default function ServicesPage() {
  const [services, setServices] = useState<BISService[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<BISService | null>(null);

  useEffect(() => {
    getBISServices().then((s) => { setServices(s); setLoading(false); });
  }, []);

  return (
    <div style={{ padding: '32px 32px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <div className="page-eyebrow" style={{ marginBottom: 4 }}>Services</div>
        <h1 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, color: '#0f172a', letterSpacing: -0.5, marginBottom: 8 }}>
          BIS Service Navigator
        </h1>
        <p style={{ color: '#64748b', fontSize: 15, lineHeight: 1.6 }}>
          Find the right BIS service for your need. Navigate certification, testing, licensing, hallmarking and more.
        </p>
      </div>

      <div style={{ marginBottom: 20 }}>
        <span className="demo-badge">DEMO — Mock navigation only. Links do not connect to official BIS portal.</span>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 60 }}>
          <div className="spinner" style={{ width: 36, height: 36, margin: '0 auto 12px' }} />
          <div style={{ color: '#64748b', fontSize: 14 }}>Loading BIS services…</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {services.map((svc) => (
            <div
              key={svc.id}
              className="bis-card"
              style={{ padding: 24, cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', borderTop: `3px solid ${svc.color}` }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${svc.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                  {svc.icon}
                </div>
                <span className="badge badge-neutral" style={{ fontSize: 10 }}>{svc.category}</span>
              </div>

              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>{svc.name}</h3>
              <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, marginBottom: 16 }}>{svc.description}</p>

              <div style={{ background: '#f8f9fb', borderRadius: 8, padding: 12, marginBottom: 16, borderLeft: `3px solid ${svc.color}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>When to use</div>
                <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.5 }}>{svc.whenToUse}</div>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1, justifyContent: 'center', background: svc.color, borderColor: svc.color }}
                  onClick={() => setSelected(svc)}
                >
                  Open Service
                </button>
                <button className="btn btn-ghost btn-sm" onClick={() => setSelected(svc)}>Learn More</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={() => setSelected(null)}>
          <div style={{ background: 'white', borderRadius: 16, padding: 36, maxWidth: 560, width: '100%', animation: 'fadeIn 0.3s ease' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ fontSize: 36 }}>{selected.icon}</div>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>{selected.name}</h2>
                  <span className="badge badge-neutral" style={{ fontSize: 10 }}>{selected.category}</span>
                </div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, width: 36, height: 36, cursor: 'pointer', fontSize: 18 }}>×</button>
            </div>

            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, marginBottom: 20 }}>{selected.description}</p>

            <div style={{ background: '#f8f9fb', borderRadius: 10, padding: 16, marginBottom: 20, borderLeft: `3px solid ${selected.color}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>When to use this service</div>
              <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>{selected.whenToUse}</p>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>Next Action</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{selected.nextAction}</div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                className="btn btn-primary"
                style={{ background: selected.color, borderColor: selected.color }}
                onClick={() => { alert(`Demo mode: "${selected.nextAction}" — In production, this would navigate to the official BIS portal.`); }}
              >
                {selected.nextAction} →
              </button>
              <button className="btn btn-ghost" onClick={() => setSelected(null)}>Close</button>
            </div>

            <div style={{ marginTop: 16 }}>
              <span className="demo-badge">DEMO — Mock navigation only</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
