import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Lead, ChatHistoryRecord, LeadStage, LeadQuality } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || (import.meta.env as any).VITE_SUPABASE_PUBLISHABLE_KEY || '';

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

export const dataStore = {
  // LEADS
  getLeads: async (): Promise<Lead[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .order('updated_at', { ascending: false });
        if (!error && data) return data as Lead[];
        if (error) console.error('Erro ao buscar leads no Supabase:', error);
      } catch (err) {
        console.error('Falha de conexão com Supabase ao buscar leads:', err);
      }
    }
    return [];
  },

  getLeadByPhone: async (phone: string): Promise<Lead | null> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .eq('phone', phone)
          .maybeSingle();
        if (!error && data) return data as Lead;
      } catch (err) {
        console.error('Erro ao buscar lead por telefone no Supabase:', err);
      }
    }
    return null;
  },

  updateLeadStage: async (leadId: string, stage: LeadStage, quality?: LeadQuality | null): Promise<void> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const updatePayload: any = { stage, updated_at: new Date().toISOString() };
        if (quality !== undefined) updatePayload.lead_quality = quality;
        const { error } = await supabase.from('leads').update(updatePayload).eq('id', leadId);
        if (error) console.error('Erro ao atualizar stage no Supabase:', error);
      } catch (err) {
        console.error('Falha ao atualizar stage no Supabase:', err);
      }
    }
  },

  updateConsultantNotes: async (leadId: string, notes: string): Promise<void> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('leads')
          .update({ consultant_notes: notes, updated_at: new Date().toISOString() })
          .eq('id', leadId);
        if (error) console.error('Erro ao salvar notas no Supabase:', error);
      } catch (err) {
        console.error('Falha ao salvar notas no Supabase:', err);
      }
    }
  },

  // CHAT HISTORY (Sessões WhatsApp / Web)
  getChatHistory: async (sessionId?: string): Promise<ChatHistoryRecord[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase.from('chat_history').select('*').order('created_at', { ascending: true });
        if (sessionId) {
          query = query.eq('session_id', sessionId);
        }
        const { data, error } = await query;
        if (!error && data) return data as ChatHistoryRecord[];
        if (error) console.error('Erro ao buscar chat_history no Supabase:', error);
      } catch (err) {
        console.error('Falha ao buscar chat_history no Supabase:', err);
      }
    }
    return [];
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
        if (error) console.error('Erro ao inserir chat_history no Supabase:', error);
      } catch (err) {
        console.error('Falha ao inserir chat_history no Supabase:', err);
      }
    }
    return newRecord;
  }
};
