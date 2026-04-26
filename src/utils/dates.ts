export function checkAvailability() {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();

  // Ventana 1: Del 11 al 15
  const isWindow1 = day >= 11 && day <= 15;
  // Ventana 2: Del 26 al final del mes
  const isWindow2 = day >= 26;

  const isAvailable = isWindow1 || isWindow2;

  // Calculamos la fecha de entrega (Sábado después del cierre)
  let deliveryDate = new Date();

  if (day <= 15) {
    // Si estamos antes o en la ventana del 15, la entrega es el sábado después del 15
    deliveryDate = new Date(year, month, 15);
  } else {
    // Si estamos después del 15, la entrega es el sábado después del fin de mes
    deliveryDate = new Date(year, month + 1, 0); // Último día del mes
  }

  // Buscamos el primer sábado después de esa fecha de cierre
  while (deliveryDate.getDay() !== 6) {
    deliveryDate.setDate(deliveryDate.getDate() + 1);
  }

  const nextDateString = deliveryDate.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  return { isAvailable, nextDateString };
}
