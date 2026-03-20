

import type { CardType, BoardType, ServerStoreType, CommentType, ColumnType } from "../types";

import { serverStore, saveServerStore } from "./serverStore";



export const mockApi = {

// FETCH SERVER STATE

async fetchServerState(): Promise<ServerStoreType> {

return new Promise((resolve) => {

setTimeout(() => {

resolve({

boards: serverStore.boards,

columns: serverStore.columns,

cards: serverStore.cards,

comments: serverStore.comments,

cardComments: serverStore.cardComments,

lastUpdated: serverStore.lastUpdated,

});

}, 200);

});

},



// ADD CARD

async addCard(columnId: string, card: CardType): Promise<void> {

serverStore.cards[card.id] = card;



const column = serverStore.columns[columnId];

if (column && !column.cardIds.includes(card.id)) {

column.cardIds.push(card.id);

}



serverStore.lastUpdated = Date.now();

saveServerStore();

console.log("Server: Card added");



return new Promise((resolve) => setTimeout(resolve, 200));

},



// DELETE CARD

async deleteCard(columnId: string, cardId: string): Promise<void> {

delete serverStore.cards[cardId];



const column = serverStore.columns[columnId];

if (column) {

column.cardIds = column.cardIds.filter((id) => id !== cardId);

}



// delete associated comments

const commentIds = serverStore.cardComments[cardId] || [];

commentIds.forEach((id) => delete serverStore.comments[id]);

delete serverStore.cardComments[cardId];



serverStore.lastUpdated = Date.now();

saveServerStore();

console.log("Server: Card deleted");



return new Promise((resolve) => setTimeout(resolve, 200));

},



// EDIT COLUMN

async editColumn(columnId: string, title: string): Promise<void> {
  const column = serverStore.columns[columnId];
  if (!column) return;
  column.title = title;
  serverStore.lastUpdated = Date.now();
  saveServerStore();
  console.log("Server: Column edited");
  return new Promise((resolve) => setTimeout(resolve, 200));
},



// EDIT CARD

async editCard(cardId: string, updatedCard: Partial<CardType>): Promise<void> {
  const card = serverStore.cards[cardId];
  if (!card) return;
  serverStore.cards[cardId] = {
    ...card,
    ...updatedCard,
  };
  serverStore.lastUpdated = Date.now();
  saveServerStore();
  console.log("Server: Card edited");
  return new Promise((resolve) => setTimeout(resolve, 200));
},



// MOVE CARD

async moveCard(

_cardId: string,

fromColumnId: string,

toColumnId: string,

fromIndex: number,

toIndex: number

): Promise<void> {

const sourceColumn = serverStore.columns[fromColumnId];

const targetColumn = serverStore.columns[toColumnId];

if (!sourceColumn || !targetColumn) return;



// Moving within same column

if (fromColumnId === toColumnId) {

const ids = [...sourceColumn.cardIds];

const [moved] = ids.splice(fromIndex, 1);

ids.splice(toIndex, 0, moved);

sourceColumn.cardIds = ids;

} else {

const sourceIds = [...sourceColumn.cardIds];

const targetIds = [...targetColumn.cardIds];



const [moved] = sourceIds.splice(fromIndex, 1);

targetIds.splice(toIndex, 0, moved);



sourceColumn.cardIds = sourceIds;

targetColumn.cardIds = targetIds;

}



serverStore.lastUpdated = Date.now();

saveServerStore();

console.log("Server: Card moved");



return new Promise((resolve) => setTimeout(resolve, 200));

},



// ADD COLUMN

async addColumn(boardId: string, column: ColumnType): Promise<void> {

serverStore.columns[column.id] = column;



const board = serverStore.boards[boardId];

if (board && !board.columnIds.includes(column.id)) {

board.columnIds.push(column.id);

}



serverStore.lastUpdated = Date.now();

saveServerStore();

console.log("Server: Column added");



return new Promise((resolve) => setTimeout(resolve, 200));

},



// DELETE COLUMN

async deleteColumn(boardId: string, columnId: string): Promise<void> {

const column = serverStore.columns[columnId];

if (!column) return;



// delete all cards in column

column.cardIds.forEach((cardId) => {

delete serverStore.cards[cardId];

const commentIds = serverStore.cardComments[cardId] || [];

commentIds.forEach((id) => delete serverStore.comments[id]);

delete serverStore.cardComments[cardId];

});



delete serverStore.columns[columnId];



const board = serverStore.boards[boardId];

if (board) {

board.columnIds = board.columnIds.filter((id) => id !== columnId);

}



serverStore.lastUpdated = Date.now();

saveServerStore();

console.log("Server: Column deleted");



return new Promise((resolve) => setTimeout(resolve, 200));

},



// ADD BOARD

async addBoard(board: BoardType): Promise<void> {

serverStore.boards[board.id] = board;

serverStore.lastUpdated = Date.now();

saveServerStore();

console.log("Server: Board added");

return new Promise((resolve) => setTimeout(resolve, 200));

},



// DELETE BOARD

async deleteBoard(boardId: string): Promise<void> {

const board = serverStore.boards[boardId];

if (!board) return;



// delete all columns & cards

board.columnIds.forEach((colId) => {

const col = serverStore.columns[colId];

if (!col) return;



col.cardIds.forEach((cardId) => {

delete serverStore.cards[cardId];

const commentIds = serverStore.cardComments[cardId] || [];

commentIds.forEach((id) => delete serverStore.comments[id]);

delete serverStore.cardComments[cardId];

});



delete serverStore.columns[colId];

});



delete serverStore.boards[boardId];

serverStore.lastUpdated = Date.now();

saveServerStore();

console.log("Server: Board deleted");



return new Promise((resolve) => setTimeout(resolve, 200));

},



// ADD COMMENT / REPLY

async addComment(comment: CommentType): Promise<void> {

serverStore.comments[comment.id] = comment;



if (comment.parentId) {

const parent = serverStore.comments[comment.parentId];

if (parent && !parent.replyIds.includes(comment.id)) {

parent.replyIds.push(comment.id);

}

} else {

if (!serverStore.cardComments[comment.cardId]) {

serverStore.cardComments[comment.cardId] = [];

}

if (!serverStore.cardComments[comment.cardId].includes(comment.id)) {

serverStore.cardComments[comment.cardId].push(comment.id);

}

}



serverStore.lastUpdated = Date.now();

saveServerStore();

console.log("Server: Comment added");



return new Promise((resolve) => setTimeout(resolve, 200));

},



// EDIT COMMENT

async editComment(commentId: string, text: string): Promise<void> {

const comment = serverStore.comments[commentId];

if (!comment) return;



serverStore.comments[commentId] = { ...comment, text };

serverStore.lastUpdated = Date.now();

saveServerStore();

console.log("Server: Comment edited");



return new Promise((resolve) => setTimeout(resolve, 200));

},



// DELETE COMMENT

async deleteComment(commentId: string): Promise<void> {

const commentToDelete = serverStore.comments[commentId];

if (!commentToDelete) return;



const deleteRecursive = (id: string) => {

const c = serverStore.comments[id];

if (!c) return;

c.replyIds.forEach(deleteRecursive);

delete serverStore.comments[id];

};



deleteRecursive(commentId);



const parentId = commentToDelete.parentId;

if (parentId && serverStore.comments[parentId]) {

serverStore.comments[parentId].replyIds =

serverStore.comments[parentId].replyIds.filter((id) => id !== commentId);

}



if (!commentToDelete.parentId) {

const cardId = commentToDelete.cardId;

if (serverStore.cardComments[cardId]) {

serverStore.cardComments[cardId] = serverStore.cardComments[cardId].filter(

(id) => id !== commentId

);

}

}



serverStore.lastUpdated = Date.now();

saveServerStore();

console.log("Server: Comment deleted");



return new Promise((resolve) => setTimeout(resolve, 200));

},

};