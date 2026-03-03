export interface Board {
  id: string;
  title: string;
  description?: string;
  isFavorite: boolean;
  isWip: boolean;
  createdAt: Date;
  userId: number;
}
