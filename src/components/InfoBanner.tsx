'use client';

export default function InfoBanner() {
    return (
        <div className="w-full mb-8">

            {/* ── Título de sección ── */}
            <p className="text-center text-[10px] font-black uppercase tracking-[0.35em] text-[#e06c4c] opacity-80 mb-4">
                ¿Qué ofrecemos?
            </p>

            {/* ── Video showcase con overlay para marca de agua ── */}
            <div className="w-full rounded-[30px] overflow-hidden relative neu-video-square p-2 mb-6">
                <div className="w-full rounded-[24px] overflow-hidden relative" style={{ aspectRatio: '16/9' }}>
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src="/assets/video_mp_.mp4" type="video/mp4" />
                    </video>

                    {/* Overlay degradado inferior para tapar watermark */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                'linear-gradient(to top, rgba(18,20,24,0.92) 0%, rgba(18,20,24,0.55) 18%, transparent 40%), ' +
                                'linear-gradient(to bottom, rgba(18,20,24,0.55) 0%, transparent 25%)',
                        }}
                    />

                    {/* Badge centrado sobre el overlay inferior */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                        <span
                            className="text-white font-black text-[10px] uppercase tracking-[0.3em] px-4 py-1 rounded-full"
                            style={{ background: 'rgba(224,108,76,0.85)', backdropFilter: 'blur(4px)' }}
                        >
                            Pupusas Mixtas Caseras
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Tarjetas de información ── */}
            <div className="grid grid-cols-3 gap-3 mb-6">

                {/* Card 1 – Producto */}
                <div className="neu-light-inset rounded-[22px] p-3 flex flex-col items-center text-center gap-1">
                    <span className="text-xl">🫓</span>
                    <p className="text-[10px] font-black uppercase tracking-wider text-[#e06c4c] leading-tight">
                        Pupusa Mixta
                    </p>
                    <p className="text-[9px] text-slate-500 font-bold leading-tight">
                        Queso + chicharrón + frijoles
                    </p>
                </div>

                {/* Card 2 – Precio */}
                <div className="neu-light-inset rounded-[22px] p-3 flex flex-col items-center text-center gap-1">
                    <span className="text-xl">💰</span>
                    <p className="text-[10px] font-black uppercase tracking-wider text-[#e06c4c] leading-tight">
                        Precio
                    </p>
                    <p className="text-[9px] text-slate-500 font-bold leading-tight">
                        ₡2,000 por unidad
                    </p>
                </div>

                {/* Card 3 – Entrega */}
                <div className="neu-light-inset rounded-[22px] p-3 flex flex-col items-center text-center gap-1">
                    <span className="text-xl">📦</span>
                    <p className="text-[10px] font-black uppercase tracking-wider text-[#e06c4c] leading-tight">
                        Entrega
                    </p>
                    <p className="text-[9px] text-slate-500 font-bold leading-tight">
                        Cada sábado
                    </p>
                </div>
            </div>

            {/* ── Cómo pedir – pasos ── */}
            <div className="neu-light-inset rounded-[28px] p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3 text-center">
                    ¿Cómo hacer mi pedido?
                </p>
                <ol className="space-y-2">
                    {[
                        { n: '1', text: 'Escribe tu nombre en el chat de abajo.' },
                        { n: '2', text: 'Indica tu número de WhatsApp.' },
                        { n: '3', text: 'Dinos cuántas pupusas deseas.' },
                        { n: '4', text: 'Te contactamos para coordinar pago y entrega.' },
                    ].map(step => (
                        <li key={step.n} className="flex items-start gap-3">
                            <span
                                className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black text-white"
                                style={{ background: '#e06c4c' }}
                            >
                                {step.n}
                            </span>
                            <p className="text-[11px] text-slate-500 font-bold leading-tight pt-0.5">
                                {step.text}
                            </p>
                        </li>
                    ))}
                </ol>
            </div>

            {/* ── Separador visual ── */}
            <div className="flex items-center gap-3 mt-6 mb-1">
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #b8bec9)' }} />
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">
                    Realiza tu pedido
                </span>
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #b8bec9)' }} />
            </div>

        </div>
    );
}
