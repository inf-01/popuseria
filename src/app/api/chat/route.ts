import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { saveOrder } from '@/app/actions/saveOrder';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

        if (!apiKey) {
            return new Response(JSON.stringify({ error: "Falta la API Key de Google" }), { status: 500 });
        }

        const google = createGoogleGenerativeAI({ apiKey });

        const result = await streamText({
            model: google('gemini-1.5-flash'), // Versión estable
            system: `Eres el agente virtual de una Pupusería neumórfica. 
        REGLAS:
        - Solo Pupusas Mixtas (Chicharron, Queso, Frijol). No otras combinaciones.
        - Precio: ₡2,000 colones.
        - Sin salsa, solo ensalada.
        - Entregas los SABADOS.
        - Captura: Nombre, Teléfono, Cantidad.
        - Llama a 'submitOrder' al confirmar.`,
            messages,
            tools: {
                submitOrder: tool({
                    description: 'Guarda el pedido confirmado.',
                    parameters: z.object({
                        nombre: z.string(),
                        telefono: z.string(),
                        cantidad: z.number(),
                        total: z.number()
                    }),
                    execute: async (args) => {
                        await saveOrder(args);
                        return 'Pedido guardado en Google Sheets.';
                    }
                })
            }
        });

        return result.toDataStreamResponse();
    } catch (err: any) {
        console.error(err);
        return new Response(JSON.stringify({ error: err.message || "Error interno" }), { status: 500 });
    }
}
