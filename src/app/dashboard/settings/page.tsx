'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const TABS = ['Profile', 'Language', 'Notifications', 'Accessibility', 'Theme'];

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Profile');
  const [language, setLanguage] = useState('English');
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState({
    analysisComplete: true,
    checklistReminders: true,
    systemUpdates: false,
    demoAlerts: true,
  });
  const [accessibility, setAccessibility] = useState({
    largeText: false,
    highContrast: false,
    reducedMotion: false,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ padding: '32px 32px', maxWidth: 800, margin: '0 auto' }}>
      <div className="page-eyebrow" style={{ marginBottom: 4 }}>Account</div>
      <h1 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, color: '#0f172a', letterSpacing: -0.5, marginBottom: 28 }}>Settings</h1>

      {saved && (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '12px 16px', color: '#15803d', fontSize: 13, fontWeight: 600, marginBottom: 20 }}>
          ✓ Settings saved (demo mode — no data persisted to backend)
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, borderBottom: '2px solid #f1f5f9', marginBottom: 32 }}>
        {TABS.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            style={{ padding: '10px 18px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: activeTab === tab ? 700 : 500, color: activeTab === tab ? '#0f2d6b' : '#64748b', borderBottom: activeTab === tab ? '2px solid #0f2d6b' : '2px solid transparent', marginBottom: -2, transition: 'all 0.15s' }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Profile */}
      {activeTab === 'Profile' && (
        <div style={{ display: 'grid', gap: 20 }}>
          <div className="bis-card" style={{ padding: 24 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>Profile Information</h2>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 24 }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#0f2d6b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 22, fontWeight: 700 }}>
                {user?.name?.[0] ?? 'U'}
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>{user?.name}</div>
                <div style={{ fontSize: 13, color: '#64748b' }}>{user?.email}</div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>{user?.role}</div>
              </div>
            </div>

            {[
              { id: 'name', label: 'Full Name', value: user?.name ?? '' },
              { id: 'email', label: 'Email Address', value: user?.email ?? '' },
              { id: 'org', label: 'Organization', value: 'Demo Organization' },
              { id: 'role', label: 'Role / Designation', value: user?.role ?? '' },
            ].map((f) => (
              <div key={f.id} style={{ marginBottom: 16 }}>
                <label className="field-label" htmlFor={f.id}>{f.label}</label>
                <input id={f.id} className="input" defaultValue={f.value} style={{ marginTop: 6 }} />
              </div>
            ))}
          </div>

          {user?.isDemo && (
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: '12px 16px', fontSize: 13, color: '#92400e' }}>
              ⚠ You are using a demo account. Profile changes are local only.
            </div>
          )}
        </div>
      )}

      {/* Language */}
      {activeTab === 'Language' && (
        <div className="bis-card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>Display Language</h2>
          <p style={{ fontSize: 13, color: '#64748b', marginBottom: 20 }}>Select the language for the interface. Multilingual AI responses are part of the planned backend implementation.</p>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              { code: 'English', label: 'English', note: 'Full support' },
              { code: 'हिंदी', label: 'हिंदी (Hindi)', note: 'Coming in Phase 2 — backend required' },
              { code: 'मराठी', label: 'मराठी (Marathi)', note: 'Coming in Phase 2 — backend required' },
            ].map((l) => (
              <div key={l.code}
                style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 16px', border: `2px solid ${language === l.code ? '#0f2d6b' : '#e2e8f0'}`, borderRadius: 10, cursor: 'pointer', background: language === l.code ? '#f0f4ff' : 'white', transition: 'all 0.15s' }}
                onClick={() => setLanguage(l.code)}
              >
                <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${language === l.code ? '#0f2d6b' : '#cbd5e1'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {language === l.code && <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#0f2d6b' }} />}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{l.label}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>{l.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notifications */}
      {activeTab === 'Notifications' && (
        <div className="bis-card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>Notification Preferences</h2>
          {Object.entries(notifications).map(([key, value]) => {
            const labels: Record<string, string> = {
              analysisComplete: 'Analysis complete alerts',
              checklistReminders: 'Checklist reminder notifications',
              systemUpdates: 'System and standards updates',
              demoAlerts: 'Demo mode notices',
            };
            return (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderTop: '1px solid #f8f9fb' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{labels[key]}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>Demo mode — no actual notifications sent</div>
                </div>
                <button
                  onClick={() => setNotifications((p) => ({ ...p, [key]: !value }))}
                  style={{ width: 44, height: 24, borderRadius: 100, background: value ? '#0f2d6b' : '#e2e8f0', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}
                >
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: value ? 23 : 3, transition: 'left 0.2s' }} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Accessibility */}
      {activeTab === 'Accessibility' && (
        <div className="bis-card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>Accessibility Options</h2>
          {Object.entries(accessibility).map(([key, value]) => {
            const labels: Record<string, { l: string; d: string }> = {
              largeText: { l: 'Larger text size', d: 'Increase font sizes across the interface' },
              highContrast: { l: 'High contrast mode', d: 'Increase contrast for better visibility' },
              reducedMotion: { l: 'Reduce motion', d: 'Minimize animations and transitions' },
            };
            const info = labels[key];
            return (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderTop: '1px solid #f8f9fb' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{info.l}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{info.d}</div>
                </div>
                <button
                  onClick={() => setAccessibility((p) => ({ ...p, [key]: !value }))}
                  style={{ width: 44, height: 24, borderRadius: 100, background: value ? '#0f2d6b' : '#e2e8f0', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}
                >
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: value ? 23 : 3, transition: 'left 0.2s' }} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Theme */}
      {activeTab === 'Theme' && (
        <div className="bis-card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>Theme</h2>
          <p style={{ fontSize: 13, color: '#64748b', marginBottom: 20 }}>Choose the interface theme. Dark mode is part of the planned implementation.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { k: 'light', label: 'Light', desc: 'Clean white interface', preview: '#f8f9fb' },
              { k: 'dark', label: 'Dark', desc: 'Coming in Phase 2', preview: '#0f172a' },
            ].map((t) => (
              <div key={t.k}
                style={{ border: `2px solid ${theme === t.k ? '#0f2d6b' : '#e2e8f0'}`, borderRadius: 12, overflow: 'hidden', cursor: 'pointer', background: theme === t.k ? '#f0f4ff' : 'white' }}
                onClick={() => t.k === 'light' ? setTheme(t.k) : alert('Dark mode is coming in Phase 2.')}
              >
                <div style={{ height: 80, background: t.preview, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 80, height: 48, background: t.k === 'light' ? 'white' : '#1e293b', borderRadius: 8, border: `1px solid ${t.k === 'light' ? '#e2e8f0' : '#334155'}` }} />
                </div>
                <div style={{ padding: '12px 16px' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{t.label}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Save */}
      <div style={{ marginTop: 28, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
        <button className="btn btn-ghost">Reset to Defaults</button>
        <button className="btn btn-primary" onClick={handleSave}>Save Settings</button>
      </div>
    </div>
  );
}
