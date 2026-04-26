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

    // Iniciar conversación con estilo original
    useEffect(() => {
        const welcome = "¡Bienvenido a la Pupusería! 🇸🇻\n\nSoy tu asistente virtual. Para comenzar con tu pedido de Pupusas Mixtas, ¿podrías indicarme tu nombre?";
        setMessages([{ id: '1', role: 'bot', content: welcome }]);
        setStep('askName');
    }, []);

    const addMessage = (role: 'bot' | 'user', content: string) => {
        setMessages(prev => [...prev, { id: Date.now().toString(), role, content }]);
    };

    const validate = (val: string): boolean => {
        setErrorMsg(null);
        if (step === 'askName') {
            if (val.trim().length < 2) {
                setErrorMsg("Por favor, ingresa un nombre válido.");
                return false;
            }
        }
        if (step === 'askPhone') {
            const digits = val.replace(/\D/g, '');
            if (digits.length < 8) {
                setErrorMsg("Ingresa un número de WhatsApp válido (mínimo 8 dígitos).");
                return false;
            }
        }
        if (step === 'askQuantity') {
            const cant = parseInt(val);
            if (isNaN(cant) || cant <= 0 || cant > 100) {
                setErrorMsg("Por favor, ingresa una cantidad válida entre 1 y 100.");
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
        addMessage('user', userVal);
        setInput('');

        if (step === 'askName') {
            setOrder(prev => ({ ...prev, nombre: userVal }));
            setTimeout(() => {
                addMessage('bot', `Un gusto saludarte, ${userVal}. ¿A qué número de WhatsApp podemos contactarte para coordinar la entrega?`);
                setStep('askPhone');
            }, 600);
        }
        else if (step === 'askPhone') {
            setOrder(prev => ({ ...prev, telefono: userVal }));
            setTimeout(() => {
                addMessage('bot', "Perfecto. ¿Cuántas pupusas mixtas deseas encargar? Recuerda que son a ₡2,000 cada una.");
                setStep('askQuantity');
            }, 600);
        }
        else if (step === 'askQuantity') {
            const cant = parseInt(userVal);
            const total = cant * 2000;
            setOrder(prev => ({ ...prev, cantidad: cant, total }));

            setIsLoading(true);
            const summary = `¡Excelente elección! 🫓\n\nResumen de tu pedido:\n👤 Cliente: ${order.nombre}\n📱 WhatsApp: ${userVal}\n🔢 Cantidad: ${cant} mixtas\n💰 Total a pagar: ₡${total.toLocaleString('es-CR')}\n\nEstamos registrando tu pedido en el sistema...`;

            setTimeout(async () => {
                addMessage('bot', summary);
                try {
                    await saveOrder({
                        nombre: order.nombre,
                        telefono: userVal,
                        cantidad: cant,
                        total: total
                    });

                    setTimeout(() => {
                        addMessage('bot', "¡Todo listo! ✅ Tu pedido ha sido guardado.\n\nTe contactaremos por WhatsApp para finalizar el pago. Recuerda que la entrega será este SÁBADO. ¡Que tengas un gran día!");
                        setStep('finished');
                    }, 1000);
                } catch (err) {
                    addMessage('bot', "Lo siento, hubo un error al conectar con nuestro sistema de pedidos. Por favor, intenta de nuevo o escríbenos directamente.");
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
                className="h-[480px] overflow-y-auto neu-light-inset rounded-[40px] p-6 mb-8 space-y-6 border border-white/40 scroll-smooth"
            >
                {messages.map(m => (
                    <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-5 rounded-[30px] max-w-[85%] shadow-sm whitespace-pre-wrap font-semibold leading-relaxed transition-all ${m.role === 'user'
                            ? 'neu-user-bubble text-[#4a3721]'
                            : 'bg-white/90 text-slate-800 shadow-md border border-white'
                            }`}>
                            {m.content}
                        </div>
                    </div>
                ))}
            </div>

            {step !== 'finished' && (
                <form onSubmit={handleSend} className="flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                        <div className="flex-1 relative group w-full">
                            <input
                                value={input}
                                onChange={(e) => {
                                    setInput(e.target.value);
                                    if (errorMsg) setErrorMsg(null);
                                }}
                                placeholder="Escribe aquí tu respuesta..."
                                className={`w-full text-slate-700 bg-transparent outline-none neu-light-inset rounded-[30px] px-8 py-5 placeholder:text-slate-400 border transition-all text-base ${errorMsg ? 'border-red-400' : 'border-transparent focus:border-[#e06c4c]/30'}`}
                                disabled={isLoading}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading || !input}
                            className="neu-button-light rounded-[30px] px-10 py-5 text-[#e06c4c] font-black uppercase tracking-widest active:scale-95 disabled:opacity-30 transition-all duration-200 text-sm sm:text-base w-full sm:w-auto"
                        >
                            {isLoading ? '...' : 'Enviar'}
                        </button>
                    </div>
                    {errorMsg && (
                        <p className="text-red-500 text-[10px] font-black uppercase tracking-wider ml-6 animate-pulse">
                            {errorMsg}
                        </p>
                    )}
                </form>
            )}

            {step === 'finished' && (
                <div className="text-center p-4">
                    <button
                        onClick={() => window.location.reload()}
                        className="text-[#e06c4c] font-black uppercase tracking-widest underline underline-offset-8 decoration-2 hover:opacity-70 transition-opacity"
                    >
                        Hacer otro pedido
                    </button>
                </div>
            )}
        </div>
    );
}
