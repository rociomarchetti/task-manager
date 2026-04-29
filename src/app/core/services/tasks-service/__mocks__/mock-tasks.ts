import { Task, TaskStatus } from '@shared/models';

const now = new Date();

export const mockTasks: Task[] = [
  {
    id: '1',
    boardId: 'A',
    title: 'Create social media content',
    description:
      'Prepare image and video assets for Instagram, Facebook, and LinkedIn.',
    status: TaskStatus.IN_PROGRESS,
    createdAt: new Date('2026-01-27T10:00:00Z'),
    updatedAt: new Date('2026-04-27T14:30:00Z'),
    dueDate: new Date('2026-09-18T00:00:00Z'),
    userId: 1,
  },
  {
    id: '2',
    boardId: 'A',
    title: 'Schedule campaign posts',
    description: 'Set publishing dates and times for all campaign channels.',
    status: TaskStatus.PENDING,
    createdAt: new Date('2026-01-28T08:00:00Z'),
    dueDate: new Date('2026-09-18T00:00:00Z'),
    userId: 1,
  },
  {
    id: '3',
    boardId: 'B',
    title: 'Compare contractor quotes',
    description:
      'Review prices, timelines, and services from different contractors.',
    status: TaskStatus.IN_PROGRESS,
    createdAt: new Date('2026-01-15T09:00:00Z'),
    updatedAt: new Date('2026-04-28T16:45:00Z'),
    dueDate: new Date('2026-09-18T00:00:00Z'),
    userId: 1,
  },
  {
    id: '4',
    boardId: 'B',
    title: 'Buy kitchen materials',
    description: 'Purchase tiles, paint, and fixtures for the kitchen remodel.',
    status: TaskStatus.IN_PROGRESS,
    createdAt: new Date('2026-01-10T11:30:00Z'),
    updatedAt: new Date('2026-04-27T10:00:00Z'),
    dueDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // +2 días
    userId: 1,
  },
  {
    id: '5',
    boardId: 'C',
    title: 'Book hotel in Tokyo',
    description:
      'Reserve accommodation near public transport for the first week.',
    status: TaskStatus.IN_PROGRESS,
    createdAt: new Date('2026-01-20T16:00:00Z'),
    updatedAt: new Date('2026-04-25T12:00:00Z'),
    dueDate: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000), // +4 días
    userId: 1,
  },
  {
    id: '6',
    boardId: 'C',
    title: 'Build sightseeing itinerary',
    description:
      'Plan daily visits including temples, food spots, and landmarks.',
    status: TaskStatus.PENDING,
    createdAt: new Date('2026-01-22T09:30:00Z'),
    updatedAt: new Date('2026-04-26T18:45:00Z'),
    dueDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000), // +1 día
    userId: 1,
  },
  {
    id: '7',
    boardId: 'D',
    title: 'Create company accounts',
    description:
      'Set up email, Slack, and internal tool access for the new hire.',
    status: TaskStatus.PENDING,
    createdAt: new Date('2026-01-22T09:30:00Z'),
    updatedAt: new Date('2026-04-26T18:45:00Z'),
    dueDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000), // +1 día
    userId: 1,
  },
  {
    id: '7',
    boardId: 'D',
    title: 'Prepare welcome package',
    description: 'Organize laptop, documentation, and first-day schedule.',
    status: TaskStatus.PENDING,
    createdAt: new Date('2026-01-22T09:30:00Z'),
    updatedAt: new Date('2026-04-26T18:45:00Z'),
    dueDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000), // +1 día
    userId: 1,
  },
];
