'use client';

import { useState, useEffect, useRef } from 'react';
import { saveOrder } from '@/app/actions/saveOrder';

type Step = 'greeting' | 'askName' | 'askPhone' | 'askQuantity' | 'confirming' | 'finished';

interface Message {
    id: string;
    role: 'bot' | 'user';
    content: string;
}

export default function ChatComponent() {
    const [step, setStep] = useState<Step>('greeting');
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [order, setOrder] = useState({
        nombre: '',
        telefono: '',
        cantidad: 0,
        total: 0
    });

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const welcome = "¿Hola! ¿Cuántas pupusas mixtas se te antojan para este sábado?";
        setMessages([{ id: '1', role: 'bot', content: welcome }]);
        setStep('askName');
    }, []);

    const validate = (val: string): boolean => {
        setErrorMsg(null);
        if (step === 'askName') {
            if (val.trim().length < 2) {
                setErrorMsg("Ingresa tu nombre.");
                return false;
            }
        }
        if (step === 'askPhone') {
            const digits = val.replace(/\D/g, '');
            if (digits.length < 8) {
                setErrorMsg("WhatsApp inválido (8 dígitos).");
                return false;
            }
        }
        if (step === 'askQuantity') {
            const cant = parseInt(val);
            if (isNaN(cant) || cant <= 0 || cant > 50) {
                setErrorMsg("Ingresa un número (1-50).");
                return false;
            }
        }
        return true;
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        if (!validate(input)) return;

        const userVal = input.trim();
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userVal }]);
        setInput('');

        if (step === 'askName') {
            setOrder(prev => ({ ...prev, nombre: userVal }));
            setTimeout(() => {
                setMessages(prev => [...prev, { id: Date.now().toString(), role: 'bot', content: `¡Mucho gusto, ${userVal}! ¿A qué número de WhatsApp te contactamos?` }]);
                setStep('askPhone');
            }, 600);
        }
        else if (step === 'askPhone') {
            setOrder(prev => ({ ...prev, telefono: userVal }));
            setTimeout(() => {
                setMessages(prev => [...prev, { id: Date.now().toString(), role: 'bot', content: "¡Excelente! ¿Cuántas pupusas mixtas anotamos para este sábado?" }]);
                setStep('askQuantity');
            }, 600);
        }
        else if (step === 'askQuantity') {
            const cant = parseInt(userVal);
            const total = cant * 2000;
            setOrder(prev => ({ ...prev, cantidad: cant, total }));
            setIsLoading(true);

            setTimeout(async () => {
                const summary = `RESUMEN DE PEDIDO:\n\n👤 ${order.nombre}\n🔢 ${cant} mixtas\n💰 Total: ₡${total.toLocaleString('es-CR')}\n\nGuardando...`;
                setMessages(prev => [...prev, { id: Date.now().toString(), role: 'bot', content: summary }]);

                try {
                    await saveOrder({ nombre: order.nombre, telefono: userVal, cantidad: cant, total });
                    setTimeout(() => {
                        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'bot', content: "¡Listo! ✅ Tu pedido está anotado. Te contactaremos pronto por WhatsApp para coordinar el cobro. ¡Gracias!" }]);
                        setStep('finished');
                    }, 1000);
                } catch (err) {
                    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'bot', content: "Error de conexión. Inténtalo de nuevo." }]);
                } finally {
                    setIsLoading(false);
                }
            }, 800);
        }
    };

    return (
        <div className="flex flex-col w-full">
            <div
                ref={scrollRef}
                className="h-[380px] overflow-y-auto neu-light-inset rounded-[40px] p-6 mb-8 space-y-4 border border-white/20 scroll-smooth shadow-inner"
            >
                {messages.map(m => (
                    <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`px-6 py-4 rounded-[25px] max-w-[85%] whitespace-pre-wrap font-bold leading-snug transition-all ${m.role === 'user'
                            ? 'neu-user-bubble text-[13px]'
                            : 'neu-bot-bubble-dark text-slate-200 text-[13px]'
                            }`}>
                            {m.content}
                        </div>
                    </div>
                ))}
            </div>

            {step !== 'finished' && (
                <form onSubmit={handleSend} className="flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center px-1">
                        <div className="flex-1 relative w-full">
                            <input
                                value={input}
                                onChange={(e) => { setInput(e.target.value); if (errorMsg) setErrorMsg(null); }}
                                placeholder="Tu mensaje..."
                                className={`w-full text-slate-700 bg-transparent outline-none neu-light-inset rounded-[25px] px-8 py-5 placeholder:text-slate-400 border transition-all text-sm font-bold ${errorMsg ? 'border-red-300' : 'border-transparent focus:border-[#e06c4c]/30'}`}
                                disabled={isLoading}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading || !input}
                            className="neu-button-light rounded-[25px] px-8 py-5 text-[#e06c4c] font-black uppercase tracking-widest active:scale-95 disabled:opacity-30 transition-all text-[12px] w-full sm:w-auto"
                        >
                            Enviar
                        </button>
                    </div>
                    {errorMsg && (
                        <p className="text-red-500 text-[9px] font-black uppercase tracking-widest ml-6">
                            {errorMsg}
                        </p>
                    )}
                </form>
            )}

            {step === 'finished' && (
                <div className="text-center p-2">
                    <button onClick={() => window.location.reload()} className="text-[#e06c4c] font-black uppercase tracking-widest underline underline-offset-4 decoration-2 text-xs">
                        Hacer otro pedido
                    </button>
                </div>
            )}
        </div>
    );
}
