// src/context/AppContext.ts
import { createContext } from "react";
import type { BoardType, ColumnType, CardType,CommentType,ActionType } from "../types";

export interface AppContextType {
  
  boards: BoardType[];
  columns: Record<string, ColumnType>;
  cards: Record<string, CardType>;
comments: Record<string, CommentType>

cardComments: Record<string, string[]>
isLoading:boolean
setIsLoading:React.Dispatch<React.SetStateAction<boolean>>
history: ActionType[]
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;

undoStack:ActionType[]
redoStack:ActionType[]
undo: ()=> void
redo: ()=>void
  // Board actions
  addBoard: (board: BoardType) => void;
  deleteBoard: (id: string) => void;

  // Column actions
  addColumn: (boardId: string, column: ColumnType) => void;
  editColumn: (columnId: string, newTitle: string) => void;
  deleteColumn: (boardId: string, columnId: string) => void;

  // Card actions
  addCard: (columnId: string, card: CardType) => void;
  editCard: (cardId: string, updatedCard: Partial<CardType>) => void;
  deleteCard: (columnId: string, cardId: string) => void;

  moveCard: (
    cardId: string,
    fromColumnId: string,
    toColumnId: string,
    fromIndex: number,
    toIndex: number
  ) => void;


addComment: (cardId: string, text: string) => void

replyToComment: (parentId: string, text: string) => void
editComment: (commentId: string, text: string) => void

deleteComment: (commentId: string) => void
}

 
// Create the context
export const AppContext = createContext<AppContextType | undefined>(undefined);
/*
export const mockAppContext: AppContextType = {

boards: [],

columns: {},

cards: {},

comments: {},

cardComments: {},

isLoading: false,

setIsLoading: () => {},

history: [],

undoStack: [],

redoStack: [],

undo: () => {},

redo: () => {},



addBoard: () => {},

deleteBoard: () => {},



addColumn: () => {},

editColumn: () => {},

deleteColumn: () => {},



addCard: () => {},

editCard: () => {},

deleteCard: () => {},

moveCard: () => {},



addComment: () => {},

replyToComment: () => {},

editComment: () => {},

deleteComment: () => {},

};
*/