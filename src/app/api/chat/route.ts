import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { saveOrder } from '@/app/actions/saveOrder';

export async function POST(req: Request) {
    const { messages } = await req.json();

    const systemPrompt = `
Eres el agente virtual exclusivo de una Pupusería con ambiente neumórfico y minimalista.
Tu objetivo es interactuar de manera elegante y amable con los clientes para tomar sus pedidos.

MENÚ Y REGLAS ESTRICTAS:
1. Solo ofreces un tipo de pupusa: Pupusas Mixtas.
2. Cada pupusa contiene exactamente tres ingredientes: Chicharrón, Queso y Frijoles.
3. IMPORTANTE: No se pueden pedir solo de queso, solo de chicharrón, ni ninguna otra combinación. Todas salen con los tres ingredientes.
4. Cada pupusa incluye su respectiva ensalada de repollo (curtido). 
5. NO incluyen salsa. Indicar explícitamente que solo llevan ensalada.
6. Precio: ₡2,000 (dos mil colones) por pupusa.
7. Entregas: Las pupusas se entregan los SÁBADOS (después de cerrar la ventana de pedidos el 15 o el 30/31).

Tu flujo de trabajo es el siguiente:
1. Saluda cordialmente.
2. Muestra el menú de las pupusas mixtas, recordando que son la especialidad con los tres sabores integrados.
3. Pregunta y captura de forma conversacional: Nombre, Teléfono y Cantidad de pupusas.
4. Calcula el total automáticamente (2,000 * cantidad) y confírmalo con el cliente en Colones.
5. Cuando tengas todos los datos y el usuario confirme, llama a la herramienta 'submitOrder' y despídete amablemente mencionando que el pedido estará listo para este SÁBADO.
`;

    try {
        if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
            console.error("❌ ERROR: La variable GOOGLE_GENERATIVE_AI_API_KEY no está configurada.");
            return new Response("Configuración incompleta: Lack of API Key", { status: 500 });
        }

        const result = await streamText({
            // @ts-ignore
            model: google('gemini-2.0-flash'),
            system: systemPrompt,
            messages,
            tools: {
                submitOrder: tool({
                    description: 'Saves the confirmed order into the system. Call this ONLY when you have fully captured Name, Phone, and Quantity, and the user has confirmed the total in Colones.',
                    parameters: z.object({
                        nombre: z.string().describe('Nombre del cliente'),
                        telefono: z.string().describe('Teléfono del cliente'),
                        cantidad: z.number().describe('Cantidad de pupusas mixtas a ordenar'),
                        total: z.number().describe('Costo total de la orden en colones (2000 x cantidad)')
                    }),
                    execute: async ({ nombre, telefono, cantidad, total }) => {
                        await saveOrder({ nombre, telefono, cantidad, total });
                        return 'Orden guardada con éxito en el sistema.';
                    }
                })
            }
        });

        return result.toDataStreamResponse();
    } catch (error: any) {
        console.error("❌ ERROR EN RUTA DE CHAT:", error);
        return new Response(JSON.stringify({ error: error.message || "Error desconocido" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
