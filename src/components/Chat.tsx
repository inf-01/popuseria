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

    // Iniciar conversación
    useEffect(() => {
        const welcome = "¡Bienvenido a la Pupusería! 🇸🇻\n\nSoy tu asistente virtual para pedidos de Pupusas Mixtas. Para comenzar, ¿cuál es tu nombre?";
        setMessages([{ id: '1', role: 'bot', content: welcome }]);
        setStep('askName');
    }, []);

    const addMessage = (role: 'bot' | 'user', content: string) => {
        setMessages(prev => [...prev, { id: Date.now().toString(), role, content }]);
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userVal = input.trim();
        addMessage('user', userVal);
        setInput('');

        if (step === 'askName') {
            setOrder(prev => ({ ...prev, nombre: userVal }));
            addMessage('bot', `Mucho gusto, ${userVal}. ¿A qué número de WhatsApp te podemos contactar?`);
            setStep('askPhone');
        }
        else if (step === 'askPhone') {
            setOrder(prev => ({ ...prev, telefono: userVal }));
            addMessage('bot', "Excelente. ¿Cuántas pupusas mixtas deseas encargar? (Precio: ₡2,000 c/u)");
            setStep('askQuantity');
        }
        else if (step === 'askQuantity') {
            const cant = parseInt(userVal);
            if (isNaN(cant) || cant <= 0) {
                addMessage('bot', "Por favor, ingresa una cantidad válida en números.");
                return;
            }
            const total = cant * 2000;
            setOrder(prev => ({ ...prev, cantidad: cant, total }));

            setIsLoading(true);
            const summary = `Confirmando pedido:\n\n👤 Nombre: ${order.nombre}\n📱 WhatsApp: ${order.telefono}\n🫓 Cantidad: ${cant} mixtas\n💰 Total: ₡${total.toLocaleString('es-CR')}\n\nEstamos guardando tu pedido...`;
            addMessage('bot', summary);

            // Guardar en Google Sheets usando el Server Action
            try {
                await saveOrder({
                    nombre: order.nombre,
                    telefono: order.telefono,
                    cantidad: cant,
                    total: total
                });

                addMessage('bot', "¡Listo! Tu pedido ha sido registrado con éxito. ✅\n\nTe contactaremos pronto por WhatsApp para coordinar el cobro y la entrega para este SÁBADO. ¡Gracias por preferirnos!");
                setStep('finished');
            } catch (err) {
                addMessage('bot', "Hubo un pequeño problema guardando tu pedido, pero no te preocupes. Inténtalo de nuevo o contáctanos directamente.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="flex flex-col w-full">
            <div
                ref={scrollRef}
                className="h-[450px] overflow-y-auto neu-light-inset rounded-[40px] p-6 mb-8 space-y-6 border border-white/20 scroll-smooth"
            >
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
            </div>

            {step !== 'finished' && (
                <form onSubmit={handleSend} className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                    <div className="flex-1 relative group w-full">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
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
                        {isLoading ? '...' : 'Enviar'}
                    </button>
                </form>
            )}

            {step === 'finished' && (
                <div className="text-center p-4">
                    <button
                        onClick={() => window.location.reload()}
                        className="text-[#e06c4c] font-black uppercase tracking-widest underline underline-offset-8 decoration-2"
                    >
                        Hacer otro pedido
                    </button>
                </div>
            )}
        </div>
    );
}
