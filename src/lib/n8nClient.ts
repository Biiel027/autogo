import { MOCK_CARS } from './mockData';
import { Car } from '../types';

const n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || '';

export interface AgentResponse {
  text: string;
  suggestedCars?: Car[];
  quickReplies?: string[];
  stage?: string;
  quality?: string;
}

export const sendMessageToAgent = async (
  userMessage: string,
  history: { type: 'human' | 'ai'; content: string }[],
  sessionId: string = 'web-session'
): Promise<AgentResponse> => {
  // Se houver Webhook real do n8n configurado
  if (n8nWebhookUrl && !n8nWebhookUrl.includes('your-n8n-domain')) {
    try {
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          chatInput: userMessage,
          history,
          channel: 'web_portal',
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        const data = await response.json();
        return {
          text: data.output || data.text || data.message || (typeof data === 'string' ? data : 'Entendido!'),
          suggestedCars: data.suggestedCars,
          quickReplies: data.quickReplies,
          stage: data.stage,
          quality: data.quality
        };
      }
    } catch (error) {
      console.warn('Webhook do n8n não respondeu, acionando motor de resposta local:', error);
    }
  }

  // Motor local que simula a IA do n8n com as tags de estágio
  return simulateAutomotiveAI(userMessage, history);
};

function simulateAutomotiveAI(
  message: string,
  history: { type: 'human' | 'ai'; content: string }[]
): Promise<AgentResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lower = message.toLowerCase();
      const stepCount = history.filter(h => h.type === 'human').length;

      // Saudação / Início
      if (stepCount === 0 || lower.includes('olá') || lower.includes('oi') || lower.includes('começar')) {
        resolve({
          text: 'Olá! Sou o consultor automotivo do AutoGO. 🚗\n\nEstou aqui para entender exatamente o seu perfil e encontrar as melhores opções do estoque.\n\nPara começarmos: o carro que você procura será para uso pessoal (PF) ou empresa (PJ), e qual faixa de orçamento você planeja investir?',
          quickReplies: [
            'Uso Pessoal até R$ 90 mil',
            'Uso Pessoal até R$ 160 mil',
            'Família / SUV até R$ 200 mil',
            'Quero um carro 100% Elétrico'
          ],
          stage: 'interviewing',
          quality: 'warm'
        });
        return;
      }

      // Perua / Volvo / Palio Weekend / Gabriel profile
      if (lower.includes('volvo') || lower.includes('perua') || lower.includes('weekend') || lower.includes('90')) {
        const volvo = MOCK_CARS.find(c => c.brand === 'Volvo') || MOCK_CARS[0];
        const golf = MOCK_CARS.find(c => c.model.includes('Golf')) || MOCK_CARS[4];

        resolve({
          text: `Excelente direcionamento! Para quem valoriza conforto de rodagem, dinâmica e porta-malas amplo sem a altura de um SUV, temos duas opções em destaque no estoque:\n\n1. **${volvo.brand} ${volvo.model} ${volvo.version} (${volvo.year})**: R$ ${volvo.price.toLocaleString('pt-BR')} (Segurança exemplar e acabamento premium).\n2. **${golf.brand} ${golf.model} (${golf.year})**: R$ ${golf.price.toLocaleString('pt-BR')} (605L de porta-malas e motor 1.4 TSI ágil).\n\nVocê tem algum veículo para entrar na troca (trade-in)?`,
          suggestedCars: [volvo, golf],
          quickReplies: [
            'Tenho carro na troca',
            'Pretendo pagar à vista',
            'Quero simular financiamento'
          ],
          stage: 'profile_confirmed',
          quality: 'hot'
        });
        return;
      }

      // Elétrico / BYD
      if (lower.includes('elétrico') || lower.includes('eletrico') || lower.includes('byd') || lower.includes('dolphin')) {
        const dolphin = MOCK_CARS.find(c => c.brand === 'BYD') || MOCK_CARS[3];
        resolve({
          text: `Ótima escolha! O **${dolphin.brand} ${dolphin.model}** (R$ ${dolphin.price.toLocaleString('pt-BR')}) tem custo estimado de rodagem de apenas R$ 420/mês, com 8 anos de garantia na Bateria Blade e câmera 360° panorâmica.\n\nVocê possui ponto de recarga na sua residência ou garagem?`,
          suggestedCars: [dolphin],
          quickReplies: ['Sim, tenho tomada na garagem', 'Uso carregadores públicos', 'Agendar test-drive'],
          stage: 'profile_confirmed',
          quality: 'warm'
        });
        return;
      }

      // SUV / Família / Corolla Cross / Compass
      if (lower.includes('suv') || lower.includes('família') || lower.includes('familia') || lower.includes('filhos') || lower.includes('180') || lower.includes('200')) {
        const corolla = MOCK_CARS.find(c => c.model.includes('Corolla')) || MOCK_CARS[1];
        const compass = MOCK_CARS.find(c => c.model.includes('Compass')) || MOCK_CARS[2];

        resolve({
          text: `Para uso familiar e viagens, cruzamos nosso estoque:\n\n1. **${corolla.brand} ${corolla.model} Hybrid (${corolla.year})**: R$ ${corolla.price.toLocaleString('pt-BR')} — Consumo urbano de 17,8 km/l.\n2. **${compass.brand} ${compass.model} Turbo (${compass.year})**: R$ ${compass.price.toLocaleString('pt-BR')} — Motor de 185 cv e acabamento refinado.\n\nQual dessas opções você gostaria de agendar uma visita ou test-drive?`,
          suggestedCars: [corolla, compass],
          quickReplies: ['Quero testar o Corolla Cross', 'Quero testar o Compass', 'Receber proposta no WhatsApp'],
          stage: 'recommendation_sent',
          quality: 'hot'
        });
        return;
      }

      // Resposta padrão
      resolve({
        text: `Compreendi suas preferências! Salvei os critérios de segurança, consumo e faixa de preço no seu perfil.\n\nQual o seu melhor horário para um consultor te apresentar as condições de negociação e fotos detalhadas dos carros?`,
        suggestedCars: [MOCK_CARS[0], MOCK_CARS[1]],
        quickReplies: ['Pela manhã', 'À tarde', 'Conversar no WhatsApp'],
        stage: 'handoff_requested',
        quality: 'hot'
      });
    }, 600);
  });
}
