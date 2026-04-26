'use server'

interface OrderData {
    nombre: string;
    telefono: string;
    cantidad: number;
    total: number;
}

export async function saveOrder(order: OrderData) {
    const WEB_APP_URL = process.env.GOOGLE_SHEETS_WEB_APP_URL || '';

    if (!WEB_APP_URL) {
        console.error('❌ Falta GOOGLE_SHEETS_WEB_APP_URL');
        return { success: false, error: 'Configuración incompleta' };
    }

    try {
        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
            mode: 'no-cors' // Google Apps Script requiere esto en fetch a veces, pero desde servidor es mejor directo
        });

        return { success: true };
    } catch (error) {
        console.error('❌ Error guardando orden:', error);
        return { success: false, error: 'Error de conexión con la hoja de cálculo' };
    }
}
