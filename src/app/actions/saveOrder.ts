'use server';

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function saveOrder(data: { nombre: string; telefono: string; cantidad: number; total: number }) {
    try {
        const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

        const auth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            scopes: SCOPES,
        });

        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID || '', auth);

        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0]; // Usamos la primera pestaña

        // Insertar fila
        await sheet.addRow({
            Fecha: new Date().toLocaleString('es-CR', { timeZone: 'America/Costa_Rica' }),
            Cliente: data.nombre,
            Teléfono: data.telefono,
            Cantidad: data.cantidad,
            Total: `₡${data.total.toLocaleString()}`
        });

        console.log(`✅ Pedido guardado en Google Sheets para: ${data.nombre}`);
        return { success: true };
    } catch (error) {
        console.error("❌ Error al guardar en Google Sheets:", error);
        return { success: false, error };
    }
}
