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
    <main className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center font-sans bg-[#E0E5EC]">
      <div className="max-w-2xl w-full p-8 md:p-12 rounded-[40px] neu-flat flex flex-col items-center">
        <div className="text-center mb-8 flex flex-col items-center">
          <Logo className="w-24 h-24 mb-6" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#e06c4c] mb-2 tracking-tight">
            Pupusería
          </h1>
          <p className="text-[#8A9A86] text-lg font-medium">Especialidad en Mixtas</p>
        </div>

        {!isAvailable ? (
          <div className="neu-pressed rounded-[30px] p-8 text-center mt-8">
            <h2 className="text-2xl font-bold text-[#f6993f] mb-4">¡Fuego apagado por hoy!</h2>
            <p className="text-xl text-[#2C3E50] leading-relaxed">
              Estamos preparando la masa con mucho cariño y seleccionando los mejores ingredientes.
              <br /><br />
              Volvemos para recibir tus pedidos el próximo <strong className="text-[#e06c4c] underline decoration-wavy underline-offset-4">{nextDateString}</strong>.
            </p>
          </div>
        ) : (
          <ChatComponent />
        )}
      </div>
    </main>
  );
}
