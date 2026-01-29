import { Board } from '@shared/models';

export const mockBoards: Board[] = [
  {
    id: 'A',
    name: 'Crear el gestor de tareas',
    createdAt: new Date('2026-01-27T10:00:00Z'),
    isFavorite: true,
    userId: 1,
  },
  {
    id: 'B',
    name: 'Mantenimiento del mes',
    createdAt: new Date('2026-01-27T10:00:00Z'),
    isFavorite: false,
    userId: 1,
  },
];
