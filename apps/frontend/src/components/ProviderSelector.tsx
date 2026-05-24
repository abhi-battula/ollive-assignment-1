type Props = {
  provider: string;
  setProvider: (provider: string) => void;
};

export default function ProviderSelector({
  provider,
  setProvider,
}: Props) {
  return (
    <select
      value={provider}
      onChange={(e) => setProvider(e.target.value)}
      className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 outline-none"
    >
      <option value="gemini">Gemini</option>
      <option value="openrouter">OpenRouter</option>
    </select>
  );
}