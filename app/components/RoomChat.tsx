"use client";

import { Send } from "lucide-react";
import { useEffect, useState } from "react";

import {
  ChatMessage,
  sendMessage,
  subscribeChat,
} from "@/services/chat";

type Props = {
  roomId: string;
  uid: string;
  name: string;
  avatar: string;
};

export default function RoomChat({
  roomId,
  uid,
  name,
  avatar,
}: Props) {
  const [messages, setMessages] =
    useState<ChatMessage[]>([]);

  const [text, setText] = useState("");

  useEffect(() => {
    return subscribeChat(roomId, setMessages);
  }, [roomId]);

  return (
    <div className="mesa-panel-gold flex h-full min-h-[420px] flex-col rounded-3xl p-4">

      <div className="mb-4 flex items-center justify-between border-b border-slate-700/70 pb-3">
        <div><p className="text-xs font-bold uppercase tracking-[.2em] text-violet-300">Chat de mesa</p><h2 className="font-black">Conversación en vivo</h2></div>
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,.8)]" />
      </div>

      <div className="mb-4 flex-1 space-y-3 overflow-y-auto pr-1">

        {messages.map((m) => (
          <div key={m.id} className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm ${m.uid === uid ? "ml-auto rounded-br-md bg-emerald-500/20 text-emerald-50" : "rounded-bl-md bg-slate-800/90 text-slate-100"}`}>
            <p className="mb-1 text-xs font-bold text-violet-200">{m.name}</p>
            <p>{m.message}</p>
          </div>
        ))}

      </div>

      <div className="flex gap-2 border-t border-slate-700/70 pt-4">

        <input
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          placeholder="Escribe un mensaje..."
          className="flex-1 rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-3 text-sm outline-none focus:border-violet-400"
        />

        <button
          onClick={async () => {
            await sendMessage(
              roomId,
              uid,
              name,
              avatar,
              text
            );

            setText("");
          }}
          aria-label="Enviar mensaje"
          className="rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 px-4 text-white"
        >
          <Send size={19} />
        </button>

      </div>

    </div>
  );
}
