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
export type CommentType = {
  id: string;
  cardId: string;
  parentId: string | null;
  text: string;
  author:string;
  createdAt: string;
  replyIds:string[];

};
/*
export type ActionType =
  | { type: "CREATE_CARD"; payload: CardType }
  | { type: "DELETE_CARD"; payload: { cardId: string; columnId: string } }
  | {
      type: "MOVE_CARD";
      payload: {
        cardId: string;
        fromColumnId: string;
        toColumnId: string;
        fromIndex: number;
        toIndex: number;
      };
    };
*/
    
    export type ServerStoreType = {
  boards:Record <string, BoardType>;
  columns: Record<string, ColumnType>;
  cards: Record<string, CardType>;
  comments:Record<string, CommentType>;
  cardComments:Record<string, string[]>;
  lastUpdated: number;
};

export type ActionType =

| { type: "CREATE_CARD"; payload: { card: CardType; columnId: string } } // store the card and which column

| { type: "DELETE_CARD"; payload: { card: CardType; columnId: string; index: number } } // full card and original index

| {

type: "MOVE_CARD";

payload: {

cardId: string;

fromColumnId: string;

toColumnId: string;

fromIndex: number;

toIndex: number;

};

};