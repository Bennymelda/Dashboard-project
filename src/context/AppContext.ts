// src/context/AppContext.ts
import { createContext } from "react";
import type { BoardType, ColumnType, CardType } from "../types";


export interface AppContextType {
  boards: BoardType[];
  columns: Record<string, ColumnType>;
  cards: Record<string, CardType>;

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
}

// Create the context
export const AppContext = createContext<AppContextType | undefined>(undefined);