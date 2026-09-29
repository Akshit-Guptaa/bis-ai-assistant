'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const NAV_ITEMS = [
  { href: '/dashboard',                              icon: '⊞',  label: 'Dashboard',             indent: false },
  { href: '/dashboard/assistant',                    icon: '💬',  label: 'AI Assistant',          indent: false },
  { href: '/dashboard/find-standard',                icon: '📋',  label: 'Find Standard',         indent: false },
  { href: '/dashboard/compliance',                   icon: '⚡',  label: 'Compliance Analyzer',   indent: false },
  { href: '/dashboard/compliance/evidence-map',      icon: '🗺',  label: 'Evidence Map',          indent: true  },
  { href: '/dashboard/checklist',                    icon: '✅',  label: 'Compliance Checklist',  indent: false },
  { href: '/dashboard/roadmap',                      icon: '📍',  label: 'Certification Roadmap', indent: false },
  { href: '/dashboard/services',                     icon: '🏛',  label: 'BIS Services',          indent: false },
  { href: '/dashboard/documents',                    icon: '📁',  label: 'Documents',             indent: false },
  { href: '/dashboard/settings',                     icon: '⚙',  label: 'Settings',              indent: false },
];

const LANGUAGES = ['English', 'हिंदी', 'मराठी'];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const [language, setLanguage] = useState('English');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) { router.push('/login'); }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#f8f9fb' }}>
      {/* Sidebar */}
      <aside style={{
        width: 240, background: 'white', borderRight: '1px solid #e2e8f0',
        display: 'flex', flexDirection: 'column', flexShrink: 0,
        transition: 'transform 0.2s ease',
        position: 'relative', zIndex: 40,
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 20px 12px', borderBottom: '1px solid #f1f5f9' }}>
          <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 34, height: 34, background: '#0f2d6b', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12, fontWeight: 800, letterSpacing: 1, flexShrink: 0 }}>BIS</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>BIS AI Assistant</div>
              <div style={{ fontSize: 10, color: '#94a3b8' }}>SIH26107</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && !item.indent && pathname.startsWith(item.href) && !pathname.includes('/evidence-map')) || (item.indent && pathname === item.href);
            return (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none', paddingLeft: item.indent ? 20 : 0 }}>
                {item.indent && (
                  <div style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
                    <div style={{ width: 2, background: isActive ? '#0f2d6b' : '#e2e8f0', borderRadius: 2, marginRight: 8, flexShrink: 0 }} />
                    <div className={`sidebar-link ${isActive ? 'active' : ''}`} style={{ flex: 1, fontSize: 12 }}>
                      <span className="icon" style={{ fontSize: 13 }}>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  </div>
                )}
                {!item.indent && (
                  <div className={`sidebar-link ${isActive ? 'active' : ''}`}>
                    <span className="icon">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#0f172a', marginBottom: 2 }}>{user?.name}</div>
          <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 10 }}>{user?.role}</div>
          {user?.isDemo && <span className="demo-badge" style={{ display: 'inline-block', marginBottom: 8 }}>DEMO</span>}
          <button className="btn btn-ghost btn-sm btn-full" style={{ justifyContent: 'center', fontSize: 12 }} onClick={logout}>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Topbar */}
        <header style={{ height: 60, background: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16, flexShrink: 0 }}>
          {/* Search */}
          <div style={{ flex: 1, maxWidth: 400, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 14 }}>🔍</span>
            <input
              className="input"
              placeholder="Search standards, requirements…"
              style={{ paddingLeft: 36, height: 36, fontSize: 13 }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto' }}>
            {/* Language */}
            <div style={{ position: 'relative' }}>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => { setShowLangMenu(!showLangMenu); setShowUserMenu(false); }}
                style={{ fontSize: 12, gap: 4 }}
              >
                🌐 {language}
              </button>
              {showLangMenu && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 4, background: 'white', border: '1px solid #e2e8f0', borderRadius: 8, padding: 4, zIndex: 100, minWidth: 120, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                  {LANGUAGES.map((l) => (
                    <button key={l} style={{ display: 'block', width: '100%', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, textAlign: 'left', color: l === language ? '#0f2d6b' : '#374151', fontWeight: l === language ? 600 : 400, borderRadius: 4 }}
                      onClick={() => { setLanguage(l); setShowLangMenu(false); }}>
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <button className="btn btn-ghost btn-sm" style={{ position: 'relative', padding: '5px 10px' }}>
              🔔
              <span style={{ position: 'absolute', top: 3, right: 3, width: 8, height: 8, background: '#ef4444', borderRadius: '50%', border: '2px solid white' }} />
            </button>

            {/* User */}
            <div style={{ position: 'relative' }}>
              <button
                style={{ width: 34, height: 34, borderRadius: '50%', background: '#0f2d6b', color: 'white', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}
                onClick={() => { setShowUserMenu(!showUserMenu); setShowLangMenu(false); }}
              >
                {user?.name?.[0] ?? 'U'}
              </button>
              {showUserMenu && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 4, background: 'white', border: '1px solid #e2e8f0', borderRadius: 8, padding: 4, zIndex: 100, minWidth: 180, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                  <div style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{user?.name}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{user?.email}</div>
                  </div>
                  <Link href="/dashboard/settings" style={{ textDecoration: 'none' }}>
                    <button style={{ display: 'block', width: '100%', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, textAlign: 'left', color: '#374151' }} onClick={() => setShowUserMenu(false)}>
                      ⚙️ Settings
                    </button>
                  </Link>
                  <button style={{ display: 'block', width: '100%', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, textAlign: 'left', color: '#ef4444' }} onClick={logout}>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '0' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
