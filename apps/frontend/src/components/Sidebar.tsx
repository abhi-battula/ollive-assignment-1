import type { Conversation } from "../types/chat";

type Props = {
  conversations: Conversation[];
  activeConversationId: string;
  onSelectConversation: (id: string) => void;
  onCreateConversation: () => void;
};

export default function Sidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onCreateConversation,
}: Props) {
  return (
    <div className="w-[280px] bg-slate-900 border-r border-slate-800 p-4 flex flex-col">
      <button
        onClick={onCreateConversation}
        className="bg-blue-600 hover:bg-blue-500 transition rounded-xl py-3 font-medium mb-4"
      >
        + New Conversation
      </button>

      <div className="flex flex-col gap-2 overflow-auto">
        {conversations.map((conversation, index) => (
          <button
            key={conversation.id}
            onClick={() => onSelectConversation(conversation.id)}
            className={`text-left p-3 rounded-xl transition border ${
              activeConversationId === conversation.id
                ? "bg-slate-800 border-blue-500"
                : "bg-slate-950 border-slate-800 hover:bg-slate-800"
            }`}
          >
            Conversation {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}