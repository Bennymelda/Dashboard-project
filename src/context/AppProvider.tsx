// src/context/AppProvider.tsx
import { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import type { BoardType, ColumnType, CardType,CommentType,ActionType} from "../types";
import { AppContext } from "./AppContext";
import { mockApi } from "../api/mockApi";
import { toast } from "react-toastify";
import { saveServerStore, serverStore } from "../api/serverStore"
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
  const [comments, setComments] = useState<Record<string, CommentType>>({});
const [cardComments, setCardComments] = useState<Record<string, string[]>>({});
const [history] = useState<ActionType[]>([]);
  const [lastServerUpdate, setLastServerUpdate] = useState<number>(0);
  const [undoStack, setUndoStack] = useState<ActionType[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const stored = localStorage.getItem("theme");
    return stored === "dark" ? "dark" : "light";
  });


const [redoStack, setRedoStack] = useState<ActionType[]>([]);
  // Listen for updates from other tabs

// In AppProvider.tsx

const [isLoading, setIsLoading] = useState(true);
// Load saved theme on mount
// Simulate loading delay

useEffect(() => {

const timer = setTimeout(() => {

setIsLoading(false);

}, 1000); // 1 second skeleton



return () => clearTimeout(timer);

}, []);
// theme sync is now handled in local effect below; initial theme picked by useState lazy initializer
// no initialization effect needed for setTheme from localStorage here



// Save theme to localStorage whenever it changes and update document attribute
useEffect(() => {
  if (theme === "dark" || theme === "light") {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }
}, [theme]);

// Sync theme from other tabs
useEffect(() => {
  const handleThemeStorage = (event: StorageEvent) => {
    if (event.key === "theme" && (event.newValue === "light" || event.newValue === "dark")) {
      setTheme(event.newValue);
    }
  };

  window.addEventListener("storage", handleThemeStorage);
  return () => window.removeEventListener("storage", handleThemeStorage);
}, []);


// Fetch data from your mockApi

useEffect(() => {

const handleStorage = (event: StorageEvent) => {

if (event.key === "kanbanServerStore" && event.newValue) {

const newStore = JSON.parse(event.newValue);



if (newStore.lastUpdated > lastServerUpdate) {

setBoards(

Object.values(newStore.boards || {}).map((board: any) => ({

...board,

createdAt: new Date(board.createdAt),

}))

);



setColumns(newStore.columns || {});

setCards(newStore.cards || {});

setComments(newStore.comments || {});

setCardComments(newStore.cardComments || {});

setLastServerUpdate(newStore.lastUpdated);

}

}

};



window.addEventListener("storage", handleStorage);

return () => window.removeEventListener("storage", handleStorage);

}, [lastServerUpdate]);
useEffect(() => {



const boardMap: Record<string, BoardType> = {};

boards.forEach((board) => {

boardMap[board.id] = board;

});



serverStore.boards = boardMap;

serverStore.columns = columns;

serverStore.cards = cards;

serverStore.comments = comments;

serverStore.cardComments = cardComments;

serverStore.lastUpdated = Date.now();



}, [boards, columns, cards, comments, cardComments]);
// Initial load from localStorage
useEffect(() => {
const stored = localStorage.getItem("kanbanServerStore");
if (!stored) return;
const newStore = JSON.parse(stored);
const boards: BoardType[] = Object.values(newStore.boards || {}).map((board: any) => ({
...board,
createdAt: new Date(board.createdAt)
}));
setBoards(boards);
setColumns(newStore.columns || {});
setCards(newStore.cards || {});
setLastServerUpdate(newStore.lastUpdated || 0);
setComments(newStore.comments || {});
setCardComments(newStore.cardComments || {});
}, []);





// ---- Board actions ----

 // Add a new board and sync across tabs

const addBoard = async (board: BoardType) => {

setBoards((prev) => [...prev, board]);



try {

// Update serverStore

serverStore.boards[board.id] = board;

serverStore.lastUpdated = Date.now();

saveServerStore(); // this triggers storage events for other tabs

} catch (error) {

console.error("Add board failed", error);

}

};


// Delete a board and all its columns & cards, then sync across tabs
const deleteBoard = async (boardId: string) => {

// 1️⃣ Remove board locally

setBoards((prev) => prev.filter((b) => b.id !== boardId));



// 2️⃣ Remove associated columns

const columnIds = serverStore.boards[boardId]?.columnIds || [];



setColumns((prev) => {

const newCols = { ...prev };

columnIds.forEach((id) => delete newCols[id]);

return newCols;

});



// 3️⃣ Remove associated cards and comments

columnIds.forEach((colId) => {

const cardIds = serverStore.columns[colId]?.cardIds || [];



// Remove cards locally

setCards((prev) => {

const newCards = { ...prev };

cardIds.forEach((cardId) => delete newCards[cardId]);

return newCards;

});



// Remove comments for each card

cardIds.forEach((cardId) => {

const commentIds = serverStore.cardComments[cardId] || [];

setComments((prev) => {

const newComments = { ...prev };

commentIds.forEach((id) => delete newComments[id]);

return newComments;

});

setCardComments((prev) => {

const newCardComments = { ...prev };

delete newCardComments[cardId];

return newCardComments;

});

});

});



try {

// 4 Remove from serverStore for cross-tab sync

delete serverStore.boards[boardId];

columnIds.forEach((colId) => delete serverStore.columns[colId]);



// Remove associated cards and comments from serverStore

columnIds.forEach((colId) => {

const cardIds = serverStore.columns[colId]?.cardIds || [];

cardIds.forEach((cardId) => {

delete serverStore.cards[cardId];

const commentIds = serverStore.cardComments[cardId] || [];

commentIds.forEach((cid) => delete serverStore.comments[cid]);

delete serverStore.cardComments[cardId];

});

});



serverStore.lastUpdated = Date.now();

saveServerStore();

} catch (error) {

console.error("Delete board failed", error);

}

};


  // ---- Column actions ----
 

const addColumn = async (boardId: string, column: ColumnType) => {

setColumns((prev) => {

// Prevent duplicate column

if (prev[column.id]) return prev;

return { ...prev, [column.id]: column };

});



setBoards((prev) =>

prev.map((b) =>

b.id === boardId

? {

...b,

// Prevent duplicate column IDs

columnIds: b.columnIds.includes(column.id)

? b.columnIds

: [...b.columnIds, column.id],

}

: b

)

);



// Sync to server

serverStore.columns[column.id] = column;

const board = serverStore.boards[boardId];

if (board) {

if (!board.columnIds.includes(column.id)) {

board.columnIds.push(column.id);

}

}

serverStore.lastUpdated = Date.now();

saveServerStore();

};
  const editColumn = async (columnId: string, title: string) => {

  setColumns((prev) => ({
    ...prev,
    [columnId]: {
      ...prev[columnId],
      title,
    },
  }));

  try {
    await mockApi.editColumn(columnId, title);
  } catch (error) {
    console.error("Edit column failed", error);
  }
};

const deleteColumn = (boardId: string, columnId: string) => {

// Delete column locally

setColumns(prev => {

const copy = { ...prev };

delete copy[columnId];

return copy;

});



setBoards(prev =>

prev.map(b =>

b.id === boardId

? { ...b, columnIds: b.columnIds.filter(id => id !== columnId) }

: b

)

);



// Delete from server store

const column = serverStore.columns[columnId];

if (column) {

// Delete all cards in this column

column.cardIds.forEach(cardId => delete serverStore.cards[cardId]);

}

delete serverStore.columns[columnId];



serverStore.lastUpdated = Date.now();

saveServerStore();

};
 const editCard = async (
  cardId: string,
  updatedCard: Partial<CardType>
) => {
toast.success("Changes made");
  setCards((prev) => ({
    ...prev,
    [cardId]: {
      ...prev[cardId],
      ...updatedCard,
    },
  }));

  try {
    await mockApi.editCard(cardId, updatedCard);
  } catch (error) {
    console.error("Edit card failed", error);
  }
};

const addCard =useCallback (async (columnId: string, card: CardType, skipHistory=false) => {

// --- 1. Add card to store ---
 toast.success("Card created successfully!");
setCards(prev => ({

...prev,

[card.id]: card

}));



// --- 2. Update the column safely ---

setColumns(prev => {

const column = prev[columnId];

if (!column) return prev;



// Prevent duplicate ids

if (column.cardIds.includes(card.id)) return prev;



return {

...prev,

[columnId]: {

...column,

cardIds: [...column.cardIds, card.id]

}

};

});


// --- 3. Track undo ---

if (!skipHistory) {

setUndoStack(prev => [

...prev,

{

type: "CREATE_CARD",

payload: { card, columnId }

}

]);



// Clear redo stack whenever a new action happens

setRedoStack([]);

}

// Clear redo stack whenever a new action happens

setRedoStack([]);



// --- 4. Sync with server ---

try {

await mockApi.addCard(columnId, card);

} catch (error) {

console.error("Add card failed", error);

}

},[])


// DELETE CARD

// ---- Delete Card with undo ----

const deleteCard = async (columnId: string, cardId: string,skipHistory=false) => {
toast.success("Card deleted successfully!");
const card = cards[cardId]; // store the card for undo

const column = columns[columnId];

if (!card || !column) return;



const index = column.cardIds.indexOf(cardId); // remember original position for undo



// --- 1. Remove card from store ---

setCards(prev => {

const newCards = { ...prev };

delete newCards[cardId];

return newCards;

});



// --- 2. Remove cardId from column ---

setColumns(prev => ({

...prev,

[columnId]: {

...prev[columnId],

cardIds: prev[columnId].cardIds.filter(id => id !== cardId),

},

}));


if (!skipHistory) {

setUndoStack(prev => [

...prev,

{ type: "DELETE_CARD", payload: { card, columnId, index } }

]);

setRedoStack([]);

}

// Clear redo stack whenever a new action happens

setRedoStack([]);



// --- 4. Update serverStore for cross-tab sync ---

delete serverStore.cards[cardId];

const serverColumn = serverStore.columns[columnId];

if (serverColumn) {

serverColumn.cardIds = serverColumn.cardIds.filter(id => id !== cardId);

}

serverStore.lastUpdated = Date.now();

saveServerStore();

};

/*
const moveCard = (

cardId: string,

fromColumnId: string,

toColumnId: string,

fromIndex: number,

toIndex: number,

skipHistory = false

) => {

setColumns(prev => {

const newColumns = { ...prev };

const fromColumn = newColumns[fromColumnId];

const toColumn = newColumns[toColumnId];

if (!fromColumn || !toColumn) return prev;



const newFromIds = [...fromColumn.cardIds];

const newToIds = fromColumnId === toColumnId ? newFromIds : [...toColumn.cardIds];



// Remove the card from the source

newFromIds.splice(fromIndex, 1);



// Clamp safe index for insertion

const safeIndex = Math.min(Math.max(toIndex, 0), newToIds.length);



// Insert into target

newToIds.splice(safeIndex, 0, cardId);



newColumns[fromColumnId] = { ...fromColumn, cardIds: newFromIds };

newColumns[toColumnId] = { ...toColumn, cardIds: newToIds };



return newColumns;

});



// Track history only if not skipping

if (!skipHistory) {

setUndoStack(prev => [

...prev,

{ type: "MOVE_CARD", payload: { cardId, fromColumnId, toColumnId, fromIndex, toIndex } }

]);

setRedoStack([]);

}




};

*/
//causing duplicate


const moveCard= async (

cardId: string,

fromColumnId: string,

toColumnId: string,

fromIndex: number,

toIndex: number,

skipHistory = false

) => {

// Optimistically update local state

setColumns(prev => {

const newColumns = { ...prev };

const fromColumn = newColumns[fromColumnId];

const toColumn = newColumns[toColumnId];

if (!fromColumn || !toColumn) return prev;



// Remove from source

const newFromIds = fromColumn.cardIds.filter(id => id !== cardId);



// Prepare target

const newToIds = fromColumnId === toColumnId ? [...newFromIds] : [...toColumn.cardIds];



// Clamp safe index

const safeIndex = Math.min(Math.max(toIndex, 0), newToIds.length);



// Prevent duplicates

if (!newToIds.includes(cardId)) newToIds.splice(safeIndex, 0, cardId);



newColumns[fromColumnId] = { ...fromColumn, cardIds: newFromIds };

newColumns[toColumnId] = { ...toColumn, cardIds: newToIds };



return newColumns;

});



// Track history only if not skipped

if (!skipHistory) {

setUndoStack(prev => [

...prev,

{ type: "MOVE_CARD", payload: { cardId, fromColumnId, toColumnId, fromIndex, toIndex } }

]);

setRedoStack([]);

}



try {

// Persist move to mock API (serverStore)

await mockApi.moveCard(cardId, fromColumnId, toColumnId, fromIndex, toIndex);



// Trigger cross-tab sync using localStorage

localStorage.setItem(

"lastMove",

JSON.stringify({ cardId, fromColumnId, toColumnId, fromIndex, toIndex, timestamp: Date.now() })

);

} catch (error) {

console.error("Move card failed", error);

// Optionally: rollback state if API fails

}

};
const addComment = async (cardId: string, text: string, parentId?: string) => {



const id = crypto.randomUUID();



const newComment: CommentType = {

id,

cardId,

parentId: parentId || null,

text,

author: "User",

createdAt: new Date().toISOString(),

replyIds: []

};



// update comments

setComments(prev => ({

...prev,

[id]: newComment

}));



if (parentId) {



setComments(prev => ({

...prev,

[parentId]: {

...prev[parentId],

replyIds: prev[parentId].replyIds.includes(id)

? prev[parentId].replyIds

: [...prev[parentId].replyIds, id]

}

}));



} else {



setCardComments(prev => ({

...prev,

[cardId]: prev[cardId]?.includes(id)

? prev[cardId]

: [...(prev[cardId] || []), id]

}));



}



try {

await mockApi.addComment(newComment);

} catch (error) {

console.error("Add comment failed", error);

}



};


const deleteComment = async (commentId: string) => {

const commentToDelete = comments[commentId];

if (!commentToDelete) return;



const cardId = commentToDelete.cardId;



setComments((prevComments) => {

const newComments = { ...prevComments };



// 1️⃣ Remove from parent replies first

const parentId = commentToDelete.parentId;

if (parentId && newComments[parentId]) {

newComments[parentId] = {

...newComments[parentId],

replyIds: newComments[parentId].replyIds.filter(

(id) => id !== commentId

),

};

}



// 2️⃣ Recursive deletion of the comment and its children

const deleteRecursive = (id: string) => {

const c = newComments[id];

if (!c) return;

c.replyIds.forEach(deleteRecursive);

delete newComments[id];

};



deleteRecursive(commentId);



return newComments;

});



// Remove from top-level card comments if no parent

if (!commentToDelete.parentId) {

setCardComments((prev) => ({

...prev,

[cardId]: (prev[cardId] || []).filter((id) => id !== commentId),

}));

}



// Sync with server

try {

await mockApi.deleteComment(commentId);

} catch (error) {

console.error("Delete comment failed", error);

}

};


const editComment = async (commentId: string, text: string) => {



setComments(prev => ({

...prev,

[commentId]: {

...prev[commentId],

text

}

}));



try {

await mockApi.editComment(commentId, text);

} catch (error) {

console.error("Edit comment failed", error);

}



};

// Undo
const replyToComment = useCallback(async (parentId: string, text: string) => {

const id = crypto.randomUUID();

const newComment: CommentType = {

id,

cardId: "", // we’ll get this below

parentId,

text,

author: "USER",

createdAt: new Date().toISOString(),

replyIds: []

};



// Update state safely using functional update

setComments(prev => {

const parent = prev[parentId]; // always latest state

if (!parent) return prev;

newComment.cardId = parent.cardId;



return {

...prev,

[id]: newComment,

[parentId]: {

...prev[parentId],

replyIds: [...prev[parentId].replyIds, id]

}

};

});



// Sync with server

try {

await mockApi.addComment(newComment);

} catch (err) {

console.error("Reply failed", err);

}

}, []); // ✅ can keep empty deps because we use functional state

const undo = () => {



const lastAction = undoStack[undoStack.length - 1];

if (!lastAction) return;



switch (lastAction.type) {



case "CREATE_CARD":

deleteCard(lastAction.payload.columnId, lastAction.payload.card.id, true);

break;



case "DELETE_CARD": {

const { card, columnId, index } = lastAction.payload;



setCards(prev => ({ ...prev, [card.id]: card }));



setColumns(prev => {

const col = prev[columnId];

if (!col) return prev;



const newCardIds = [...col.cardIds];

newCardIds.splice(index, 0, card.id);



return { ...prev, [columnId]: { ...col, cardIds: newCardIds } };

});



break;

}


case "MOVE_CARD": {

const { cardId, fromColumnId, toColumnId, fromIndex, toIndex } = lastAction.payload;



// Reverse move

moveCard(cardId, toColumnId, fromColumnId, toIndex, fromIndex, true);



break;

}

// CREATE_CARD and DELETE_CARD cases here

}

setUndoStack(prev => prev.slice(0, -1));

setRedoStack(prev => [...prev, lastAction]);

};

// Redo

const redo = () => {



const lastRedo = redoStack[redoStack.length - 1];

if (!lastRedo) return;



switch (lastRedo.type) {



case "CREATE_CARD":

addCard(lastRedo.payload.columnId, lastRedo.payload.card, true);

break;



case "DELETE_CARD":

deleteCard(lastRedo.payload.columnId, lastRedo.payload.card.id, true);

break;



case "MOVE_CARD": {

const { cardId, fromColumnId, toColumnId, fromIndex, toIndex } = lastRedo.payload;



moveCard(cardId, fromColumnId, toColumnId, fromIndex, toIndex, true);

break;

}

}



// update stacks AFTER action

setRedoStack(prev => prev.slice(0, -1));

setUndoStack(prev => [...prev, lastRedo]);

};


  return (
    <AppContext.Provider
      value={{
        boards,
        columns,
        cards,
        comments,
      cardComments,
       history,
        undoStack,
        redoStack,
        addBoard,
        deleteBoard,
        addColumn,
        editColumn,
        deleteColumn,
        addCard,
        editCard,
        deleteCard,
        moveCard,
      isLoading,
      setIsLoading,
        theme,
        setTheme,
        undo,
        redo,
        addComment,
        editComment,
        replyToComment,
        deleteComment
      }}
    >
      {children}
    </AppContext.Provider>
  );
};