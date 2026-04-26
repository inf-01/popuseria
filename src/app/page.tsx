import ChatComponent from "@/components/Chat";
import { checkAvailability } from "@/utils/dates";

export default function Home() {
  const { isAvailable, nextDateString } = checkAvailability();

  return (
    <main className="min-h-screen bg-[#121418] flex flex-col items-center justify-center p-4 sm:p-8 font-sans">

      {/* Contenedor Principal Estilo App de la Referencia */}
      <div className="w-full max-w-[480px] neu-light-panel rounded-[50px] p-6 sm:p-8 relative">

        {/* Barra Superior con Iconos (Referencia) */}
        <div className="flex justify-between items-center mb-6 px-2">
          <div className="w-10 h-10 neu-button-light rounded-xl flex items-center justify-center">
            <div className="w-5 h-[2px] bg-slate-400 relative before:content-[''] before:absolute before:-top-1.5 before:left-0 before:w-5 before:h-[2px] before:bg-slate-400 after:content-[''] after:absolute after:top-1.5 after:left-0 after:w-5 after:h-[2px] after:bg-slate-400"></div>
          </div>

          {/* Logo Cuadrado Inset (Video) */}
          <div className="w-24 h-24 neu-video-square rounded-3xl flex items-center justify-center p-2">
            <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-inner">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                poster="/assets/logo_share.png"
              >
                <source src="/assets/PUPUSERIA.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="w-10 h-10 neu-button-light rounded-xl flex items-center justify-center">
            <div className="w-4 h-4 rounded-full border-2 border-slate-400 relative before:content-[''] before:absolute before:-bottom-1.5 before:-left-1 before:w-6 before:h-2 before:border-2 before:border-slate-400 before:border-t-0 before:rounded-b-full"></div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-[#e06c4c] tracking-tighter">
            PUPUSERÍA
          </h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] opacity-70">
            Especialidad en Mixtas
          </p>
        </div>

        {/* Área del Chat */}
        <div className="w-full relative">
          {!isAvailable ? (
            <div className="neu-light-inset rounded-[40px] p-10 text-center border border-white/50">
              <p className="text-[#e26d4d] font-black text-xl mb-4 italic uppercase">Vuelve pronto</p>
              <p className="text-slate-500 font-bold text-sm leading-relaxed">
                Nuestra ventana de pedidos está cerrada.<br />
                Abre el: <br />
                <span className="text-[#121418] block mt-2 text-lg font-black">{nextDateString}</span>
              </p>
            </div>
          ) : (
            <ChatComponent />
          )}
        </div>

        {/* Panel Inferior Decorativo (Referencia) */}
        <div className="mt-8 flex justify-center">
          <div className="neu-button-light px-8 py-3 rounded-2xl flex gap-6">
            <div className="w-4 h-4 bg-slate-300 rounded-sm opacity-50"></div>
            <div className="w-4 h-4 bg-slate-300 rounded-full opacity-50"></div>
            <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
          </div>
        </div>

      </div>

      <p className="mt-8 text-slate-700 text-[9px] font-black uppercase tracking-[0.4em] opacity-30">
        El Salvador • Quality • 2026
      </p>
    </main>
  );
}
