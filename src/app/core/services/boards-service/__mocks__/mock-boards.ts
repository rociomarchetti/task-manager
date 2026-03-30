import { Board } from '@shared/models';

const now = new Date();

export const mockBoards: Board[] = [
  {
    id: 'A',
    title: 'Crear el gestor de tareas',
    description: 'Generar estructura primera del proyecto',
    createdAt: now, // Hoy
    isFavorite: true,
    isWip: true,
    userId: 1,
  },
  {
    id: 'B',
    title: 'Mantenimiento del mes',
    createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000), // Ayer
    isFavorite: false,
    isWip: true,
    userId: 1,
  },
  {
    id: 'C',
    title: 'Crear el listado de tableros',
    description: 'Vista donde se podrán ver todos los tableros en progreso',
    createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // Hace 3 días
    isFavorite: true,
    isWip: true,
    userId: 1,
  },
  {
    id: 'D',
    title: 'Crear el detalle de cada tablero',
    createdAt: new Date('2026-01-27T10:00:00Z'),
    isFavorite: false,
    isWip: true,
    userId: 1,
  },
];
