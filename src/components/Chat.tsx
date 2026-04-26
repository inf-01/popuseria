'use client';

import { useChat } from 'ai/react';

export default function ChatComponent() {
    const { messages, input, handleInputChange, handleSubmit, isLoading, error, reload } = useChat({
        api: '/api/chat',
        onError: (err) => {
            console.error("🔍 DETALLE DEL ERROR:", err);
            // Intentar detectar si es un error de ruta (404)
            if (err.message.includes('404')) {
                console.error("❌ ERROR: La ruta /api/chat no fue encontrada. Revisa la estructura de carpetas.");
            }
        }
    });

    return (
        <div className="flex flex-col w-full">
            <div className="h-[450px] overflow-y-auto neu-light-inset rounded-[40px] p-6 mb-8 space-y-6 border border-white/20">
                {messages.length === 0 && !error && (
                    <div className="text-center text-slate-400 mt-8 font-bold tracking-tight opacity-70 italic">
                        ¡Hola! ¿Cuántas pupusas mixtas (₡2,000) deseas para este sábado?
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
                {error && (
                    <div className="flex flex-col items-center justify-center p-6 text-center space-y-4">
                        <div className="p-4 rounded-[20px] bg-red-50 text-red-600 border border-red-200 text-sm font-bold shadow-inner w-full">
                            ⚠️ Error de Conexión
                            <div className="mt-2 text-[10px] font-mono bg-white/50 p-2 rounded-xl border border-red-100 break-all">
                                {error.message || 'Error de conexión (Causa desconocida)'}
                            </div>
                            <p className="text-[9px] mt-1 text-red-400">Verifica que /api/chat exista en tu GitHub</p>
                        </div>
                        <button
                            onClick={() => reload()}
                            className="text-xs text-[#e06c4c] font-black uppercase tracking-widest underline underline-offset-4 active:scale-95 transition-all"
                        >
                            Reintentar Conexión
                        </button>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                <div className="flex-1 relative group w-full">
                    <input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Escribe aquí..."
                        className="w-full text-slate-700 bg-transparent outline-none neu-light-inset rounded-[30px] px-8 py-5 placeholder:text-slate-400 border border-transparent focus:border-[#e06c4c]/20 transition-all text-base"
                        disabled={isLoading}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading || !input}
                    className="neu-button-light rounded-[30px] px-8 py-5 text-[#e06c4c] font-black uppercase tracking-widest active:scale-95 disabled:opacity-30 transition-all duration-200 text-sm sm:text-base w-full sm:w-auto"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
}
