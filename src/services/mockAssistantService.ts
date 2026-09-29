import { ChatMessage, MOCK_CHAT_RESPONSES } from '@/data/chatResponses';

let messageCounter = 100;

function matchResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('water bottle') || lower.includes('stainless steel bottle') || lower.includes('flask')) return 'water_bottle';
  if (lower.includes('certification') || lower.includes('document') || lower.includes('application')) return 'certification_docs';
  if (lower.includes('isi mark') || lower.includes('needs isi')) return 'isi_mark';
  if (lower === 'indian standards' || lower.includes('what are indian standards')) return 'indian_standards';
  if (lower.includes('compliance') || lower.includes('requirements')) return 'compliance';
  return 'default';
}

export async function askAssistant(message: string): Promise<ChatMessage> {
  // Simulate thinking delay
  await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1000));

  const key = matchResponse(message);
  const template = MOCK_CHAT_RESPONSES[key] ?? MOCK_CHAT_RESPONSES['default'];

  return {
    id: `msg-${++messageCounter}`,
    role: 'assistant',
    timestamp: new Date().toISOString(),
    ...template,
  };
}

export function createUserMessage(content: string): ChatMessage {
  return {
    id: `msg-${++messageCounter}`,
    role: 'user',
    content,
    timestamp: new Date().toISOString(),
  };
}

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-001',
    role: 'assistant',
    content:
      'Welcome to BIS AI Assistant. I can help you identify applicable Indian Standards, analyze compliance requirements, and guide you through the certification process. How can I help you today?\n\n**Note: This is a demo environment. All responses use mock/sample data.**',
    timestamp: new Date().toISOString(),
    followUpQuestions: [
      'Which standard applies to stainless steel water bottles?',
      'What documents are required for BIS certification?',
      'How do I get an ISI mark for my product?',
      'What is the BIS certification process for kitchenware?',
    ],
  },
];
