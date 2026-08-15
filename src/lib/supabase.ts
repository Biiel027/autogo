import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Lead, Car, ChatHistoryRecord, LeadStage, LeadQuality } from '../types';
import { MOCK_LEADS, MOCK_CARS, MOCK_CHAT_HISTORY } from './mockData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-supabase-project')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Parser para tags embutidas do n8n / LangChain: [[STAGE:interviewing|QUALITY:warm]]
export function parseAIMessageContent(rawContent: string): {
  cleanContent: string;
  stage?: LeadStage;
  quality?: LeadQuality;
} {
  if (!rawContent) return { cleanContent: '' };

  const tagMatch = rawContent.match(/\[\[STAGE:([a-z_]+)(?:\|QUALITY:([a-z]+))?\]\]/i);
  let cleanContent = rawContent.replace(/\[\[STAGE:[^\]]+\]\]/g, '').trim();

  // Limpa divisores extras deixados antes da tag
  cleanContent = cleanContent.replace(/---\s*$/, '').trim();

  let stage: LeadStage | undefined;
  let quality: LeadQuality | undefined;

  if (tagMatch) {
    stage = tagMatch[1] as LeadStage;
    if (tagMatch[2]) {
      quality = tagMatch[2].toLowerCase() as LeadQuality;
    }
  }

  return { cleanContent, stage, quality };
}

// Armazenamento em memória / localStorage para fallback local autônomo
const STORAGE_KEYS = {
  LEADS: 'autogo_real_leads',
  CARS: 'autogo_real_cars',
  CHAT_HISTORY: 'autogo_real_chat_history'
};

const getStoredData = <T>(key: string, defaultData: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultData;
  } catch {
    return defaultData;
  }
};

const setStoredData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn('Erro ao salvar no localStorage:', err);
  }
};

export const dataStore = {
  // LEADS
  getLeads: async (): Promise<Lead[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .order('updated_at', { ascending: false });
        if (!error && data && data.length > 0) return data as Lead[];
      } catch (err) {
        console.warn('Erro ao buscar leads no Supabase:', err);
      }
    }
    return getStoredData<Lead[]>(STORAGE_KEYS.LEADS, MOCK_LEADS);
  },

  getLeadByPhone: async (phone: string): Promise<Lead | null> => {
    const all = await dataStore.getLeads();
    return all.find(l => l.phone === phone) || null;
  },

  updateLeadStage: async (leadId: string, stage: LeadStage, quality?: LeadQuality | null): Promise<void> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const updatePayload: any = { stage, updated_at: new Date().toISOString() };
        if (quality) updatePayload.lead_quality = quality;
        await supabase.from('leads').update(updatePayload).eq('id', leadId);
      } catch (err) {
        console.warn('Erro ao atualizar stage no Supabase:', err);
      }
    }
    const current = getStoredData<Lead[]>(STORAGE_KEYS.LEADS, MOCK_LEADS);
    const updated = current.map(l => l.id === leadId ? {
      ...l,
      stage,
      lead_quality: quality !== undefined ? quality : l.lead_quality,
      updated_at: new Date().toISOString()
    } : l);
    setStoredData(STORAGE_KEYS.LEADS, updated);
  },

  updateConsultantNotes: async (leadId: string, notes: string): Promise<void> => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('leads').update({ consultant_notes: notes, updated_at: new Date().toISOString() }).eq('id', leadId);
      } catch (err) {
        console.warn('Erro ao salvar notas no Supabase:', err);
      }
    }
    const current = getStoredData<Lead[]>(STORAGE_KEYS.LEADS, MOCK_LEADS);
    const updated = current.map(l => l.id === leadId ? { ...l, consultant_notes: notes, updated_at: new Date().toISOString() } : l);
    setStoredData(STORAGE_KEYS.LEADS, updated);
  },

  // CARROS / ESTOQUE
  getCars: async (): Promise<Car[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) return data as Car[];
      } catch (err) {
        console.warn('Erro ao buscar carros no Supabase:', err);
      }
    }
    return getStoredData<Car[]>(STORAGE_KEYS.CARS, MOCK_CARS);
  },

  // CHAT HISTORY (LangChain memory)
  getChatHistory: async (sessionId?: string): Promise<ChatHistoryRecord[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase.from('chat_history').select('*').order('created_at', { ascending: true });
        if (sessionId) {
          query = query.eq('session_id', sessionId);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) return data as ChatHistoryRecord[];
      } catch (err) {
        console.warn('Erro ao buscar chat_history no Supabase:', err);
      }
    }
    const stored = getStoredData<ChatHistoryRecord[]>(STORAGE_KEYS.CHAT_HISTORY, MOCK_CHAT_HISTORY);
    return sessionId ? stored.filter(c => c.session_id === sessionId) : stored;
  },

  saveChatMessage: async (sessionId: string, message: { type: 'ai' | 'human' | 'system'; content: string }): Promise<ChatHistoryRecord> => {
    const newRecord: ChatHistoryRecord = {
      id: Date.now(),
      session_id: sessionId,
      message: {
        type: message.type,
        content: message.content,
        tool_calls: [],
        additional_kwargs: {},
        response_metadata: {},
        invalid_tool_calls: []
      },
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('chat_history').insert([{
          session_id: sessionId,
          message: newRecord.message
        }]).select().single();
        if (!error && data) return data as ChatHistoryRecord;
      } catch (err) {
        console.warn('Erro ao inserir chat_history no Supabase:', err);
      }
    }

    const current = getStoredData<ChatHistoryRecord[]>(STORAGE_KEYS.CHAT_HISTORY, MOCK_CHAT_HISTORY);
    const updated = [...current, newRecord];
    setStoredData(STORAGE_KEYS.CHAT_HISTORY, updated);
    return newRecord;
  }
};
