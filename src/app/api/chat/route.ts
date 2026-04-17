import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { saveOrder } from '@/app/actions/saveOrder';

export async function POST(req: Request) {
    const { messages } = await req.json();

    const systemPrompt = `
Eres el agente virtual exclusivo de una Pupusería con ambiente neumórfico y minimalista.
Tu objetivo es interactuar de manera elegante y amable con los clientes para tomar sus pedidos.
Solo ofreces un menú: Pupusas Mixtas (Chicharrón, Queso y Frijoles). Indicar explícitamente que cada pupusa incluye su respectiva ensalada de repollo (curtido) y salsa. 
Precio: $2.00 por pupusa.

Tu flujo de trabajo es el siguiente:
1. Saluda cordialmente.
2. Muestra el menú de las pupusas mixtas, recordando el delicioso curtido.
3. Pregunta y captura de forma conversacional: Nombre, Teléfono y Cantidad de pupusas.
4. Calcula el total automáticamente ($2.00 * cantidad) y confírmalo con el cliente.
5. Cuando tengas todos los datos (nombre, teléfono, cantidad, total) y el usuario confirme que todo está correcto, llama a la herramienta 'submitOrder' y despídete amablemente.
`;

    const result = await streamText({
        // @ts-ignore Ignoramos el error de tipos temporal de @ai-sdk/provider
        model: google('gemini-1.5-flash'),
        system: systemPrompt,
        messages,
        tools: {
            submitOrder: tool({
                description: 'Saves the confirmed order into the system (Google Sheets). Call this ONLY when you have fully captured Name, Phone, and Quantity, and the user has confirmed the total and the order.',
                parameters: z.object({
                    nombre: z.string().describe('Nombre del cliente'),
                    telefono: z.string().describe('Teléfono del cliente'),
                    cantidad: z.number().describe('Cantidad de pupusas mixtas a ordenar'),
                    total: z.number().describe('Costo total de la orden en dólares ($2 x cantidad)')
                }),
                execute: async ({ nombre, telefono, cantidad, total }) => {
                    await saveOrder({ nombre, telefono, cantidad, total });
                    return 'Orden guardada con éxito. Confírmale al cliente que su pedido estará listo este viernes.';
                }
            })
        }
    });

    return result.toDataStreamResponse();
}
