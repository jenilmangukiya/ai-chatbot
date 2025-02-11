export interface ChatbotConfig {
  id: string;
  name: string;
  knowledge: string;
  createdAt: string;
  updatedAt: string;
  themeConfig: {
    borderColor: string;
    backgroundColor: string;
  };
  starterMessage: string;
  openAiApiKey: string;
  botLogo: string;
}

export interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

export interface ChatHistory {
  messages: Message[];
}
