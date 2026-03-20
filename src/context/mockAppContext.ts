// src/context/mockAppContext.ts


import type { AppContextType } from "./AppContext";



export const mockAppContext: AppContextType = {

boards: [

{ id: "board1", title: "Test Board", columnIds: ["col1"],description: "love",
  createdAt: new Date(), } 

],

columns: {

col1: { id: "col1", title: "Existing Column", cardIds: ["card1"] }

},

cards: {

card1: { id: "card1", title: "Existing Card", description: "Test card", tags: [], dueDate: null }

},

comments: {},

cardComments: {},

isLoading: false,

setIsLoading: () => {},

history: [],

undoStack: [],

redoStack: [],

theme: "light",

setTheme: () => {},

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