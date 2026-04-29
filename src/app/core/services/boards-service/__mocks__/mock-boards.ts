import { Board } from '@shared/models';

const now = new Date();

export const mockBoards: Board[] = [
  {
    id: 'A',
    title: 'Summer Campaign Launch',
    description:
      'Organize creative assets, publishing schedule, and pending team tasks.',
    createdAt: now, // Hoy
    isFavorite: true,
    isWip: true,
    userId: 1,
  },
  {
    id: 'B',
    title: 'Home Renovation',
    description: 'Track purchases, budgets, and pending work for the house.',
    createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000), // Ayer
    isFavorite: false,
    isWip: true,
    userId: 1,
  },
  {
    id: 'C',
    title: 'Japan Trip Planning',
    description:
      'Bookings, daily routes, estimated budget, and preparation checklist.',
    createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // Hace 3 días
    isFavorite: true,
    isWip: true,
    userId: 1,
  },
  {
    id: 'D',
    title: 'New Employee Onboarding',
    description:
      'Checklist for access setup, initial documents, and welcome tasks.',
    createdAt: new Date('2026-01-27T10:00:00Z'),
    isFavorite: false,
    isWip: true,
    userId: 1,
  },
];
