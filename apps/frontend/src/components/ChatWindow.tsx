import type { Message } from "../types/chat";

type Props = {
  messages: Message[];
};

export default function ChatWindow({ messages }: Props) {
  return (
    <div className="flex-1 overflow-auto p-6 flex flex-col gap-5">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`max-w-[75%] p-4 rounded-2xl leading-7 whitespace-pre-wrap ${
            message.role === "user"
              ? "bg-blue-600 self-end"
              : "bg-slate-800 self-start"
          }`}
        >
          {message.content}
        </div>
      ))}
    </div>
  );
}