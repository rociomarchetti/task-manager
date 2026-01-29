import { Task, TaskStatus } from '@shared/models';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Diseñar la página principal',
    description: 'Crear el diseño inicial del landing page en Figma',
    status: TaskStatus.IN_PROGRESS,
    createdAt: new Date('2026-01-27T10:00:00Z'), // Creada hace 2 días
    updatedAt: new Date('2026-01-27T14:30:00Z'),
    dueDate: new Date('2026-02-15T00:00:00Z'),
    userId: 1,
  },
  {
    id: '2',
    title: 'Configurar entorno de desarrollo',
    description:
      'Instalar dependencias y configurar el entorno local de React + Vite',
    status: TaskStatus.PENDING,
    createdAt: new Date('2026-01-28T08:00:00Z'), // Creada hace 1 día
    dueDate: new Date('2026-02-10T00:00:00Z'),
    userId: 1,
  },
  {
    id: '3',
    title: 'Implementar autenticación',
    description: 'Agregar login y registro con JWT y refresh tokens',
    status: TaskStatus.IN_PROGRESS,
    createdAt: new Date('2026-01-15T09:00:00Z'),
    updatedAt: new Date('2026-01-28T16:45:00Z'), // Actualizada hace 1 día
    dueDate: new Date('2026-02-20T00:00:00Z'),
    userId: 1,
  },
  {
    id: '4',
    title: 'Escribir documentación de la API',
    description: 'Generar documentación con Swagger y ejemplos de uso',
    status: TaskStatus.IN_PROGRESS,
    createdAt: new Date('2026-01-10T11:30:00Z'),
    updatedAt: new Date('2026-01-27T10:00:00Z'), // Actualizada hace 2 días
    dueDate: new Date('2026-02-25T00:00:00Z'),
    userId: 1,
  },
  {
    id: '5',
    title: 'Optimizar rendimiento del dashboard',
    description: 'Mejorar tiempos de carga y uso de memoización',
    status: TaskStatus.IN_PROGRESS,
    createdAt: new Date('2026-01-20T16:00:00Z'),
    updatedAt: new Date('2026-01-25T12:00:00Z'),
    dueDate: new Date('2026-01-31T00:00:00Z'), // Vence en 2 días
    userId: 1,
  },
  {
    id: '6',
    title: 'Revisión de código semanal',
    description: 'Analizar PRs pendientes y dar feedback al equipo',
    status: TaskStatus.PENDING,
    createdAt: new Date('2026-01-22T09:30:00Z'),
    updatedAt: new Date('2026-01-26T18:45:00Z'),
    dueDate: new Date('2026-01-30T00:00:00Z'), // Vence mañana
    userId: 1,
  },
];
