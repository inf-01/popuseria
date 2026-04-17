'use server';

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function saveOrder(data: { nombre: string; telefono: string; cantidad: number; total: number }) {
    try {
        // Configura las credenciales reales en las variables de entorno para usar en producción:
        // GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID
        if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SHEET_ID) {
            const auth = new JWT({
                email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });

            const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, auth);
            await doc.loadInfo();

            const sheet = doc.sheetsByIndex[0];
            await sheet.addRow({
                Fecha: new Date().toISOString(),
                Nombre: data.nombre,
                Detalle_Pedido: `${data.cantidad} Pupusas Mixtas`,
                Total: data.total,
                Teléfono: data.telefono
            });
        } else {
            console.warn("Faltan variables de entorno para conectar a Google Sheets. Pedido simulado:", data);
        }

        return { success: true };
    } catch (error) {
        console.error("Error al guardar en Google Sheets:", error);
        return { success: false, error };
    }
}
