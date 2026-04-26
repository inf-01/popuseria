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

    // INICIO: Saludo formal y pregunta de NOMBRE
    useEffect(() => {
        const welcomeText = "¡Bienvenido a la Pupusería! 🇸🇻\n\nSoy tu asistente virtual de pedidos. Para comenzar, ¿cuál es tu nombre?";
        setMessages([{ id: '1', role: 'bot', content: welcomeText }]);
        setStep('askName');
    }, []);

    const addMessage = (role: 'bot' | 'user', content: string) => {
        setMessages(prev => [...prev, { id: Date.now().toString(), role, content }]);
    };

    const validateInput = (val: string): boolean => {
        setErrorMsg(null);
        if (step === 'askName') {
            if (val.trim().length < 2) {
                setErrorMsg("Por favor, ingresa tu nombre.");
                return false;
            }
        }
        if (step === 'askPhone') {
            const digits = val.replace(/\D/g, '');
            if (digits.length < 8) {
                setErrorMsg("Ingresa un WhatsApp válido (8 dígitos).");
                return false;
            }
        }
        if (step === 'askQuantity') {
            const cant = parseInt(val);
            if (isNaN(cant) || cant <= 0 || cant > 50) {
                setErrorMsg("Ingresa una cantidad válida (1-50).");
                return false;
            }
        }
        return true;
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        if (!validateInput(input)) return;

        const userVal = input.trim();
        addMessage('user', userVal);
        setInput('');

        if (step === 'askName') {
            setOrder(prev => ({ ...prev, nombre: userVal }));
            setTimeout(() => {
                addMessage('bot', `Mucho gusto, ${userVal}. ¿A qué número de WhatsApp te podemos contactar para coordinar tu pedido?`);
                setStep('askPhone');
            }, 600);
        }
        else if (step === 'askPhone') {
            setOrder(prev => ({ ...prev, telefono: userVal }));
            setTimeout(() => {
                addMessage('bot', "Perfecto. Ahora, ¿cuántas pupusas mixtas deseas encargar para este sábado? (₡2,000 c/u)");
                setStep('askQuantity');
            }, 600);
        }
        else if (step === 'askQuantity') {
            const cant = parseInt(userVal);
            const total = cant * 2000;
            const currentName = order.nombre;
            const currentPhone = order.telefono;

            setIsLoading(true);
            const summary = `RESUMEN DE TU PEDIDO:\n\n👤 Nombre: ${currentName}\n🔢 Cantidad: ${cant} mixtas\n💰 Total: ₡${total.toLocaleString('es-CR')}\n\nEstamos guardando tu información...`;

            setTimeout(async () => {
                addMessage('bot', summary);

                try {
                    const result = await saveOrder({
                        nombre: currentName,
                        telefono: currentPhone,
                        cantidad: cant,
                        total: total
                    });

                    if (result.success) {
                        setTimeout(() => {
                            addMessage('bot', "¡Todo anotado! ✅ Tu pedido se ha guardado con éxito. \n\nPronto serás contactado por WhatsApp para realizar el cobro y coordinar la entrega. ¡Muchas gracias por elegirnos!");
                            setStep('finished');
                        }, 1200);
                    } else {
                        addMessage('bot', "Hubo un error al guardar. Por favor, intenta de nuevo o contáctanos directamente.");
                    }
                } catch (err) {
                    addMessage('bot', "Error de conexión. Inténtalo en unos momentos.");
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
                className="h-[430px] overflow-y-auto neu-light-inset rounded-[40px] p-6 mb-8 space-y-6 border border-white/20 scroll-smooth shadow-inner"
            >
                {messages.map(m => (
                    <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-5 rounded-[25px] max-w-[85%] whitespace-pre-wrap font-bold leading-snug transition-all ${m.role === 'user'
                            ? 'neu-user-bubble scale-95 border border-white/10'
                            : 'neu-bot-bubble-dark text-slate-200 text-sm shadow-2xl'
                            }`}>
                            {m.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="px-4 py-2 rounded-full neu-bot-bubble-dark text-slate-400 text-[10px] animate-pulse">
                            Procesando...
                        </div>
                    </div>
                )}
            </div>

            {step !== 'finished' && (
                <form onSubmit={handleSend} className="flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center px-1">
                        <div className="flex-1 relative w-full">
                            <input
                                value={input}
                                onChange={(e) => { setInput(e.target.value); if (errorMsg) setErrorMsg(null); }}
                                placeholder="Tu respuesta..."
                                className={`w-full text-slate-700 bg-transparent outline-none neu-light-inset rounded-[25px] px-8 py-5 placeholder:text-slate-400 border transition-all text-base font-bold ${errorMsg ? 'border-red-300' : 'border-transparent focus:border-[#e06c4c]/30'}`}
                                disabled={isLoading}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading || !input}
                            className="neu-button-light rounded-[25px] px-8 py-5 text-[#e06c4c] font-black uppercase tracking-widest active:scale-95 disabled:opacity-30 transition-all text-sm w-full sm:w-auto"
                        >
                            {isLoading ? '...' : 'Enviar'}
                        </button>
                    </div>
                    {errorMsg && (
                        <p className="text-red-500 text-[10px] font-black uppercase tracking-widest ml-6 mt-1 animate-pulse">
                            {errorMsg}
                        </p>
                    )}
                </form>
            )}

            {step === 'finished' && (
                <div className="text-center p-2">
                    <button onClick={() => window.location.reload()} className="text-[#e06c4c] font-black uppercase tracking-widest underline underline-offset-4 decoration-2 text-xs hover:opacity-80 transition-opacity">
                        Hacer otro pedido
                    </button>
                </div>
            )}
        </div>
    );
}
