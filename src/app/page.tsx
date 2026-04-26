import ChatComponent from "@/components/Chat";
import { checkAvailability } from "@/utils/dates";

export default function Home() {
  const { isAvailable, nextDateString } = checkAvailability();

  return (
    <main className="min-h-screen bg-[#121418] flex flex-col items-center justify-center p-4 sm:p-8 font-sans transition-colors duration-500">
      <div className="w-full max-w-[500px] flex flex-col items-center">

        {/* Contenedor del Logo/Video cuadrado neumórfico grande */}
        <div className="w-full aspect-square max-w-[320px] mb-10 relative">
          <div className="absolute inset-0 neu-dark-convex rounded-[40px] flex items-center justify-center p-4 ring-1 ring-white/10">
            <div className="w-full h-full rounded-[30px] overflow-hidden shadow-2xl relative">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                poster="/assets/logo_share.png"
              >
                <source src="/assets/PUPUSERIA.mp4" type="video/mp4" />
                Tu navegador no soporta video.
              </video>
            </div>
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-5xl font-black mb-2 tracking-tighter text-[#e06c4c] drop-shadow-sm">
            PUPUSERÍA
          </h1>
          <p className="text-slate-400 font-bold tracking-[0.2em] uppercase text-xs sm:text-sm opacity-80 italic">
            Especialidad en Mixtas
          </p>
        </div>

        <div className="w-full neu-light-panel rounded-[50px] p-2 sm:p-4 shadow-2xl border border-white/40">
          {!isAvailable ? (
            <div className="neu-light-inset rounded-[40px] p-10 text-center mt-4 border border-white/50">
              <p className="text-[#e26d4d] font-black text-2xl mb-4 italic uppercase">Vuelve pronto</p>
              <p className="text-slate-500 font-bold leading-relaxed">
                Nuestra ventana de pedidos está cerrada ahora.<br />
                La próxima abre el: <br />
                <span className="text-[#121418] block mt-2 text-xl font-black">{nextDateString}</span>
              </p>
            </div>
          ) : (
            <div className="w-full">
              <ChatComponent />
            </div>
          )}
        </div>

        <p className="mt-12 text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
          Pupusería El Salvador • 2026
        </p>
      </div>
    </main>
  );
}
