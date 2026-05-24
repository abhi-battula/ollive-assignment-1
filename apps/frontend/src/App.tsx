import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import ProviderSelector from "./components/ProviderSelector";

import {
  createConversation,
  getConversations,
  getMessages,
  streamChat,
} from "./services/api";

import type {
  Conversation,
  Message,
} from "./types/chat";

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  const [conversations, setConversations] = useState<Conversation[]>([]);

  const [activeConversationId, setActiveConversationId] = useState("");

  const [provider, setProvider] = useState("gemini");

  const [loading, setLoading] = useState(false);

  useEffect(() => { loadConversations(); }, []);

  async function loadConversations() {
    const data = await getConversations();

    setConversations(data);
  }

  async function handleCreateConversation() {
    const conversation = await createConversation();

    setConversations((prev) => [conversation, ...prev]);

    setActiveConversationId(conversation.id);

    setMessages([]);
  }

  async function handleSelectConversation(id: string) {
    setActiveConversationId(id);

    const data = await getMessages(id);

    setMessages(data);
  }

  async function handleSend(message: string) {
    if (!activeConversationId) {
      return;
    }

    setLoading(true);

    const userMessage: Message = {
      role: "user",
      content: message,
    };

    const assistantMessage: Message = {
      role: "assistant",
      content: "",
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      assistantMessage,
    ]);

    await streamChat(
      activeConversationId,
      message,
      provider,

      (chunk) => {
        setMessages((prev) => {
          const updated = [...prev];

          const lastMessage = updated[updated.length - 1];

          if (!lastMessage) {
            return updated;
          }

          lastMessage.content += chunk;

          return updated;
        });
      }
    );

    setLoading(false);
  }

  return (
    <div className="h-screen flex bg-slate-950 text-white">
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onCreateConversation={handleCreateConversation}
      />

      <div className="flex-1 flex flex-col">
        <div className="h-[70px] border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900">
          <div>
            <h1 className="text-xl font-semibold">
              Ollive LLM Inference System
            </h1>

            <p className="text-sm text-slate-400 mt-1">
              Multi-provider streaming chatbot with ingestion pipeline
            </p>
          </div>

          {/* <ProviderSelector
            provider={provider}
            setProvider={setProvider}
          /> */}
        </div>

        <ChatWindow messages={messages} />

        <MessageInput
          onSend={handleSend}
          loading={loading}
        />
      </div>
    </div>
  );
}