import { Board } from '@shared/models';

export const mockBoards: Board[] = [
  {
    id: 'A',
    title: 'Crear el gestor de tareas',
    createdAt: new Date('2026-01-27T10:00:00Z'),
    isFavorite: true,
    isWip: true,
    userId: 1,
  },
  {
    id: 'B',
    title: 'Mantenimiento del mes',
    createdAt: new Date('2026-01-27T10:00:00Z'),
    isFavorite: false,
    isWip: true,
    userId: 1,
  },
  {
    id: 'C',
    title: 'Crear el listado de tableros',
    createdAt: new Date('2026-01-27T10:00:00Z'),
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
