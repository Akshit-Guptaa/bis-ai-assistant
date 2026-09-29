'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { askAssistant, createUserMessage, INITIAL_MESSAGES } from '@/services/mockAssistantService';
import { ChatMessage, EvidenceCard, StandardCard } from '@/data/chatResponses';

function StatusDot() {
  return (
    <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#22c55e', marginRight: 6 }} className="animate-pulse-dot" />
  );
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 5, padding: '12px 16px', alignItems: 'center' }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#94a3b8', display: 'inline-block', animation: `pulse-dot 1.2s ease-in-out ${i * 0.2}s infinite` }} />
      ))}
    </div>
  );
}

function StandardCardUI({ card }: { card: StandardCard }) {
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 16, background: '#fafbff', marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <span className="badge badge-info" style={{ fontFamily: 'monospace', fontSize: 12 }}>{card.id}</span>
        <span style={{ fontSize: 11, color: '#0a7ea4', fontWeight: 600 }}>{card.relevance}</span>
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{card.title}</div>
      <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>{card.explanation}</div>
    </div>
  );
}

function EvidenceCardUI({ card }: { card: EvidenceCard }) {
  return (
    <div className="evidence-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <span className="demo-badge" style={{ fontSize: 10 }}>{card.label}</span>
      </div>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{card.document}</div>
      <div style={{ fontSize: 11, color: '#0a7ea4', fontWeight: 600, marginBottom: 8 }}>§ {card.section}</div>
      <div style={{ fontSize: 12, color: '#475569', fontStyle: 'italic', lineHeight: 1.5, background: 'rgba(255,255,255,0.7)', borderRadius: 6, padding: '8px 10px' }}>
        "{card.excerpt}"
      </div>
    </div>
  );
}

function MessageBubble({ msg, onAction }: { msg: ChatMessage; onAction: (action: string) => void }) {
  const isUser = msg.role === 'user';
  const [copied, setCopied] = useState(false);

  const copyText = () => {
    navigator.clipboard.writeText(msg.content).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexDirection: isUser ? 'row-reverse' : 'row', animation: 'fadeIn 0.3s ease' }}>
      {/* Avatar */}
      <div style={{ width: 34, height: 34, borderRadius: '50%', background: isUser ? '#e2e8f0' : '#0f2d6b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isUser ? 14 : 12, fontWeight: 700, color: isUser ? '#475569' : 'white', flexShrink: 0 }}>
        {isUser ? '👤' : 'AI'}
      </div>

      <div style={{ maxWidth: '80%', flex: 1 }}>
        {/* Bubble */}
        <div style={{
          background: isUser ? '#0f2d6b' : 'white',
          color: isUser ? 'white' : '#0f172a',
          border: isUser ? 'none' : '1px solid #e2e8f0',
          borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          padding: '14px 18px',
          fontSize: 14,
          lineHeight: 1.7,
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        }}>
          <div style={{ whiteSpace: 'pre-wrap' }}
            dangerouslySetInnerHTML={{
              __html: msg.content
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br/>'),
            }}
          />
        </div>

        {/* Standard cards */}
        {!isUser && msg.standardCards && msg.standardCards.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#0a7ea4', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8 }}>Applicable Standards</div>
            {msg.standardCards.map((c) => <StandardCardUI key={c.id} card={c} />)}
          </div>
        )}

        {/* Action buttons */}
        {!isUser && msg.actionButtons && msg.actionButtons.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
            {msg.actionButtons.map((btn) => (
              <button key={btn.label}
                className={`btn btn-sm ${btn.variant === 'primary' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => onAction(btn.action)}
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}

        {/* Follow-up questions */}
        {!isUser && msg.followUpQuestions && msg.followUpQuestions.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 6, fontWeight: 600 }}>Suggested follow-ups:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {msg.followUpQuestions.map((q) => (
                <button key={q}
                  style={{ background: '#f8f9fb', border: '1px solid #e2e8f0', borderRadius: 100, padding: '4px 12px', fontSize: 11, color: '#475569', cursor: 'pointer' }}
                  onClick={() => onAction(`__ask__${q}`)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message actions */}
        {!isUser && (
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <button onClick={copyText} className="btn btn-ghost btn-sm" style={{ fontSize: 11 }}>
              {copied ? '✓ Copied' : '📋 Copy'}
            </button>
            <button className="btn btn-ghost btn-sm" style={{ fontSize: 11 }}>👍 Helpful</button>
            <button className="btn btn-ghost btn-sm" style={{ fontSize: 11 }}>👎 Not helpful</button>
            <span style={{ fontSize: 11, color: '#94a3b8', alignSelf: 'center', marginLeft: 'auto' }}>
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function AssistantPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [evidenceMessages, setEvidenceMessages] = useState<ChatMessage[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setInput('');
      handleSend(q);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Collect messages that have evidence
  useEffect(() => {
    setEvidenceMessages(messages.filter((m) => m.evidenceCards && m.evidenceCards.length > 0));
  }, [messages]);

  const handleSend = async (text?: string) => {
    const content = text ?? input.trim();
    if (!content || loading) return;
    setInput('');
    const userMsg = createUserMessage(content);
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    const reply = await askAssistant(content);
    setMessages((prev) => [...prev, reply]);
    setLoading(false);
  };

  const handleAction = (action: string) => {
    if (action.startsWith('__ask__')) {
      handleSend(action.replace('__ask__', ''));
    } else if (action === 'find_standard') {
      router.push('/dashboard/find-standard');
    } else if (action === 'start_roadmap') {
      router.push('/dashboard/roadmap');
    } else if (action === 'generate_checklist') {
      router.push('/dashboard/checklist');
    } else if (action === 'bis_services') {
      router.push('/dashboard/services');
    } else if (action === 'analyze_compliance') {
      router.push('/dashboard/compliance');
    } else if (action === 'view_evidence') {
      // Scroll to evidence panel on mobile, or just highlight
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* Chat main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid #f1f5f9', background: 'white', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div className="page-eyebrow" style={{ marginBottom: 4 }}>AI Assistant</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h1 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', letterSpacing: -0.3 }}>BIS AI Assistant</h1>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: 12, color: '#475569' }}>
                  <StatusDot /><span>Active · Demo Mode</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <span className="demo-badge">DEMO — Mock Data</span>
              <button className="btn btn-ghost btn-sm" onClick={() => setMessages(INITIAL_MESSAGES)}>New Chat</button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} onAction={handleAction} />
          ))}
          {loading && (
            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#0f2d6b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white', flexShrink: 0 }}>AI</div>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '18px 18px 18px 4px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <TypingIndicator />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ padding: '16px 24px', background: 'white', borderTop: '1px solid #e2e8f0', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <textarea
                className="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Ask about Indian Standards, certification, testing or BIS services… (Press Enter to send)"
                style={{ minHeight: 52, maxHeight: 160, resize: 'none', paddingRight: 48 }}
                disabled={loading}
              />
              <button
                title="Voice input (Demo mode)"
                onClick={() => alert('Voice input is in demo mode. Type your question to continue.')}
                style={{ position: 'absolute', right: 10, bottom: 10, background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#94a3b8' }}
              >
                🎤
              </button>
            </div>
            <button
              className="btn btn-primary"
              style={{ padding: '12px 20px', flexShrink: 0 }}
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
            >
              {loading ? <span className="spinner" /> : '↑'}
            </button>
          </div>
          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 8, textAlign: 'center' }}>
            All responses use mock/demo data · Not official BIS guidance
          </div>
        </div>
      </div>

      {/* Evidence Panel */}
      <div style={{ width: 320, borderLeft: '1px solid #e2e8f0', background: '#fafbff', display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #f1f5f9' }}>
          <div className="page-eyebrow" style={{ marginBottom: 4 }}>Evidence & Sources</div>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Referenced Documents</h2>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px' }}>
          {evidenceMessages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 6 }}>No evidence yet</div>
              <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.6 }}>Ask a question to see relevant source evidence and citations appear here.</div>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 12, fontWeight: 600 }}>
                {evidenceMessages.reduce((a, m) => a + (m.evidenceCards?.length ?? 0), 0)} evidence item(s) referenced
              </div>
              {evidenceMessages.map((m) =>
                m.evidenceCards?.map((card) => (
                  <EvidenceCardUI key={`${m.id}-${card.document}`} card={card} />
                ))
              )}

              <div style={{ marginTop: 16, padding: 14, background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#854d0e', marginBottom: 4 }}>⚠ Demo Notice</div>
                <div style={{ fontSize: 11, color: '#92400e', lineHeight: 1.5 }}>All evidence shown is mock/sample data for demonstration. Verify with official BIS documents.</div>
              </div>
            </>
          )}
        </div>

        {/* Quick nav */}
        <div style={{ padding: 16, borderTop: '1px solid #f1f5f9', display: 'grid', gap: 8 }}>
          <Link href="/dashboard/find-standard">
            <button className="btn btn-outline btn-full btn-sm" style={{ justifyContent: 'center' }}>📋 Find Standard</button>
          </Link>
          <Link href="/dashboard/compliance">
            <button className="btn btn-outline btn-full btn-sm" style={{ justifyContent: 'center' }}>⚡ Analyze Document</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AssistantPage() {
  return (
    <Suspense>
      <AssistantPageInner />
    </Suspense>
  );
}
