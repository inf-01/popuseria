import { checkAvailability } from "@/utils/dates";
import ChatComponent from "@/components/Chat";
import Logo from "@/components/Logo";

export const metadata = {
  title: 'Pupusería | Pedidos Exclusivos',
  description: 'Haz tus pedidos de deliciosas pupusas mixtas con curtido y salsa preparadas cada quincena.',
}

export default function Home() {
  const { isAvailable, nextDateString } = checkAvailability();

  return (
    <main className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center font-sans">
      <div className="max-w-2xl w-full p-8 md:p-12 rounded-[50px] neu-nickel-flat flex flex-col items-center border border-white/5">
        <div className="text-center mb-10 flex flex-col items-center w-full">
          {/* Logo Insertado Creativamente como una placa industrial pressed */}
          <div className="relative mb-8 group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-50 blur-xl group-hover:opacity-80 transition-opacity" />
            <div className="relative w-32 h-32 rounded-full neu-nickel-pressed flex items-center justify-center p-1 border border-white/5">
              <Logo className="w-full h-full" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-[#e06c4c] mb-2 tracking-tighter uppercase italic">
            Pupusería
          </h1>
          <p className="text-[#8A9A86] text-lg font-bold tracking-widest uppercase opacity-80">Especialidad en Mixtas</p>
        </div>

        {!isAvailable ? (
          <div className="neu-nickel-pressed rounded-[40px] p-10 text-center mt-4 border border-black/20">
            <h2 className="text-2xl font-black text-[#f6993f] mb-4 uppercase tracking-tight">¡Fuego apagado por hoy!</h2>
            <p className="text-lg text-slate-300 leading-relaxed font-medium">
              Estamos preparando la masa con mucho cariño y seleccionando los mejores ingredientes sobre nuestro comal de acero.
              <br /><br />
              Volvemos para recibir tus pedidos el próximo <strong className="text-[#e06c4c] underline decoration-wavy underline-offset-4">{nextDateString}</strong>.
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
