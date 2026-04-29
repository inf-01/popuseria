import ChatComponent from "@/components/Chat";
import InfoBanner from "@/components/InfoBanner";
import { checkAvailability } from "@/utils/dates";

export default function Home() {
  const { isAvailable, nextDateString } = checkAvailability();

  return (
    <main className="min-h-screen bg-[#121418] flex flex-col items-center justify-center p-2 sm:p-8 font-sans">

      {/* Contenedor Principal */}
      <div className="w-full max-w-[480px] neu-light-panel rounded-[50px] p-6 sm:p-10 relative flex flex-col items-center">

        {/* Logo / Marca */}
        <div className="text-center mb-6 w-full">
          <h1 className="text-4xl sm:text-5xl font-black text-[#e06c4c] tracking-tighter leading-none mb-1">
            PUPUSERÍA
          </h1>
          <p className="text-slate-500 font-extrabold uppercase text-[11px] sm:text-xs tracking-[0.3em] opacity-60">
            Especialidad en Mixtas
          </p>
        </div>

        {/* Sección Informativa */}
        <InfoBanner />

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

      </div>

      <p className="mt-8 text-slate-700 text-[10px] font-black uppercase tracking-[0.4em] opacity-20">
        El Salvador • 2026
      </p>
    </main>
  );
}
