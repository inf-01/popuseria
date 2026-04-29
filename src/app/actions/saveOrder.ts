'use server'

export async function saveOrder(order: { nombre: string; telefono: string; cantidad: number; total: number }) {
    const WEB_APP_URL = process.env.GOOGLE_SHEETS_WEB_APP_URL;

    if (!WEB_APP_URL) {
        console.error('❌ Falta URL de Google Sheets');
        return { success: false, error: 'Error de configuración' };
    }

    try {
        // Usamos un fetch más robusto para servidor
        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Google Apps Script suele devolver texto o redirección, 
        // pero desde servidor si el status es 200/302 usualmente está bien.
        return { success: true };
    } catch (error) {
        console.error('❌ Error fatal en saveOrder:', error);
        return { success: false, error: 'Error de conexión' };
    }
}
