export interface BoardType {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
   columnIds: string[]; 
}

export interface CardType {
  id: string;
  title: string;
  description: string;
  tags: string[];
   dueDate: string | null; // ISO string format
}

export interface ColumnType {
  id: string;
  title: string;
  cardIds: string[];
}
