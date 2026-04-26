'use server';

export async function saveOrder(data: { nombre: string; telefono: string; cantidad: number; total: number }) {
    try {
        // ESTA ES UNA VERSIÓN SIMULADA PARA PROBAR EL FRONTEND HOY.
        // Mañana implementaremos la conexión real con la API de Google Sheets.

        console.log("=== PEDIDO SIMULADO (Aún no conectado a Google Sheets) ===");
        console.log(`Fecha: ${new Date().toISOString()}`);
        console.log(`Cliente: ${data.nombre}`);
        console.log(`Teléfono: ${data.telefono}`);
        console.log(`Pedido: ${data.cantidad} Pupusas Mixtas (Chicharrón, Queso y Frijoles)`);
        console.log(`Total a pagar: ₡${data.total.toLocaleString()} colones`);
        console.log("==========================================================");

        // Retornamos éxito para que la Inteligencia Artificial se despida feliz.
        return { success: true };
    } catch (error) {
        console.error("Error simulado:", error);
        return { success: false, error };
    }
}
