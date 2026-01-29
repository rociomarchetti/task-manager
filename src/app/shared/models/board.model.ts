export interface Board {
  id: string;
  name: string;
  description?: string;
  isFavorite: boolean;
  createdAt: Date;
  userId: number;
}
