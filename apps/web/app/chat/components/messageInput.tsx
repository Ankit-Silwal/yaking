"use client";

type Props = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSend: () => void;
};

export function MessageInput({ input, setInput, handleSend }: Props)
{
  return (
    <div className="p-6 bg-transparent">
      <div className="max-w-3xl mx-auto flex items-center gap-3 bg-white p-2 rounded-[24px] shadow-xl shadow-black/5 border border-gray-100">
        
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) =>
          {
            if (e.key === "Enter") handleSend();
          }}
          placeholder="Write a message..."
          className="flex-1 bg-transparent px-4 py-2 outline-none text-sm text-gray-800 placeholder:text-gray-400"
        />

        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="bg-black text-white h-10 px-6 rounded-full text-xs font-bold hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-20"
        >
          SEND
        </button>

      </div>
    </div>
  );
}