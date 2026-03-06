// src/context/AppProvider.tsx
import { useState } from "react";
import type { ReactNode } from "react";
import type { BoardType, ColumnType, CardType} from "../types";
import { AppContext } from "./AppContext";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [boards, setBoards] = useState<BoardType[]>([
    {
      id: "1",
      title: "Product Launch Q3",
      description: "Coordination board for the upcomin Q3 major product release",
      createdAt: new Date(),
      columnIds: [] // add columnIds here
    },
  ]);

  const [columns, setColumns] = useState<Record<string, ColumnType>>({});
  const [cards, setCards] = useState<Record<string, CardType>>({});

  // ---- Board actions ----
  const addBoard = (board: BoardType) => setBoards(prev => [...prev, board]);
  const deleteBoard = (id: string) => setBoards(prev => prev.filter(b => b.id !== id));

  // ---- Column actions ----
  const addColumn = (boardId: string, column: ColumnType) => {
    setColumns(prev => ({ ...prev, [column.id]: column }));
    setBoards(prev =>
      prev.map(b => b.id === boardId ? { ...b, columnIds: [...(b.columnIds || []), column.id] } : b)
    );
  };

  const editColumn = (columnId: string, newTitle: string) => {
    setColumns(prev => ({ ...prev, [columnId]: { ...prev[columnId], title: newTitle } }));
  };

  const deleteColumn = (boardId: string, columnId: string) => {
    setColumns(prev => {
      const copy = { ...prev };
      delete copy[columnId];
      return copy;
    });
    setBoards(prev =>
      prev.map(b => b.id === boardId ? { ...b, columnIds: b.columnIds.filter(id => id !== columnId) } : b)
    );
  };

  // ---- Card actions ----
  const addCard = (columnId: string, card: CardType) => {
    setCards(prev => ({ ...prev, [card.id]: card }));
    setColumns(prev => ({
      ...prev,
      [columnId]: { ...prev[columnId], cardIds: [...prev[columnId].cardIds, card.id] },
    }));
  };

  const editCard = (cardId: string, updatedCard: Partial<CardType>) => {
    setCards(prev => ({ ...prev, [cardId]: { ...prev[cardId], ...updatedCard } }));
  };

  const deleteCard = (columnId: string, cardId: string) => {
  setCards(prev => {
    const newCards = { ...prev };
    delete newCards[cardId];
    return newCards;
  });
  setColumns(prev => ({
    ...prev,
    [columnId]: {
      ...prev[columnId],
      cardIds: prev[columnId].cardIds.filter((id) => id !== cardId),
    },
  }));
};
  return (
    <AppContext.Provider
      value={{
        boards,
        columns,
        cards,
        addBoard,
        deleteBoard,
        addColumn,
        editColumn,
        deleteColumn,
        addCard,
        editCard,
        deleteCard
      }}
    >
      {children}
    </AppContext.Provider>
  );
};