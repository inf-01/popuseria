'use client';

import { useChat } from 'ai/react';

export default function ChatComponent() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

    return (
        <div className="flex flex-col h-[500px]">
            <div className="flex-1 overflow-y-auto neu-pressed rounded-[20px] p-4 mb-4 space-y-4">
                {messages.length === 0 && (
                    <div className="text-center text-[#8A9A86] mt-4 font-medium">
                        ¡Hola! ¿Cuántas pupusas mixtas se te antojan para este viernes?
                    </div>
                )}
                {messages.map(m => (
                    <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-4 rounded-[20px] max-w-[80%] whitespace-pre-wrap ${m.role === 'user' ? 'neu-convex bg-[#f6993f] text-[#2C3E50] font-semibold' : 'neu-flat text-[#2C3E50]'}`}>
                            {m.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="p-4 rounded-[20px] neu-flat text-[#8A9A86] animate-pulse">
                            Escribiendo...
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-4">
                <input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 text-[#2C3E50] bg-transparent outline-none neu-pressed rounded-[20px] px-6 py-4 placeholder:text-slate-400"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading || !input}
                    className="neu-button rounded-[20px] px-8 py-4 text-[#e06c4c] font-bold active:neu-pressed disabled:opacity-50 transition-all duration-200"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
}
