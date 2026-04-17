'use client';

import { useChat } from 'ai/react';

export default function ChatComponent() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

    return (
        <div className="flex flex-col h-[500px]">
            <div className="flex-1 overflow-y-auto neu-nickel-pressed rounded-[30px] p-6 mb-6 space-y-4 border border-black/20">
                {messages.length === 0 && (
                    <div className="text-center text-[#8A9A86] mt-4 font-bold tracking-tight opacity-90 italic">
                        ¡Hola! ¿Cuántas pupusas mixtas se te antojan para este viernes?
                    </div>
                )}
                {messages.map(m => (
                    <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-4 rounded-[25px] max-w-[85%] shadow-xl whitespace-pre-wrap ${m.role === 'user' ? 'bg-[#e06c4c] text-white font-bold ring-1 ring-white/20' : 'neu-nickel-convex text-slate-100 border border-white/5'}`}>
                            {m.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="p-4 rounded-[20px] neu-nickel-flat text-[#8A9A86] animate-pulse border border-white/5">
                            Cocinando respuesta...
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-4">
                <input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Pide tus pupusas aquí..."
                    className="flex-1 text-white bg-transparent outline-none neu-nickel-pressed rounded-[25px] px-8 py-5 placeholder:text-slate-500 border border-black/10 focus:border-[#e06c4c]/30 transition-colors"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading || !input}
                    className="neu-button rounded-[25px] px-10 py-5 text-[#e06c4c] font-black uppercase tracking-widest active:scale-95 disabled:opacity-30 transition-all duration-200"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
}
