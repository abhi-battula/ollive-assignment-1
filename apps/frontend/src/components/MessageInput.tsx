import { useState } from "react";

type Props = {
  onSend: (message: string) => Promise<void>;
  loading: boolean;
};

export default function MessageInput({
  onSend,
  loading,
}: Props) {
  const [message, setMessage] = useState("");

  async function handleSend() {
    if (!message.trim() || loading) {
      return;
    }

    await onSend(message);

    setMessage("");
  }

  return (
    <div className="p-4 border-t border-slate-800 flex gap-3">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask anything..."
        className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 outline-none"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
      />

      <button
        onClick={handleSend}
        className="bg-blue-600 hover:bg-blue-500 transition px-5 rounded-2xl font-medium"
      >
        {loading ? "..." : "Send"}
      </button>
    </div>
  );
}