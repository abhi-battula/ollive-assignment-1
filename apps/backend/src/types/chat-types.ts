export type ChatRole = "user" | "assistant";

export type LLMMessage = {
  role: ChatRole;
  content: string;
};

export type StreamChatOptions = {
  message: string;
  conversationId: string;
  provider: "gemini";
};

export type GenerateTextOptions = {
  provider: "gemini";
  messages: LLMMessage[];
  conversationId: string;
};