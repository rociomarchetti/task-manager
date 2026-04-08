export interface Board {
  id: string;
  title: string;
  description?: string;
  isFavorite: boolean;
  isWip: boolean;
  createdAt: Date;
  userId: number;
  addedColumns?: Array<string>;
}

export interface NewBoardData {
  title: string;
  description?: string;
  isFavorite: boolean;
  addedColumns?: Array<string>;
}
