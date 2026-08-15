-- ==============================================================================
-- AutoGO - Supabase Schema & Setup Script
-- Inteligência Artificial para Recomendação de Carros & Painel de Gestão
-- ==============================================================================

-- 1. TABELA DE LEADS / COMPRADORES
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    whatsapp_id VARCHAR(100),
    email VARCHAR(255),
    city VARCHAR(150),
    state VARCHAR(10),
    budget_min NUMERIC(12, 2) DEFAULT 0,
    budget_max NUMERIC(12, 2) DEFAULT 0,
    usage_type VARCHAR(100), -- 'urbano', 'estrada_viagens', 'familia', 'trabalho_aplicativo', 'misto'
    preferred_category VARCHAR(100), -- 'SUV', 'Sedan', 'Hatch', 'Pickup', 'Elétrico/Híbrido'
    transmission_pref VARCHAR(50), -- 'Automático', 'Manual', 'Indiferente'
    fuel_pref VARCHAR(50), -- 'Flex', 'Híbrido', 'Elétrico', 'Diesel', 'Gasolina'
    priorities JSONB DEFAULT '[]'::jsonb, -- ['consumo_baixo', 'seguranca', 'porta_malas_grande', 'conforto']
    family_size INT DEFAULT 1,
    current_vehicle VARCHAR(150),
    status VARCHAR(50) DEFAULT 'qualificado', -- 'novo', 'em_conversa', 'qualificado', 'relatorio_enviado', 'agendado', 'concluido', 'perdido'
    urgency VARCHAR(50) DEFAULT 'media' -- 'imediata', 'alta', 'media', 'baixa'
);

-- 2. TABELA DE CONVERSAS (WHATSAPP & WEB)
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
    channel VARCHAR(50) DEFAULT 'whatsapp' NOT NULL, -- 'whatsapp' ou 'web'
    status VARCHAR(50) DEFAULT 'ativa' NOT NULL, -- 'ativa', 'aguardando_cliente', 'relatorio_gerado', 'agendado', 'encerrada'
    last_message_preview TEXT,
    unread_count INT DEFAULT 0,
    messages JSONB DEFAULT '[]'::jsonb NOT NULL -- [{id, sender: 'user'|'agent'|'system', text, timestamp, metadata}]
);

-- 3. TABELA DE RELATÓRIOS DE RECOMENDAÇÃO GERADOS PELA IA
CREATE TABLE IF NOT EXISTS public.recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE SET NULL,
    summary_profile TEXT NOT NULL,
    ai_justification TEXT NOT NULL,
    suggested_vehicles JSONB DEFAULT '[]'::jsonb NOT NULL, -- [{brand, model, version, year, price_fipe, price_range, match_score, pros, cons, consumption, highlights, image_url}]
    verdict_summary TEXT,
    pdf_url TEXT
);

-- 4. TABELA DE AGENDAMENTOS (TEST-DRIVES & CONSULTORIAS)
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
    scheduled_date TIMESTAMPTZ NOT NULL,
    appointment_type VARCHAR(100) DEFAULT 'consultoria_online' NOT NULL, -- 'consultoria_online', 'test_drive_concessionaria', 'avaliacao_usado'
    status VARCHAR(50) DEFAULT 'confirmado' NOT NULL, -- 'confirmado', 'pendente', 'realizado', 'cancelado'
    vehicle_interest VARCHAR(200),
    dealership_partner VARCHAR(200),
    meeting_link VARCHAR(500),
    notes TEXT
);

-- 5. ÍNDICES DE PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_leads_whatsapp ON public.leads(whatsapp_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_conversations_lead ON public.conversations(lead_id);
CREATE INDEX IF NOT EXISTS idx_conversations_channel ON public.conversations(channel);
CREATE INDEX IF NOT EXISTS idx_recommendations_lead ON public.recommendations(lead_id);
CREATE INDEX IF NOT EXISTS idx_appointments_lead ON public.appointments(lead_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(scheduled_date);

-- 6. POLÍTICAS DE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Política de acesso para usuários autenticados (Painel Admin)
CREATE POLICY "Permitir tudo para usuários autenticados em leads" 
    ON public.leads FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Permitir tudo para usuários autenticados em conversas" 
    ON public.conversations FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Permitir tudo para usuários autenticados em recomendacoes" 
    ON public.recommendations FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Permitir tudo para usuários autenticados em agendamentos" 
    ON public.appointments FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Política para a Service Role / n8n Webhooks (leitura e inserção anônima/serviço)
CREATE POLICY "Permitir insercao anonima de leads via chat web" 
    ON public.leads FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Permitir insercao anonima de conversas via chat web" 
    ON public.conversations FOR ALL TO anon USING (true) WITH CHECK (true);
