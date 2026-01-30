export interface Board {
  id: string;
  name: string;
  description?: string;
  isFavorite: boolean;
  isWip: boolean;
  createdAt: Date;
  userId: number;
}
