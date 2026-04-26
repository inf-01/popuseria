import { checkAvailability } from "@/utils/dates";
import ChatComponent from "@/components/Chat";
import Logo from "@/components/Logo";

export default function Home() {
  const { isAvailable, nextDateString } = checkAvailability();

  return (
    <main className="min-h-screen p-4 md:p-12 flex flex-col items-center justify-center font-sans bg-[#121418]">
      <div className="max-w-xl w-full p-8 md:p-14 rounded-[60px] neu-light-convex flex flex-col items-center border border-white/40">
        <div className="text-center mb-10 flex flex-col items-center w-full">
          {/* Video Logo Frame - Neumorphic Square-ish Rounded */}
          <div className="relative mb-8 w-full flex justify-center">
            <div className="w-full max-w-[480px] h-64 md:h-72 rounded-[40px] neu-video-frame overflow-hidden flex items-center justify-center p-2 border border-white/30">
              <video
                src="/assets/PUPUSERIA.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-[30px]"
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-[#e06c4c] mb-2 tracking-tighter uppercase italic drop-shadow-sm">
            Pupusería
          </h1>
          <p className="text-slate-500 text-lg font-bold tracking-[0.2em] uppercase opacity-90">Especialidad en Mixtas</p>
        </div>

        {!isAvailable ? (
          <div className="neu-light-inset rounded-[40px] p-10 text-center mt-4 border border-white/50">
            <h2 className="text-2xl font-black text-[#e06c4c] mb-4 uppercase tracking-tight">¡Vuelve pronto!</h2>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              Estamos preparando la masa con mucho cariño.
              <br /><br />
              Volvemos el próximo <strong className="text-[#e06c4c] font-black">{nextDateString}</strong>.
            </p>
          </div>
        ) : (
          <div className="w-full">
            <ChatComponent />
          </div>
        )}
      </div>
    </main>
  );
}
