import axios from "axios";
import type { Message } from "../types/chat";

const BASE_URL = "http://localhost:3000";

const api = axios.create({ baseURL: BASE_URL });

export async function createConversation() {
  const response = await api.post("/conversations");
  return response.data;
}

export async function getConversations() {
  const response = await api.get("/conversations");
  return response.data;
}

export async function getMessages(conversationId: string) {
  const response = await api.get(
    `/conversations/${conversationId}/messages`
  );

  return response.data;
}

export async function streamChat(
  conversationId: string,
  message: string,
  provider: string,
  onChunk: (chunk: string) => void
) {
  const response = await fetch(`${BASE_URL}/chat`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      conversationId,
      message,
      provider,
    }),
  });

  if (!response.body) {
    throw new Error("No response body");
  }

  const reader = response.body.getReader();

  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    const chunk = decoder.decode(value);

    onChunk(chunk);
  }
}