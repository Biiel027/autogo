export type LeadStage = 
  | 'new'
  | 'interviewing'
  | 'profile_confirmed'
  | 'recommendation_sent'
  | 'handoff_requested'
  | 'closed';

export type LeadQuality = 'hot' | 'warm' | 'cold';

export type CarFuel = 'flex' | 'gasolina' | 'diesel' | 'elétrico' | 'híbrido' | 'híbrido_plug-in';
export type CarTransmission = 'manual' | 'automático' | 'cvt';
export type CarBodyType = 'hatch' | 'sedã' | 'suv' | 'picape' | 'minivan' | 'cupê' | 'conversível' | 'utilitário';

export interface ProfileData {
  city?: string | null;
  name?: string | null;
  terrain?: string | null;
  has_pets?: boolean | null;
  min_year?: number | null;
  pet_size?: string | null;
  use_type?: string | null; // 'PF' | 'PJ'
  has_cargo?: boolean | null;
  mapa_top3?: string[] | null;
  monthly_km?: number | null;
  passengers?: number | null;
  trade_in_km?: number | null;
  accepts_used?: boolean | null;
  has_children?: boolean | null;
  has_trade_in?: boolean | null;
  payment_type?: string | null;
  total_budget?: number | null;
  transmission?: string | null;
  children_ages?: string | null;
  trade_in_year?: number | null;
  needs_car_seat?: boolean | null;
  trade_in_model?: string | null;
  body_preference?: string[] | null;
  brand_blacklist?: string[] | null;
  brand_whitelist?: string[] | null;
  lifestyle_notes?: string | null;
  interested_in_ev?: boolean | null;
  max_monthly_cost?: number | null;
  ownership_period_years?: number | null;
}

export interface Lead {
  id: string;
  phone: string;
  name: string | null;
  city: string | null;
  stage: LeadStage;
  lead_quality: LeadQuality | null;
  profile_data: ProfileData | null;
  mapa_ranking: string[] | null;
  ctm_estimate: number | null; // Custo Total Mensal
  ownership_period_years: number | null;
  ctp_estimate: number | null; // Custo Total de Propriedade
  consultant_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  version: string | null;
  year: number;
  km: number | null;
  color: string | null;
  price: number;
  accepts_trade: boolean;
  financing_available: boolean;
  fuel: CarFuel;
  transmission: CarTransmission;
  body_type: CarBodyType;
  avg_consumption_city: number | null;
  avg_consumption_road: number | null;
  monthly_cost_estimate: number | null;
  notes: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LangChainMessage {
  type: 'ai' | 'human' | 'system';
  content: string;
  tool_calls?: any[];
  additional_kwargs?: Record<string, any>;
  response_metadata?: Record<string, any>;
  invalid_tool_calls?: any[];
}

export interface ChatHistoryRecord {
  id: number;
  session_id: string;
  message: LangChainMessage;
  created_at: string;
}

export interface UserAuth {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  role: 'admin' | 'consultant';
}
