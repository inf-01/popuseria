'use client';

import { useChat } from 'ai/react';

export default function ChatComponent() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

    return (
        <div className="flex flex-col w-full">
            <div className="h-[450px] overflow-y-auto neu-light-inset rounded-[40px] p-6 mb-8 space-y-6 border border-white/20">
                {messages.length === 0 && (
                    <div className="text-center text-slate-400 mt-8 font-bold tracking-tight opacity-70 italic">
                        ¡Hola! ¿Cuántas pupusas mixtas (₡2,000) deseas para este viernes?
                    </div>
                )}
                {messages.map(m => (
                    <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-5 rounded-[30px] max-w-[88%] shadow-sm whitespace-pre-wrap font-medium transition-all ${m.role === 'user'
                                ? 'neu-user-bubble ring-1 ring-white/20'
                                : 'neu-dark-convex text-slate-200 border border-white/5'
                            }`}>
                            {m.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="p-4 rounded-[20px] bg-slate-200/50 text-slate-500 animate-pulse border border-black/5 italic">
                            Preparando respuesta...
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-4 items-center">
                <div className="flex-1 relative group">
                    <input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Escribe tu mensaje aquí..."
                        className="w-full text-slate-700 bg-transparent outline-none neu-light-inset rounded-[30px] px-8 py-5 placeholder:text-slate-400 border border-transparent focus:border-[#e06c4c]/20 transition-all"
                        disabled={isLoading}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading || !input}
                    className="neu-button-light rounded-[30px] px-10 py-5 text-[#e06c4c] font-black uppercase tracking-widest active:scale-95 disabled:opacity-30 transition-all duration-200"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
}
