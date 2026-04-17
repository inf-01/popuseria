export function checkAvailability() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  function getOrderFriday(year: number, month: number, targetDay: number) {
    let d = new Date(year, month, targetDay);
    if (targetDay === 30 && d.getMonth() !== month) {
      d = new Date(year, month + 1, 0); 
    }
    // Buscamos el fin de semana siguiente (sábado)
    while (d.getDay() !== 6) {
      d.setDate(d.getDate() + 1);
    }
    // Viernes previo a ese sábado
    d.setDate(d.getDate() - 1);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  const upcomingFridays = [
    getOrderFriday(currentYear, currentMonth, 15),
    getOrderFriday(currentYear, currentMonth, 30),
    getOrderFriday(currentYear, currentMonth + 1, 15),
    getOrderFriday(currentYear, currentMonth + 1, 30)
  ];

  const todayStr = new Date();
  todayStr.setHours(0, 0, 0, 0);

  const isAvailable = upcomingFridays.some(f => f.getTime() === todayStr.getTime());
  const nextDate = upcomingFridays.find(f => f.getTime() > todayStr.getTime()) || upcomingFridays[0];

  const nextDateString = nextDate.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  return { isAvailable, nextDateString };
}
