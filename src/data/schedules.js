// Única fuente de verdad de los horarios de clases.
// Para actualizar la programación semanal solo se edita este archivo:
// no hace falta tocar ningún componente.
// Usa null para indicar que no hay clase en esa celda.

export const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

export const indoorCycling = {
  updatedAt: '2026-07-27',
  hideEmptyRows: true, // oculta filas donde todos los días son null
  rows: [
    {
      time: '07:00 AM',
      slots: [
        null,
        { instructor: 'Larry', level: 'Master' },
        null,
        { instructor: 'Larry', level: 'Master' },
        null,
        null,
      ],
    },
    {
      time: '08:00 AM',
      slots: [
        { instructor: 'Andrés', level: '1XB' },
        { instructor: 'Estty', level: '1XB' },
        { instructor: 'Estty', level: '1XB' },
        { instructor: 'Estty', level: '1XB' },
        { instructor: 'Andrés', level: '1XB' },
        null,
      ],
    },
    {
      time: '09:00 AM',
      slots: [
        { instructor: 'Andrés', level: '1XB' },
        null,
        null,
        null,
        { instructor: 'Andrés', level: '1XB' },
        { instructor: 'Estty', level: '1XB' },
      ],
    },
    {
      time: '10:00 AM',
      slots: [null, null, null, null, null, null],
    },
    {
      time: '05:30 PM',
      slots: [
        { instructor: 'Simón', level: '1XB' },
        { instructor: 'Estty', level: '1XB' },
        { instructor: 'Estty', level: '1XB' },
        { instructor: 'Estty', level: '1XB' },
        { instructor: 'Estty', level: '1XB' },
        null,
      ],
    },
    {
      time: '06:30 PM',
      slots: [
        { instructor: 'Estty', level: '1XB' },
        { instructor: 'Simón', level: '1XB' },
        { instructor: 'Lisset', level: 'PRO' },
        { instructor: 'Lisset', level: 'PRO' },
        { instructor: 'Estty', level: '1XB' },
        null,
      ],
    },
  ],
}

export const clasesGrupales = {
  updatedAt: '2026-07-27',
  hideEmptyRows: true,
  rows: [
    {
      time: '08:00 AM',
      slots: [
        { instructor: 'Alex', clase: 'Cardiodance' },
        { instructor: 'Reimer', clase: 'Fitcombat' },
        { instructor: 'Brayan', clase: 'Baile' },
        { instructor: 'Elvis', clase: 'Aeróbicos' },
        { instructor: 'Johan', clase: 'Funcionales' },
        null,
      ],
    },
    {
      time: '09:00 AM',
      slots: [null, null, null, null, null, { instructor: 'Alex', clase: 'Cardiodance' }],
    },
    {
      time: '05:30 PM',
      slots: [
        { instructor: 'Elvis', clase: 'Aeróbicos' },
        { instructor: 'Miguel Ángel', clase: 'Funcionales' },
        { instructor: 'Reimer', clase: 'Fitcombat' },
        { instructor: 'Miguel Ángel', clase: 'Funcionales' },
        { instructor: 'Alex', clase: 'Cardiodance' },
        null,
      ],
    },
    {
      time: '06:30 PM',
      slots: [null, { instructor: 'Johan', clase: 'Baile' }, null, null, null, null],
    },
  ],
}

// Convierte '05:30 PM' → minutos desde medianoche, para poder ordenar cronológicamente.
function timeToMinutes(time) {
  const [, hh, mm, period] = time.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/)
  let hours = Number(hh) % 12
  if (period === 'PM') hours += 12
  return hours * 60 + Number(mm)
}

// Devuelve las clases del día indicado (0=Lunes...5=Sábado), combinando Indoor Cycling
// y Clases Grupales, ordenadas cronológicamente. Domingo o índice fuera de rango → [].
export function getClassesForDay(dayIndex) {
  if (dayIndex < 0 || dayIndex > 5) return []

  const fromSchedule = (schedule, tipo) =>
    schedule.rows
      .map((row) => {
        const slot = row.slots[dayIndex]
        if (!slot) return null
        return { time: row.time, instructor: slot.instructor, clase: slot.clase ?? slot.level, tipo }
      })
      .filter(Boolean)

  return [
    ...fromSchedule(indoorCycling, 'Indoor Cycling'),
    ...fromSchedule(clasesGrupales, 'Clases Grupales'),
  ].sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time))
}
