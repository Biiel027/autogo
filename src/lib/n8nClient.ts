const n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || '';

export interface AgentResponse {
  text: string;
  quickReplies?: string[];
  stage?: string;
  quality?: string;
}

export const sendMessageToAgent = async (
  userMessage: string,
  history: { type: 'human' | 'ai'; content: string }[],
  sessionId: string = 'web-session'
): Promise<AgentResponse> => {
  // Defesa contra sobrecarga de caracteres
  const sanitizedInput = userMessage.trim().slice(0, 500);

  if (n8nWebhookUrl && !n8nWebhookUrl.includes('your-n8n-domain')) {
    try {
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-autogo-client': 'web-portal'
        },
        body: JSON.stringify({
          sessionId,
          chatInput: sanitizedInput,
          history: history.slice(-10), // Limita histórico recente enviado no payload
          channel: 'web_portal',
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        const data = await response.json();
        return {
          text: data.output || data.text || data.message || (typeof data === 'string' ? data : 'Entendido!'),
          quickReplies: data.quickReplies,
          stage: data.stage,
          quality: data.quality
        };
      } else {
        console.warn(`Webhook do n8n retornou status ${response.status}`);
      }
    } catch (error) {
      console.error('Falha de conexão com o Webhook do n8n:', error);
    }
  }

  // Resposta padrão quando o n8n está inacessível / offline
  return {
    text: 'O serviço de consultoria online está temporariamente indisponível no momento. Por favor, tente novamente mais tarde ou fale diretamente com nosso consultor pelo WhatsApp.'
  };
};
